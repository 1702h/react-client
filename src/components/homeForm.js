import React from 'react';
import {
    Form,
    Button,
    Input,
    Select,
    DatePicker,
    Radio
} from 'antd';
import listcss from '@/static/css/list.module.scss'
import {types,idType,servieName} from '@/utils/setdata'
import {connect} from 'react-redux'
const { RangePicker } = DatePicker;
const { Option } = Select;

class HomeForm extends React.Component{
    state = {
        selectState:{
            money:[]
        },
        minMoney:''
    }
    render(){
        let {selectState} = this.state;
        const {getFieldDecorator} = this.props.form;
        return <Form
            layout="inline"
        >
            <Form.Item label={'处理时间'}>
                {
                   getFieldDecorator('time',{
                      initialValue:[]
                   })(
                        <RangePicker onChange={this.getTime.bind(this)}/>
                   )
                }
            </Form.Item>
            <Form.Item label={'金额范围'} validateStatus={''} help=''>
                {
                    getFieldDecorator('minMoney',{
                        initialValue:'10000'
                    })(
                        <Input 
                            type="number"
                            style={{width:100}}
                        />
                    )
                }
                &nbsp;&nbsp;-&nbsp;&nbsp;  
                {
                    getFieldDecorator('maxMoney',{
                        initialValue:'200000'
                    })(
                        <Input 
                            type="number"
                            style={{width:100}}
                        />
                    )
                }
            </Form.Item>
            <Form.Item label={'处理状态'}>
                {
                    getFieldDecorator('handleState',{
                        rules:[],
                        initialValue:'default'
                    })(
                        <Radio.Group>
                        <Radio.Button 
                        value={'default'}
                        className={listcss['ant-radio-button-wrapper']}>全部</Radio.Button>
                        {
                            types.map((item,key)=>{
                                return <Radio.Button
                                    key={key}
                                    value={item}
                                    className={listcss['ant-radio-button-wrapper']}
                                    >{item}</Radio.Button>
                            })
                        }
                        </Radio.Group>
                    )
                }
               
            </Form.Item>
            <Form.Item label={'转单类型'}>
                {
                    getFieldDecorator('type',{
                        initialValue:'default'
                    })(
                        <Select>
                            <Option value={'default'} disabled={true}>
                                请选择类型
                            </Option>
                            {
                                idType.map((item,key)=><Option key={key} value={item}>
                                    {item}
                                </Option>)
                            }
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item label={'客服名称'}>
                {
                    getFieldDecorator('serviceName',{
                        initialValue:'default'
                    })(
                        <Select>
                            <Option value={'default'} disabled={true}>
                                请选择客服
                            </Option>
                            {
                                servieName.map((item,key)=><Option key={key} value={item}>
                                    {item}
                                </Option>)
                            }
                        </Select>
                    )
                }
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={this.submit.bind(this)}>提交</Button>
            </Form.Item>
        </Form>
    }
    getTime(time){
        this.props.form.setFieldsValue({
            time
        })
    }
    submit(){
        this.props.form.validateFields((err,values)=>{
             if(err){
                 return ;
             }
             let {maxMoney,minMoney} = values;
             minMoney = minMoney / 10000;
             maxMoney = maxMoney / 10000;
             if(minMoney > maxMoney){
                 alert('价格范围不合理')
                 return;
             }
             this.props.getValue({
                 ...values,
                 minMoney,
                 maxMoney
             });
        })
    }
}
HomeForm = Form.create()(HomeForm);

export default HomeForm;