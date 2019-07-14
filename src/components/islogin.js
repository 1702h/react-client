import React from 'react'
import {connect} from 'react-redux'
import * as userAction from '@/store/user/user.action'
import {bindActionCreators} from 'redux'
const islogin = (Home)=>{  //判断是否登录
    class Islogin extends React.Component{
        state = {
            loginOpen:false
        }
        render(){
            let {loginOpen} = this.state;
            return loginOpen && <Home {...this.props}/>
        }
        componentDidMount(){
            this.props.getUserInfo(this);
        }
    }
    return connect(
        (state)=>state.user,
        dispath=>bindActionCreators(userAction,dispath)
    )(Islogin)
}


export default islogin;