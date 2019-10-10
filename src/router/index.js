import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 首页
    {
      path: '/',
      name: 'tabbar',
      component: (resolve) => require(['../components/tabbar/tabbar.vue'], resolve),
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: (resolve) => require(['../views/index.vue'], resolve),
          meta: {
            title: '首页'
          }
        },
        {
          path: 'product',
          name: 'product',
          component: (resolve) => require(['../views/product.vue'], resolve),
          meta: {
            title: '产品'
          },
          redirect: '/product_list',
          children: [
            // 产品->出借
            {
              path: '/product_list',
              name: 'product_list',
              component: (resolve) => require(['../components/product_list/product_list.vue'], resolve),
              meta: {
                title: '出借'

              }
            },
            // 和宝->搜索
            {
              path: '/search_treasure',
              name: 'search_treasure',
              component: (resolve) => require(['../components/product_list/search_treasure.vue'], resolve),
              meta: {
                title: '和宝'
              }
            }
          ]
        },
        {
          path: 'my',
          name: 'my',
          component: (resolve) => require(['../views/my.vue'], resolve),
          meta: {
            title: '我的'
          }
        }
      ]
    },
    // 信息披露
    {
      path: '/Information_disclosure',
      name: 'Information_disclosure',
      component: (resolve) => require(['../views/Information_disclosure/Information_disclosure.vue'], resolve),
      meta: {
        title: '信息披露'
      }
    },
    // 安全保障
    {
      path: '/safe',
      name: 'safe',
      component: (resolve) => require(['../views/Information_disclosure/safe.vue'], resolve),
      meta: {
        title: '监督管理'
      }
    },
    // 和宝->切换和宝码
    {
      path: '/switch_treasure',
      name: 'switch_treasure',
      component: (resolve) => require(['../components/product_list/switch_treasure.vue'], resolve),
      meta: {
        title: '切换和宝码'
      }
    },
    // 公告
    {
      path: '/announcement',
      name: 'announcement',
      component: (resolve) => require(['../views/announcement/announcement.vue'], resolve),
      meta: {
        title: '公告'
      }
    },
    // 公告详情
    {
      path: '/announcementDetails',
      name: 'announcementDetails',
      component: (resolve) => require(['../views/announcement/announcementDetails.vue'], resolve)
    },
    // 募集
    {
      path: '/raise',
      name: 'raise',
      component: (resolve) => require(['../views/raise/raise.vue'], resolve),
      meta: {
        title: '募集'
      },
      redirect: '/product_introduction',
      children: [
        {
          path: '/product_introduction',
          name: 'product_introduction',
          component: (resolve) => require(['../views/raise/product_introduction.vue'], resolve),
          meta: {
            title: '产品介绍'
          }
        },
        {
          path: '/history_reimbursement',
          name: 'history_reimbursement',
          component: (resolve) => require(['../views/raise/history_reimbursement.vue'], resolve),
          meta: {
            title: '历史还款'
          }
        },
        {
          path: '/repayment_history',
          name: 'repayment_history',
          component: (resolve) => require(['../views/raise/repayment_history.vue'], resolve),
          meta: {
            title: '还款记录'
          }
        },
        {
          path: '/lend_record',
          name: 'lend_record',
          component: (resolve) => require(['../views/raise/lend_record.vue'], resolve),
          meta: {

            title: '出借记录'
          }
        }

      ]
    },
    // 出借确认
    {
      path: '/lend_confirmation',
      name: 'lend_confirmation',
      component: (resolve) => require(['../views/lend_confirmation.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '出借确认',
      }
    },
    // 出借结果
    {
      path: '/borrow_result',
      name: 'borrow_result',
      component: (resolve) => require(['../views/borrow_result.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '出借结果'
      }
    },
    // 预期利息的计算方式
    {
      path: '/yqlxjsfs',
      name: 'yqlxjsfs',
      component: (resolve) => require(['../views/yqlxjsfs.vue'], resolve),
      meta: {
        title: '预期利息的计算方式'
      }
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['../views/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    // 我的账户
    {
      path: '/my_account',
      name: 'my_account',
      component: (resolve) => require(['../views/mine/my_account.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '我的账户'
      }
    },
    // 出借记录
    {
      path: '/borrow_list',
      name: 'borrow_list',
      component: (resolve) => require(['../views/mine/borrow_list/borrow_list.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '出借记录'
      },
      // redirect:'/borrow_all',
      children: [
        {
          path: '/borrow_all',
          name: 'borrow_all',
          component: (resolve) => require(['../views/mine/borrow_list/borrow_all.vue'], resolve),
          meta: {
            title: '全部'
          }
        }
        // {
        //     path:'/raiseing',
        //     name: 'raiseing',
        //     component: (resolve) => require(['../views/mine/borrow_list/raiseing.vue'], resolve),
        //     meta: {
        //         title: '募集中'
        //     },
        // },
        // {
        //     path:'/raised',
        //     name: 'raised',
        //     component: (resolve) => require(['../views/mine/borrow_list/raised.vue'], resolve),
        //     meta: {
        //         title: '募集完成'
        //     },
        // },
        // {
        //     path:'/paymenting',
        //     name: 'paymenting',
        //     component: (resolve) => require(['../views/mine/borrow_list/paymenting.vue'], resolve),
        //     meta: {
        //         title: '还款中'
        //     },
        // },
        // {
        //     path:'/paymented',
        //     name: 'paymented',
        //     component: (resolve) => require(['../views/mine/borrow_list/paymented.vue'], resolve),
        //     meta: {
        //         title: '还款完成'
        //     },
        // }
      ]
    },
    // 出借记录->出借记录
    {
      path: '/borrow_record',
      name: 'borrow_record',
      component: (resolve) => require(['../views/mine/borrow_list/borrow_record.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '出借记录'
      }
    },
    // 出借详情
    {
      path: '/borrow_info',
      name: 'borrow_info',
      component: (resolve) => require(['../views/mine/borrow_list/borrow_info.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '出借详情'
      }
    },
    // 出借协议
    {
      path: '/paymented',
      name: 'paymented',
      component: (resolve) => require(['../views/mine/borrow_list/paymented.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '合同详情'
      }
    },
    // 出借详情
    {
      path: '/isPrepayment',
      name: 'isPrepayment',
      component: (resolve) => require(['../views/mine/borrow_list/isPrepayment.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '原回款计划表'
      }
    },

    // 资金记录
    {
      path: '/money_list',
      name: 'money_list',
      component: (resolve) => require(['../views/mine/money_list/money_list.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '资金记录'
      }
      // redirect:'/money_all',
      // children:[
      //     {
      //         path:'/money_all',
      //         name: 'money_all',
      //         component: (resolve) => require(['../views/mine/money_list/money_all.vue'], resolve),
      //         meta: {
      //             title: '全部'
      //         }
      //     },
      //     {
      //         path:'/lend',
      //         name: 'lend',
      //         component: (resolve) => require(['../views/mine/money_list/lend.vue'], resolve),
      //         meta: {
      //             title: '出借'
      //         },
      //     },
      //     {
      //         path:'/receivable',
      //         name: 'receivable',
      //         component: (resolve) => require(['../views/mine/money_list/receivable.vue'], resolve),
      //         meta: {
      //             title: '回款'
      //         },
      //     },
      //     {
      //         path:'/top_up',
      //         name: 'top_up',
      //         component: (resolve) => require(['../views/mine/money_list/top_up.vue'], resolve),
      //         meta: {
      //             title: '充值'
      //         },
      //     },
      //     {
      //         path:'/withdrawal',
      //         name: 'withdrawal',
      //         component: (resolve) => require(['../views/mine/money_list/withdrawal.vue'], resolve),
      //         meta: {
      //             title: '提现'
      //         },
      //     },
      //     {
      //         path:'/refund',
      //         name: 'refund',
      //         component: (resolve) => require(['../views/mine/money_list/refund.vue'], resolve),
      //         meta: {
      //             title: '退款'
      //         },
      //     }
      // ]
    },
    // 资金详情
    {
      path: '/money_record',
      name: 'money_record',
      component: (resolve) => require(['../views/mine/money_list/money_record.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '资金详情'
      }
    },
    // 优惠券
    {
      path: '/my_coupons',
      name: 'my_coupons',
      component: (resolve) => require(['../views/mine/coupons/index.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '优惠券'
      }
    },
    // 我的回款
    {
      path: '/my_collection',
      name: 'my_collection',
      component: (resolve) => require(['../views/mine/my_collection/my_collection.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '我的回款'
      },
      redirect: '/my_collectioning',
      children: [
        {
          path: '/my_collectioning',
          name: 'my_collectioning',
          component: (resolve) => require(['../views/mine/my_collection/my_collectioning.vue'], resolve),
          meta: {
            requireAuth: true,
            title: '待回款'
          }
        },
        {
          path: '/my_collectioned',
          name: 'my_collectioned',
          component: (resolve) => require(['../views/mine/my_collection/my_collectioned.vue'], resolve),
          meta: {
            requireAuth: true,
            title: '已回款'
          }
        }
      ]
    },
    // 我的推广
    {
      path: '/my_promotion',
      name: 'my_promotion',
      component: (resolve) => require(['../views/mine/my_promotion/my_promotion.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '我的推广'
      }
    },
    // 选择优惠券
    {
      path: '/choose_coupons',
      name: 'choose_coupons',
      component: (resolve) => require(['@/views/choose_coupons.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '优惠券',
      }
    },
    // 绑定邀请人
    {
      path: '/to_bind',
      name: 'to_bind',
      component: (resolve) => require(['../views/mine/my_promotion/to_bind.vue'], resolve),
      meta: {
        title: '绑定邀请人'
      }
    },
    // 风险能力承受测评
    {
      path: '/goRisk',
      name: 'goRisk',
      component: (resolve) => require(['../views/mine/risk/goRisk.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '风险能力承受测评'
      }
    },
    // 风险测评结果
    {
      path: '/riskResult',
      name: 'riskResult',
      component: (resolve) => require(['../views/mine/risk/riskResult.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '风险测评结果'
      }
    },
    // 设置
    {
      path: '/setting',
      name: 'setting',
      component: (resolve) => require(['../views/mine/setting/setting.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '设置'
      }
    },
    // 设置昵称
    {
      path: '/set_name',
      name: 'set_name',
      component: (resolve) => require(['../views/mine/setting/set_name.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '设置昵称'
      }
    },
    // 我的用户名
    {
      path: '/set_user_name',
      name: 'set_user_name',
      component: (resolve) => require(['../views/mine/setting/set_user_name.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '设置用户名'
      }
    },
    // 修改登陆密码
    {
      path: '/set_pwd',
      name: 'set_pwd',
      component: (resolve) => require(['../views/mine/setting/set_pwd.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '修改登录密码'
      }
    },
    // 银行存管账户已开通
    {
      path: '/bank_deposit_account',
      name: 'bank_deposit_account',
      component: (resolve) => require(['../views/mine/setting/bank_deposit_account.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '银行存管账户'
      }
    },
    // 银行存管账户未开通
    {
      path: '/no_bank_deposit_account',
      name: 'no_bank_deposit_account',
      component: (resolve) => require(['../views/mine/setting/no_bank_deposit_account.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '银行存管账户'
      }
    },
    // 我的银行卡
    {
      path: '/my_bank_card',
      name: 'my_bank_card',
      component: (resolve) => require(['../views/mine/setting/my_bank_card.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '我的银行卡'
      }
    },
    // 修改交易密码
    {
      path: '/set_trade_password',
      name: 'set_trade_password',
      component: (resolve) => require(['../views/mine/setting/set_trade_password.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '修改交易密码'
      }
    },
    // 修改交易密码
    {
      path: '/retrieve_transaction_password',
      name: 'retrieve_transaction_password',
      component: (resolve) => require(['../views/mine/setting/retrieve_transaction_password.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '找回交易密码'
      }
    },
    // 更换手机号
    {
      path: '/change_phone',
      name: 'change_phone',
      component: (resolve) => require(['../views/mine/setting/change_phone.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '更换手机号码'
      }
    },
    // 更换手机号
    {
      path: '/change_new_phone',
      name: 'change_new_phone',
      component: (resolve) => require(['../views/mine/setting/change_new_phone.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '更换手机号码'
      }
    },
    // 忘记密码
    {
      path: '/forget_pwd',
      name: 'forget_pwd',
      component: (resolve) => require(['../views/forget_pwd.vue'], resolve),
      meta: {
        title: '忘记密码'
      }
    },
    // 忘记密码
    {
      path: '/forget_pwd_login',
      name: 'forget_pwd_login',
      component: (resolve) => require(['../views/forget_pwd_login.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '忘记密码'
      }
    },
    // 验证码登录
    {
      path: '/verification_code_login',
      name: 'verification_code_login',
      component: (resolve) => require(['../views/verification_code_login.vue'], resolve),
      meta: {
        title: '验证码登录'
      }
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['../views/register.vue'], resolve),
      meta: {
        title: '注册'
      }
    },
    // 注册成功
    {
      path: '/registered',
      name: 'registered',
      component: (resolve) => require(['../views/registered.vue'], resolve),
      meta: {
        title: '注册成功'
      }
    },
    // 开户引导页
    {
      path: '/step',
      name: 'step',
      component: (resolve) => require(['../views/step.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '开户引导'
      }
    },
    // 福利中心
    {
      path: '/welfare_centre',
      name: 'welfare_centre',
      component: (resolve) => require(['../views/mine/welfare_centre/welfare_centre.vue'], resolve),
      meta: {
        title: '福利中心'
      }
    },
    // 活动内页
    {
      path: '/activity',
      name: 'activity',
      component: (resolve) => require(['../views/activity_info/activity1.vue'], resolve),
      meta: {
        title: '新手福利专区'
      }
    },

    // 提现
    {
      path: '/withdrawal_index',
      name: 'withdrawal_index',
      component: (resolve) => require(['../views/withdrawal_index.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '提现'
      }
    },
    // 提现结果
    {
      path: '/withdrawal_index_result',
      name: 'withdrawal_index_result',
      component: (resolve) => require(['../views/withdrawal_index_result.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '提现结果'
      }
    },

    // 充值
    {
      path: '/recharge',
      name: 'recharge',
      component: (resolve) => require(['../views/recharge.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '充值'
      }
    },
    // 充值结果
    {
      path: '/recharge_result',
      name: 'recharge_result',
      component: (resolve) => require(['../views/recharge_result.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '充值结果'
      }
    },
    // 限额说明
    {
      path: '/limit_info',
      name: 'limit_info',
      component: (resolve) => require(['../views/limit_info.vue'], resolve),
      meta: {
        requireAuth: true,
        title: '限额说明'
      }
    },
    // 分享页面
    {
      path: '/shareRegister',
      name: 'shareRegister',
      component: (resolve) => require(['../views/shareRegister.vue'], resolve),
      meta: {
        title: '和掌柜'
      }
    },
    // APP中转页面
    {
      path: '/redirect',
      name: 'redirect',
      component: (resolve) => require(['../views/redirect.vue'], resolve),
      meta: {
        title: '跳转中'
      }
    },
    // 帮助中心
    {
      path: '/help',
      name: 'help',
      component: (resolve) => require(['../views/help.vue'], resolve),
      meta: {
        title: '帮助中心'
      }
    },
    // 帮助中心->问题列表
    {
      path: '/helpList',
      name: 'helpList',
      component: (resolve) => require(['@/views/help/helpList.vue'], resolve)
    },
    // 帮助中心->问题列表->问题答案
    {
      path: '/helpContent',
      name: 'helpContent',
      component: (resolve) => require(['@/views/help/helpContent.vue'], resolve)
    },
    // 运营报告18年6月
    {
      path: '/runReports186',
      name: 'runReports186',
      component: (resolve) => require(['@/views/Information_disclosure/runReports/runReports186.vue'], resolve),
      meta: {
        title: '运营报告'
      }
    },
    // 运营报告18年5月
    {
      path: '/runReports185',
      name: 'runReports185',
      component: (resolve) => require(['@/views/Information_disclosure/runReports/runReports185.vue'], resolve),
      meta: {
        title: '运营报告'
      }
    },
    // 《“和掌柜”信息服务平台服务合同》
    {
      path: '/hzgProtocol',
      name: 'hzgProtocol',
      component: (resolve) => require(['@/views/Information_disclosure/hzgProtocol.vue'], resolve),
      meta: {
        title: '《“和掌柜”信息服务平台服务合同》'
      }
    },
    // 陕坝银行协议
    {
      path: '/jcAgreement',
      name: 'jcAgreement',
      component: (resolve) => require(['@/views/Information_disclosure/jcAgreement.vue'], resolve),
      meta: {
        title: '陕坝银行协议'
      }
    },
    // 操作指南
    {
      path: '/guide',
      name: 'guide',
      component: (resolve) => require(['@/components/other/guide.vue'], resolve),
      meta: {
        title: '操作指南'
      }
    },
    // 优惠卷操作指南
    {
      path: '/counple',
      name: 'counple',
      component: (resolve) => require(['@/components/other/counple.vue'], resolve),
      meta: {
        title: '安全升级 福利加倍'
      }
    },
    // P2P存管业务介绍
    {
      path: '/depository_introduced',
      name: 'depository_introduced',
      component: (resolve) => require(['@/components/other/bank.vue'], resolve),
      meta: {
        title: 'P2P存管业务介绍'
      }
    },
    // IOS下载
    {
      path: '/download',
      name: 'download',
      component: (resolve) => require(['@/views/download.vue'], resolve),
      meta: {
        title: '和掌柜APP'
      }
    },
    // 下载APP
    {
      path: '/downFirst',
      name: 'downFirst',
      component: (resolve) => require(['@/views/downFirst.vue'], resolve),
      meta: {
        title: '和掌柜APP'
      }
    },
    // 403页面
    {
      name: 'page403',
      path: '/page403',
      component: (resolve) => require(['../views/page403.vue'], resolve),
      meta: {
        title: '网络出错啦'
      }
    },
    // 404页面
    {
      name: 'page404',
      path: '/404',
      component: (resolve) => require(['@/views//page404.vue'], resolve),
      meta: {
        title: '页面未被找到'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
