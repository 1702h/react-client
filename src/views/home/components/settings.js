import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as userAction from '@/store/user/user.action'
import {Button} from 'antd';
class HomeSetting extends React.Component{
    state = {
        imgurl:'',
        files:null
    }
    render(){
        // console.log(this.props)
        let {imgurl} = this.state;
        let {info} = this.props
        return <div>
            <div className="setImg">
                <img src={imgurl ? imgurl : info.facePhoto} />
                <input type='file' onChange={this.submitImg}/>
            </div>
            <Button type="success" onClick={this.changeFace}>更改</Button>

        </div>
    }
    submitImg=(e)=>{
        let files = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.onload = ()=> {
           this.setState({imgurl:fileReader.result,files});
        }
    }
    changeFace=()=>{
        let {files} = this.state;
        this.props.changeFace(files);
    }
    createImage(src){
        let img = new Image();
        return new Promise((resolve,reject)=>{
            img.onload = ()=>{
                resolve(img);
            }
            img.onerror = (e)=>{
                reject(e);
            }
            img.src = src;
        })
    }
}

export default connect(
    state=>{
        return {...state.user}
    },
    dispatch=>bindActionCreators(userAction,dispatch)
)(HomeSetting)