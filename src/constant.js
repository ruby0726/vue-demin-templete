module.exports = {
  //  渠道类型
  channelType: [
    {
      key: '1',
      label: '药厂'
    },
    {
      key: '2',
      label: '医院'
    }
  ],
  // 商家类型
  businessType: [
    {
      key: '1',
      label: '自营'
    },
    {
      key: '2',
      label: '企业'
    },
    {
      key: '3',
      label: '医院'
    }
  ],
  // 商品订单类型
  goodsOrderType: [
    {
      key: '1',
      label: '西药'
    },
    {
      key: '2',
      label: '中成药'
    },
    {
      key: '3',
      label: '草药饮片'
    },
    {
      key: '4',
      label: '草药颗粒'
    }
  ],
  //药品类型
  drugType: [
    {
      key: '1',
      label: '中药饮片'
    }, {
      key: '2',
      label: '西药'
    }, {
      key: '3',
      label: '草药颗粒'
    }, {
      key: '4',
      label: '中成药'
    },
  ],
  //药品审核状态
  drugStatusList: [
    {label: '全部', key: ''},
    {label: '待审核', key: '1'},
    {label: '通过', key: '2'},
    {label: '驳回', key: '3'},
    // {label: '下架', key: '4'},
  ],
  drugShelvesType: [
    {label: '全部', key: ''},
    {label: '上架', key: '1'},
    {label: '下架', key: '2'},
  ],
  //商品订单状态
  orderStatusType: [
    {key: '', label: '全部'},
    {key: 1, label: '待接单'},
    {key: 2, label: '待发货'},
    {key: 3, label: '已发货'},
    {key: 4, label: '已退款'},
    {key: 5, label: '已完成'},
    {key: 7, label: '已取消'},
  ],
  //商家审核状态
  merchantStatusList: [
    {
      key: '',
      label: '全部'
    },
    {
      key: 1,
      label: '待审核'
    },
    {
      key: 2,
      label: '已驳回'
    },
    {
      key: 3,
      label: '通过'
    },
    {
      key: 4,
      label: '停用'
    },
  ],
  //经营范围
  merchantRange: [
    {
      key: '1',
      label: '西药'
    },
    {
      key: '2',
      label: '中成药'
    },
    {
      key: '3',
      label: '草药颗粒'
    },
    {
      key: '4',
      label: '草药饮片'
    },
    {
      key: '5',
      label: '医疗器械'
    },
    {
      key: '6',
      label: '化妆品'
    },
    {
      key: '7',
      label: '卫销产品'
    },
    {
      key: '8',
      label: '保健食品'
    },
    {
      key: '9',
      label: '日用百货'
    },
    {
      key: '10',
      label: '计生用品'
    },
    {
      key: '11',
      label: '预包装食品'
    },
    {
      key: '12',
      label: '特殊食品'
    },
    {
      key: '13',
      label: '物料用品'
    }
  ],
  //默认时间
  defaultTime:['00:00:00','23:59:59'],

};

