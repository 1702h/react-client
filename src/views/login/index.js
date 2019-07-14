import React, { Component } from 'react'
import request from '@/utils/request'
import Cookeis from 'js-cookie'
import logincss from '@/static/css/login.module.scss';
//cssmodules

class Login extends Component {
    state = {
        time:3,
        checkCodeBtn:true,
        tip:'获取验证码',
        phone:'',
        password:'',
        checkcode:''
    }
    render() {
        let {checkCodeBtn,tip,phone,password,checkcode} = this.state;
        return (
            <div className={`${logincss.wrap} ${logincss.loginWrap}`}>
                <div className="container">
                    <div className={`${logincss['loginWrap-left']}`}>
                        <h2>Welcome</h2>
                        <p>赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台</p>
                    </div>
                    <div className={`${logincss['loginWrap-right']}`}>
                        <div className={logincss["login-box"]}>
                            <dl className={logincss["login-logo"]}>
                                <dt>
                                    <i className={`iconfont iconlogo ${logincss['logo-icon']}`}></i>
                                </dt>
                                <dd>
                                    赚赚金融渠道管理系统
                                </dd>
                            </dl>
                            <ul className={logincss['login-list']}>
                                <li>
                                    <input type="text" placeholder="请输入手机号" value={phone} onChange={e=>this.setState({'phone':e.target.value})}/>
                                </li>
                                <li>
                                    <input type="password" placeholder="请输入密码" value={password} onChange={e=>this.setState({'password':e.target.value})}/>
                                </li>
                                <li>
                                    <input type="text" placeholder="请输入验证码" value={checkcode} onChange={e=>this.setState({'checkcode':e.target.value})}/>
                                    <span className={`checkcodebtn ${
                                        !checkCodeBtn ? 'active' : ''
                                    }`}
                                    onClick={this.checkcode}>{tip}</span>
                                </li>
                            </ul>
                            <button onClick={this.login} className={logincss['login-btn']}>登陆</button>
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
    login = ()=>{
        let {history} = this.props;
        let {checkcode,phone,password} = this.state;
        request.post('/api/login',{
            checkcode,phone,password
        }).then(data=>{
            let {code,message} = data;
            if(code){
                alert(message)
            }else{
                //登陆成功 向cookie存储
                Cookeis.set('sessionid',data.sessionId,{
                    expires:5
                });
                console.log('cookie存储成功')
                history.push('/home');
            }
        })
    }
    checkcode=()=>{
        let {checkCodeBtn,time} = this.state;
        if(!checkCodeBtn){return};
        this.setState({checkCodeBtn:false,tip:`${time}秒后获取`});
        this.timer = setInterval(()=>{
            time--;
            if(time <= 0){
                request.get('/api/checkCode').then(data=>{
                    this.setState({
                        tip:data.Verification,
                        checkCodeBtn:true,
                        time:3
                    });
                })
                clearInterval(this.timer);
                return;
            }
            this.setState({time:time,tip:`${time}秒后获取`})
        },1000);
    }
}


export default Login;