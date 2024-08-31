import { Course } from "../schema/courseSchema.js";
import { filterCheck, pagingFormat, sortFormat } from "../utils.js";


// Query 

export async function countCourses() {
    return await Course.countDocuments();
}

export async function filterCount(filter) {
    return await Course.aggregate([{ $match: filter }]).count("name")
}

export async function findCourses(paging, filter, sorting) {
    const optimizedFilter = filter ? filterCheck(filter) : {}
    const optimizedPaging = paging ? pagingFormat(paging) : []
    const optimizedSort = sorting ? sortFormat(sorting) : {}

    let courseCount = 0

    let aggregateAttribs = []

    aggregateAttribs.push({
        $lookup: {
            from: "users",
            localField: "createdById",
            foreignField: "_id",
            as: "createdBy"
        }
    });

    aggregateAttribs.push({
        $set: {
            createdBy: { $first: "$createdBy" }
        }
    })

    if(optimizedFilter){
        aggregateAttribs.push({$match: optimizedFilter})
        courseCount = await filterCount(optimizedFilter)
        courseCount = courseCount.length > 0 ? courseCount[0].name : 0
    } else {
        courseCount = await countCourses();
    }
    if(Object.keys(optimizedSort).length > 0) {
        aggregateAttribs.push({$sort: optimizedSort})
    }
    if(optimizedPaging) {
        aggregateAttribs = aggregateAttribs.concat(optimizedPaging)
    }

    let pageInfo = {
        hasNextPage: (paging.limit + paging?.offset) < courseCount, 
        hasPreviousPage: paging.offset ? paging.offset > 0 : false
    }
    
    const nodes = await Course.aggregate(aggregateAttribs);

    return {nodes, totalCount: courseCount, pageInfo};
}

export async function getCourse(id) {
    return await Course.findById(id);
}

export async function getCourseBySlug(slug) {
    return await Course.findOne({ slug });
}

// Mutations

export async function createOneCourse(course, createdById) {
    return await Course.create({
        ...course,
        createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

export async function createManyCourses(courses, createdById) {
    const newCourse = courses.map(async (course) => await createOneCourse(
        ...course,
        createdById
    ));

    return newCourse;
}

export async function updateOneCourse(id, update, updatedById) {
    Object.keys(update).forEach((k) => update[k] == '' && delete update[k]);

    return await Course.findByIdAndUpdate(id, {...update, updatedById, updatedAt: new Date()})
}

export async function updateManyCourses(filter, update, updatedById) {
    const updatedFilter = filterCheck(filter)
    const courses = await Course.aggregate([{
        $match: updatedFilter
    }]);

    courses.map(async (course) => await updateOneCourse(course._id, update, updatedById))

    return courses;
}

export async function deleteOneCourse(id) {
    return await Course.findByIdAndDelete(id);
}

export async function deleteManyCourses(filter) {
    const updatedFilter = filterCheck(filter);
    const courses = await Course.aggregate([{
        $match: updatedFilter
    }]);

    courses.map(async (course) => await deleteOneCourse(course._id));

    return courses;
}
