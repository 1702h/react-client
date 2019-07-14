import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as listAction from '@/store/list/list.action'
import {Table} from 'antd'
import columns from '@/mock/columns'
import listcss from '@/static/css/list.module.scss'
import {handleState} from '@/utils/setdata'
import HomeForm from '@/components/homeForm'

class Order extends Component {
    state = {
        columns
    }
    render() {
        let {selectedData} = this.props;
        let {columns} = this.state;
        return (
            <div className={listcss["list-wrap"]}>
                <div style={{
                    padding:10,
                    background:'#fff'
                }}>
                    <HomeForm getValue={this.getValue.bind(this)}/>
                </div>
                <div style={{
                    padding:10,
                    background:'#fff'
                }}>
                    <Table 
                        columns={columns} 
                        dataSource={selectedData} 
                        scroll={{ x: 1300 }} 
                        pagination={{
                            pageSize:8,
                            showTotal:a=>`共${a}条`
                        }}
                    />
                </div>

            </div>
        )
    }
    componentDidMount(){
        let name = this.props.match.params.name;
        this.props.getlistdata(this.getId(name));
    }
    componentWillReceiveProps(nextProps){  //props
        let curname = nextProps.match.params.name; //准备跳转得url
        let name = this.props.match.params.name;  //之前得url
        (curname!==name) && this.props.getlistdata(this.getId(curname));
    }
    getId(name){
        switch(name){
            case 'dk':
                return 1;
            case 'zd':
                return 2;
            default :
                return 3
        }
    }
    getValue(values){
        this.props.filterListdata(values);
    }
}


export default connect(
    state=>({
        ...state.list
    }),
    dispatch=>bindActionCreators(listAction,dispatch)
)(Order);