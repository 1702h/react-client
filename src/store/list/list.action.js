import requset from '@/utils/request'
import {
    GETLISTDATA,
    FILTERLIST
} from '../actionType'

export const getlistdata = (order)=>{
    return dispatch=>{
        requset.get('/api/list',{
            order
        }).then(res=>{
            dispatch({
                type:GETLISTDATA,
                data:res.data
            });
        })
    }
}

export const filterListdata = (values)=>{
    return {
        type:FILTERLIST,
        values
    }
}