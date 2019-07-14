import {
    GETUSERINFO,
    CHANGEUSERINFO
} from '../actionType'
const user = (state = {
    info:{}
},action)=>{
   switch(action.type){
        case GETUSERINFO:
            let newState = {info:{...state.info}}
            newState.info = action.info
            return newState;
        case CHANGEUSERINFO:
            let {info} = action;
            console.log(info);
            state.info = info;
            return {
                ...state
            }
        default :
            return state;
   }
}

export default user;