import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import RouterView from '@/router/routerView'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import '@/static/css/home.scss'
import { Layout, Menu, Button , Modal } from 'antd';
import * as navAction from '@/store/nav/nav.action'
import Cookie from 'js-cookie'
const { Header, Sider, Content } = Layout;
const {SubMenu} = Menu;
const { confirm } = Modal;
function showConfirm(that) {
    confirm({
      title: '确定要退出吗?',
      content: '退出之后...',
      onOk() {
        Cookie.remove('sessionid');
        that.props.history.push('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  
class Homewrap extends Component {
    render() {
        let {routes,data,info,selectedData} = this.props;
        return (
            <Layout className="homewrap">
               <Sider>
                   <dl className="userInfo">
                       <dt>
                           <img src={'http://localhost:3000'+info.facePhoto} />
                       </dt>
                       <dd>
                            {info.phone}
                       </dd>
                   </dl>
                   
                    <Menu
                        mode="inline"
                        theme="dark"
                    >
                        <Menu.Item onClick={this.handleTitle.bind(this,'/home/index','首页')}>
                            <NavLink to="/home/index">首页</NavLink>
                        </Menu.Item>
                        {
                            data.map((item,key)=><SubMenu
                                key={key}
                                title={
                                    <span>
                                    <i></i>
                                    {item.name}
                                    </span>
                                }>
                                {
                                    item.children.map((item,key)=><Menu.Item 
                                        key={item.path}
                                        onClick={this.handleTitle.bind(this,item.path,item.name)}
                                    >
                                        <NavLink to={item.path}>{item.name}</NavLink>
                                    </Menu.Item>)
                                }
                            </SubMenu>)
                        }
                        
                    </Menu>
                    <Button onClick={()=>this.props.history.push('/home/settings')}>设置</Button>
                    <Button onClick={()=>showConfirm(this)}>退出</Button>
               </Sider>
                <Layout>
                    <Header className="navtop">
                        {
                            selectedData.map(item=><span key={item.path}>
                                <NavLink key={item.path} to={item.path}>{item.name}
                                </NavLink>
                                <b onClick={this.removeNav.bind(this,item.path)}>&times;</b>
                            </span>)
                        }
                    </Header>
                    <Content>
                        <RouterView routes={routes}/>
                    </Content>
                </Layout>
            </Layout>
        )
    }
    handleTitle(path,name){
       this.props.addTopNav(path,name);
    }
    removeNav(path){
       this.props.removeNav(path);
    }
}


export default connect(
    state=>{
        return {
            ...state.nav,
            ...state.user
        };
    },
    dispatch=>bindActionCreators(navAction,dispatch)
)(Homewrap);