import {
    GETLISTDATA,
    FILTERLIST
} from '../actionType'
const defaultState = {
    listdata:[], //当前列表的全部数据
    selectedData:[]//筛选之后的数据
}
const defaultFilter = [
    'handleState',
    'serviceName',
    'type'
]
const isFilter = (item,values)=>{
    let [startTime,endTime] = values.time;
    let curTime = new Date(item.date)
    return Object.keys(values).every(key=>{
        if(defaultFilter.includes(key)){
               return (values[key] === item[key] || values[key] === 'default');
        }else if(key==='time'){
            if(startTime && endTime){
                return (startTime <= curTime && curTime <= endTime)
            }else{
                return true;
            }
        }else{
            return (values.minMoney <= item.money && item.money <= values.maxMoney)
        }
    });
}
const types = ['新订单','未审核','已接单','已完成','暂无状态']
const list = (state = defaultState,action)=>{
    switch(action.type){
        case GETLISTDATA:
        {
            state.listdata = action.data;
            state.selectedData = action.data.map(item=>{
                item.key = item.id;
                item.handleState = types[item.handleState];
                return item;
            })
            return {
                ...state,
                listdata:[...state.listdata],
                selectedData:[...state.selectedData]
            }
        }
        case FILTERLIST:
        {
            let {values} = action; //帅选条件
            let {listdata} = state;
            listdata = listdata.filter(item=>{
                //条件
                return isFilter(item,values);
            })
            return {
                ...state,
                selectedData:[...listdata]
            }
        }
        default :
            return state;
    }
    
}


export default list;