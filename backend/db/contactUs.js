import { ContactUs } from "../schema/contactUsSchema.js";
import { filterCheck, pagingFormat, sortFormat } from "../utils.js";


// Query 

export async function countContactUss() {
    return await ContactUs.countDocuments();
}

export async function filterCount(filter) {
    return await ContactUs.aggregate([{ $match: filter }]).count("email")
}

export async function findContactUss(paging, filter, sorting) {
    const optimizedFilter = filter ? filterCheck(filter) : {}
    const optimizedPaging = paging ? pagingFormat(paging) : []
    const optimizedSort = sorting ? sortFormat(sorting) : {}

    let contactUsCount = 0

    let aggregateAttribs = []
    if(optimizedFilter){
        aggregateAttribs.push({$match: optimizedFilter})
        contactUsCount = await filterCount(optimizedFilter)
        contactUsCount = contactUsCount.length > 0 ? contactUsCount[0].email : 0
    } else {
        contactUsCount = await countContactUss();
    }
    if(Object.keys(optimizedSort).length > 0) {
        aggregateAttribs.push({$sort: optimizedSort})
    }
    if(optimizedPaging) {
        aggregateAttribs = aggregateAttribs.concat(optimizedPaging)
    }

    let pageInfo = {
        hasNextPage: (paging.limit + paging?.offset) < contactUsCount, 
        hasPreviousPage: paging.offset ? paging.offset > 0 : false
    }
    
    const nodes = await ContactUs.aggregate(aggregateAttribs);

    return {nodes, totalCount: contactUsCount, pageInfo};
}

export async function getContactUs(id) {
    return await ContactUs.findById(id);
}

// Mutations

export async function createOneContactUs(contactUs) {
    return await ContactUs.create({
        ...contactUs,
        createdAt: new Date()
    });
}

export async function createManyContactUss(contactUss) {
    const newContactUs = contactUss.map(async (contactUs) => await createOneContactUs(
        contactUs,
    ));

    return newContactUs;
}

export async function updateOneContactUs(id, update) {
    Object.keys(update).forEach((k) => update[k] == '' && delete update[k]);

    return await ContactUs.findByIdAndUpdate(id, {...update})
}

export async function updateManyContactUss(filter, update) {
    const updatedFilter = filterCheck(filter)
    const contactUss = await ContactUs.aggregate([{
        $match: updatedFilter
    }]);

    contactUss.map(async (contactUs) => await updateOneContactUs(contactUs._id, update))

    return contactUss;
}

export async function deleteOneContactUs(id) {
    return await ContactUs.findByIdAndDelete(id);
}

export async function deleteManyContactUss(filter) {
    const updatedFilter = filterCheck(filter);
    const contactUss = await ContactUs.aggregate([{
        $match: updatedFilter
    }]);

    contactUss.map(async (contactUs) => await deleteOneContactUs(contactUs._id));

    return contactUss;
}
