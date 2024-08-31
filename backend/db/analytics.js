import { Analytics } from "../schema/analyticsSchema.js";
import { filterCheck, pagingFormat, sortFormat } from "../utils.js";

// Query

export async function countAnalytics() {
    return await Analytics.countDocuments();
}

export async function filterCount(filter) {
    return await Analytics.aggregate([{ $match: filter }]).count("count")
}

export async function findAnalytics(paging, filter, sorting) {
    const optimizedFilter = filter ? filterCheck(filter) : {}
    const optimizedPaging = paging ? pagingFormat(paging) : []
    const optimizedSort = sorting ? sortFormat(sorting) : {}

    let analyticCount = 0

    let aggregateAttribs = []
    if(optimizedFilter){
        aggregateAttribs.push({$match: optimizedFilter})
        analyticCount = await filterCount(optimizedFilter)
        analyticCount = analyticCount.length > 0 ? analyticCount[0].count : 0
    } else {
        analyticCount = await countAnalytics();
    }
    if(Object.keys(optimizedSort).length > 0) {
        aggregateAttribs.push({$sort: optimizedSort})
    }
    if(optimizedPaging) {
        aggregateAttribs = aggregateAttribs.concat(optimizedPaging)
    }

    let pageInfo = {
        hasNextPage: (paging.limit + paging?.offset) < analyticCount, 
        hasPreviousPage: paging.offset ? paging.offset > 0 : false
    }
    
    const nodes = await Analytics.aggregate(aggregateAttribs);

    return {nodes, totalCount: analyticCount, pageInfo};
}

// Mutations

export async function addToAnalytics(analytic) {
    const current_analytic = await Analytics.findOne({ createdAt: new Date().getDate() });
    if (current_analytic) {
        return await updateOneAnalytic(current_analytic._id, {
            ips: [...new Set([...current_analytic.ips, ...analytic.ips])],
            count: current_analytic.count + 1,
        });
    } else {
        return await createOneAnalytic(analytic);
    }

}

export async function createOneAnalytic(analytic) {
    return await Analytics.create({
        ...analytic,
        createdAt: new Date().getDate(),
    })
};

export async function updateOneAnalytic(id, update) {
    Object.keys(update).forEach((k) => update[k] == '' && delete update[k]);

    return await Analytics.findByIdAndUpdate(id, {...update})
};
