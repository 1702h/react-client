import React from 'react';
export default [
    { 
      title: '订单号', 
      dataIndex: 'id', 
      key: '1' 
    },
    { 
      title: '下单时间', 
      dataIndex: 'date', 
      key: '2' 
    },
    { 
      title: '用户名称', 
      dataIndex: 'customerName', 
      key: '3' 
    },
    { 
      title: '手机号', 
      dataIndex: 'phone', 
      key: '4' 
    },
    { 
      title: '产品类型', 
      dataIndex: 'type', 
      key: '5' 
    },
    { 
      title: '贷款金额(万元)', 
      dataIndex: 'money', 
      key: '6' 
    },
    { 
      title: '贷款利率', 
      dataIndex: 'interestRate', 
      key: '8' 
    },
    { 
      title: '订单状态', 
      dataIndex: 'handleState', 
      key: '9' 
    },
    { 
      title: '客服', 
      dataIndex: 'serviceName', 
      key: '10' 
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a href="javascript:;"><i>...</i></a>,
    },
  ];