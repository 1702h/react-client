import request from '@/utils/request';
import Cookie from 'js-cookie'
import {
    GETUSERINFO,
    CHANGEUSERINFO
} from '../actionType'
export const getUserInfo = (that)=>{
    return (dispatch)=>request.get('/api/islogin').then(res=>{
        dispatch({
            type:GETUSERINFO,
            info:res.info
        });
        that.setState({loginOpen:true});
    }).catch(res=>{
        if(res.status === 401){
            that.props.history.push('/login');
        }
    })
}

export const changeFace = (file)=>{
    let fromData = new FormData();
    fromData.append('file',file);
    return dispatch=>{
        request.post('/api/facePhoto',fromData).then(res=>{
            if(!res.code){
                Cookie.set('sessionid',res.sessionId,{
                    expires:5
                });
                dispatch({
                    type:CHANGEUSERINFO,
                    info:res.info
                })
            }
        })
    }
}