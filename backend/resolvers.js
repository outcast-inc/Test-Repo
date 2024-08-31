import { 
    getUser,
    registerUser,
    createOneUser,
    createManyUsers,
    updateOneUser,
    updateManyUsers,
    deleteOneUser,
    deleteManyUsers,
    findUsers
} from "./db/user.js";
import { 
    loginCallback,
    refreshAuthToken
} from "./auth.js";
import { 
    getService,
    getServiceBySlug,
    findServices,
    createOneService,
    createManyServices,
    updateOneService,
    updateManyServices,
    deleteOneService,
    deleteManyServices
} from "./db/service.js";
import { 
    createManyCourses,
    createOneCourse,
    deleteManyCourses,
    deleteOneCourse,
    findCourses, 
    getCourse, 
    getCourseBySlug, 
    updateManyCourses, 
    updateOneCourse
} from "./db/course.js";

import { 
    createManyContactUss, 
    createOneContactUs, 
    deleteManyContactUss, 
    deleteOneContactUs, 
    findContactUss, 
    getContactUs, 
    updateManyContactUss, 
    updateOneContactUs 
} from "./db/contactUs.js"

import storeUpload from "./storeUploads.js";
import { addToAnalytics, findAnalytics } from "./db/analytics.js";

export const resolvers = {
    Query: {
        me: async(_root, {}, context) => {
            if(!context || !context.user)
                return null
            return context.user;
        },
        user: async(_root, {id}) => {
            return await getUser(id);
        },
        users: async(_root, { paging, filter, sorting }, context) => {
            return await findUsers(paging, filter, sorting);
        },
        service: async(_root, { id }, context) => {
            return await getService(id);
        },
        serviceSlug: async(_root, { slug }) => {
            return await getServiceBySlug(slug);
        },
        services: async(_root, { paging, filter, sorting }, context) => {
            return await findServices(paging, filter, sorting);
        },
        course: async(_root, { id }, context) => {
            return await getCourse(id);
        },
        courseSlug: async(_root, { slug }) => {
            return await getCourseBySlug(slug);
        },
        courses: async(_root, { paging, filter, sorting }, context) => {
            return await findCourses(paging, filter, sorting);
        },

        analytics: async(_root, { paging, filter, sorting }, context) => {
            if(!context || !context.user)
                return null
            return await findAnalytics(paging, filter, sorting);
        },

        contactUs: async(_root, { id }) => {
            return await getContactUs(id);
        },
        contactUss: async(_root, { paging, filter, sorting }, context) => {
            return await findContactUss(paging, filter, sorting);
        },
    },
    Mutation: {
        login: async(_root, {loginInput : { email, password }}) => {
            return await loginCallback(email, password)
        },
        refreshToken: async(_root, {refresh_token}, context) => {
            const value = await refreshAuthToken(refresh_token);
            return value;
        },
        register: async(_root, {registerInput: { email, password }}, context) => {
            if(!context || !context.user)
                return null
            const user = registerUser(email, password, context.user.id);
            return await user;
        },
        createOneUser: async(_root, {input : { user }}, context) => {
            if(!context || !context.user)
                return null
            const newUser = createOneUser( user , context.user.id);
            return await newUser;  
        },
        createManyUsers: async(_root, {input : { users }}, context) => {
            if(!context || !context.user)
                return null
            const newUsers = createManyUsers(users, context.user.id);
            return await newUsers;
        },
        updateOneUser: async(_root, {input : { id, update }}, context) => {
            return await updateOneUser(id, update);
        },
        updateManyUsers: async(_root, {input: { filter, update }}, context) => {
            const val = await updateManyUsers(filter, update);
            const updatedCount = val.length
            return {updatedCount}
        },
        deleteOneUser: async(_root, {input: { id }}, context) => {
            return await deleteOneUser(id);
        },
        deleteManyUsers: async(_root, {input: { filter }}, context) => {
            const deleteUsers = await deleteManyUsers(filter);
            const deletedCount = deleteUsers.length
            return {deletedCount}
        },

        createOneService: async(_root, {input: { service }}, context) => {
            if(!context || !context.user)
                return null
            const newService = createOneService( service , context.user._id);
            return await newService;
        },
        createManyServices: async(_root, {input: { services }}, context) => {
            if(!context || !context.user)
                return null
            const newServices = createManyServices(services, context.user._id);
            return await newServices;
        },
        updateOneService: async(_root, {input: { id, update }}, context) => {
            if(!context || !context.user)
                return null
            return await updateOneService(id, update, context.user._id) 
        },
        updateManyServices: async(_root, {input: { filter, update }}, context) => {
            if(!context || !context.user)
                return null
            const val = await updateManyServices(filter, update, context.user._id);
            const updatedCount = val.length
            return {updatedCount}
        },
        deleteOneService: async(_root, {input: { id }}, context) => {
            return await deleteOneService(id);
        },
        deleteManyServices: async(_root, {input: { filter }}, context) => {
            const deleteServices = await deleteManyServices(filter);
            const deletedCount = deleteServices.length
            return {deletedCount}
        },

        createOneCourse: async(_root, {input: { course }}, context) => {
            if(!context || !context.user)
                return null
            const newCourse = createOneCourse( course , context.user._id);
            return await newCourse;
        },
        createManyCourses: async(_root, {input: { courses }}, context) => {
            if(!context || !context.user)
                return null
            const newCourses = createManyCourses(courses, context.user._id);
            return await newCourses;
        },
        updateOneCourse: async(_root, {input: { id, update }}, context) => {
            if(!context || !context.user)
                return null
            return await updateOneCourse(id, update, context.user._id) 
        },
        updateManyCourses: async(_root, {input: { filter, update }}, context) => {
            if(!context || !context.user)
                return null
            const val = await updateManyCourses(filter, update, context.user._id);
            const updatedCount = val.length
            return {updatedCount}
        },
        deleteOneCourse: async(_root, {input: { id }}, context) => {
            return await deleteOneCourse(id);
        },
        deleteManyCourses: async(_root, {input: { filter }}, context) => {
            const deleteCourses = await deleteManyCourses(filter);
            const deletedCount = deleteCourses.length
            return {deletedCount}
        },

        createOneContactUs: async(_root, {input: { contactus }}, context) => {
            const newContactUs = createOneContactUs( contactus);
            return await newContactUs;
        },
        createManyContactUss: async(_root, {input: { contactuss }}, context) => {
            const newContactUs = createManyContactUss(contactuss);
            return await newContactUs;
        },
        updateOneContactUs: async(_root, {input: { id, update }}, context) => {
            if(!context || !context.user)
                return null
            return await updateOneContactUs(id, update) 
        },
        updateManyContactUss: async(_root, {input: { filter, update }}, context) => {
            if(!context || !context.user)
                return null
            const val = await updateManyContactUss(filter, update);
            const updatedCount = val.length
            return {updatedCount}
        },
        deleteOneContactUs: async(_root, {input: { id }}, context) => {
            return await deleteOneContactUs(id);
        },
        deleteManyContactUss: async(_root, {input: { filter }}, context) => {
            const deleteServices = await deleteManyContactUss(filter);
            const deletedCount = deleteServices.length
            return {deletedCount}
        },

        addAnalytic: async(_root, { input: { analytic } }) => {
            return await addToAnalytics(analytic);
        },

        uploadFile: async(_root, { file }) => {
            const { storedFileName, storedHref } = await storeUpload(file.file);
            const previewUrl = `http://localhost:9000/${storedFileName}`;
            return { previewUrl };
        }
    }
}