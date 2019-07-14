import data from '@/mock/nav'
import {
    ADDTOPNAV,
    REMOVETOPNAV
} from '../actionType'
const nav = (state = {
    data,
    selectedData:[
        {
            path:'/home/index',
            name:'首页'
        }
    ]
},action)=>{
    switch(action.type){
        case ADDTOPNAV:
        {
            let {path,name} = action;
            let newState = {
                ...state,
                selectedData:[...state.selectedData]
            };
            let index = newState.selectedData.findIndex(item=>item.path === path);
            if(index !== -1){
                //存在
                let target = newState.selectedData[index];
                newState.selectedData.splice(index,1);
                newState.selectedData.unshift(target);
            }else{
                newState.selectedData.unshift({
                    path,
                    name
                })
            }
            return newState;
        } 
        case REMOVETOPNAV:
        {
            let {path} = action;
            let newState = {
                ...state,
                selectedData:[...state.selectedData]
            };
            let index = newState.selectedData.findIndex(item=>item.path === path);
            newState.selectedData.splice(index,1);
            return newState
        } 
        default :
            return state;
    }
}

export default nav;