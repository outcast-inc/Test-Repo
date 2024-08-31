import { Service } from "../schema/serviceSchema.js";
import { filterCheck, pagingFormat, sortFormat } from "../utils.js";


// Query 

export async function countServices() {
    return await Service.countDocuments();
}

export async function filterCount(filter) {
    return await Service.aggregate([{ $match: filter }]).count("name")
}

export async function findServices(paging, filter, sorting) {
    const optimizedFilter = filter ? filterCheck(filter) : {}
    const optimizedPaging = paging ? pagingFormat(paging) : []
    const optimizedSort = sorting ? sortFormat(sorting) : {}

    let serviceCount = 0

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
        serviceCount = await filterCount(optimizedFilter)
        serviceCount = serviceCount.length > 0 ? serviceCount[0].name : 0
    } else {
        serviceCount = await countServices();
    }
    if(Object.keys(optimizedSort).length > 0) {
        aggregateAttribs.push({$sort: optimizedSort})
    }
    if(optimizedPaging) {
        aggregateAttribs = aggregateAttribs.concat(optimizedPaging)
    }

    let pageInfo = {
        hasNextPage: (paging.limit + paging?.offset) < serviceCount, 
        hasPreviousPage: paging.offset ? paging.offset > 0 : false
    }
    
    const nodes = await Service.aggregate(aggregateAttribs);

    return {nodes, totalCount: serviceCount, pageInfo};
}

export async function getService(id) {
    return await Service.findById(id);
}

export async function getServiceBySlug(slug) {
    return await Service.findOne({ slug });
}

// Mutations

export async function createOneService(service, createdById) {
    return await Service.create({
        ...service,
        createdById,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
}

export async function createManyServices(services, createdById) {
    const newService = services.map(async (service) => await createOneService(
        ...service,
        createdById
    ));

    return newService;
}

export async function updateOneService(id, update, updatedById) {
    Object.keys(update).forEach((k) => update[k] == '' && delete update[k]);

    return await Service.findByIdAndUpdate(id, {...update, updatedById, updatedAt: new Date()})
}

export async function updateManyServices(filter, update, updatedById) {
    const updatedFilter = filterCheck(filter)
    const services = await Service.aggregate([{
        $match: updatedFilter
    }]);

    services.map(async (service) => await updateOneService(service._id, update, updatedById))

    return services;
}

export async function deleteOneService(id) {
    return await Service.findByIdAndDelete(id);
}

export async function deleteManyServices(filter) {
    const updatedFilter = filterCheck(filter);
    const services = await Service.aggregate([{
        $match: updatedFilter
    }]);

    services.map(async (service) => await deleteOneService(service._id));

    return services;
}
