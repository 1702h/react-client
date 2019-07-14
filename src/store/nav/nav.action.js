import {
    ADDTOPNAV,
    REMOVETOPNAV
} from '../actionType'
export const addTopNav = (path,name)=>{
    return {
        type:ADDTOPNAV,
        path,
        name
    }
}

export const removeNav = (path)=>{
    return {
        type:REMOVETOPNAV,
        path
    }
}

