import { v4 as uuidv4 } from 'uuid'

export default {
  namespaced: true,
  state: {
    page: {},
    current: null
  },
  mutations: {
    SET_PAGE_DATA: (state, data) => {
      state.page = data
    },
    SET_CURRENT: (state, data) => {
      state.current = data
    }
  },
  actions: {
    // 设置当前选中模块
    SetCurrent ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT', data)
        resolve()
      })
    },
    // 初始化重置页面数据
    ResetPageData ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_PAGE_DATA', {
          title: '首页',
          ratio: 2,
          pageStyle: {
            backgroundColor: '#F8F8F8'
          },
          componentList: [{
            id: uuidv4(),
            type: 1,
            templateType: 1,
            componentStyle: {
              marginBottom: 0
            },
            componentContentList: [{
              id: uuidv4(),
              title: '标题一',
              width: 750,
              height: 450,
              imgUrl: 'https://alicdn.madaomall.com/feima-uploaded/images/f6/99/f6997f48d92c3501e9f1c5637350920a.png',
              linkType: 1,
              linkPageId: '1111'
            }, {
              id: uuidv4(),
              title: '标题二',
              width: 750,
              height: 450,
              imgUrl: 'https://alicdn.madaomall.com/feima-uploaded/images/1a/85/1a8544ec2fe05fe46328431f026a56dc.png',
              linkType: 2,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '标题三',
              width: 750,
              height: 450,
              imgUrl: 'https://alicdn.madaomall.com/feima-uploaded/images/89/6e/896ee78c024f958b0bec18ff06d0af83.png',
              linkType: 1,
              linkPageId: '2222'
            }, {
              id: uuidv4(),
              title: '标题四',
              width: 750,
              height: 450,
              imgUrl: 'https://alicdn.madaomall.com/feima-uploaded/images/12/0d/120d13cb17eb8fd0c2d80992ad6c617f.jpg',
              linkType: 2,
              productId: '92941'
            }]
          }, {
            id: uuidv4(),
            type: 2,
            templateType: 0,
            componentStyle: {
              marginBottom: 0
            },
            componentContentList: [{
              id: uuidv4(),
              title: '严选好货',
              width: 30,
              height: 30,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/icon-good.png'
            }, {
              id: uuidv4(),
              title: '厂家直销',
              width: 30,
              height: 30,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/icon-zhi.png'
            }, {
              id: uuidv4(),
              title: '品质保证',
              width: 30,
              height: 30,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/icon-you.png'
            }]
          }, {
            id: uuidv4(),
            type: 3,
            templateType: 3,
            componentStyle: {
              marginBottom: 10
            },
            componentContentList: [{
              id: uuidv4(),
              title: '防疫专区',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-1.png',
              linkType: 2,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '宅家必备',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-2.png',
              linkType: 1,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '学习用品',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-3.png',
              linkType: 2,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '美妆个护',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-4.png',
              linkType: 1,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '美妆个护',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-5.png',
              linkType: 2,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '进口专区',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-6.png',
              linkType: 1,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '母婴亲子',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-7.png',
              linkType: 2,
              productId: '92941'
            }, {
              id: uuidv4(),
              title: '春季新品',
              width: 100,
              height: 100,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-icon-8.png',
              linkType: 1,
              productId: '92941'
            }]
          }, {
            id: uuidv4(),
            type: 4,
            templateType: 0,
            componentStyle: {
              marginBottom: 0
            },
            componentContentList: [{
              id: uuidv4(),
              title: '春季新品',
              subTitle: '更多',
              width: 710,
              height: 380,
              imgUrl: 'http://alicdn.madaomall.com/static/fed/images/mp-app-pic/home-img-bg-2.png',
              linkPageId: '',
              productId: '',
              productList: [{
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 1,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/389/435/9230534983_451685149.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/dd/72/dd72813265caf61cf1b81c21d1a0b5a8.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/23/1123993833cebee6ebbce589240baaad.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/469/516/8644615964_1062264180.jpg'
              }]
            }]
          }, {
            id: uuidv4(),
            type: 5,
            templateType: 4,
            componentStyle: {
              marginBottom: 10,
              textColor: '#FD3D37',
              backgroundColor: '#F8F8F8'
            },
            componentContentList: [{
              id: uuidv4(),
              title: '精选',
              subTitle: '猜你喜欢',
              linkType: 2,
              productId: '92941',
              productList: [{
                id: uuidv4(),
                productName: '两穿凉拖2020款凉鞋女夏中跟简约时尚仙女一字带粗跟拖鞋女外穿韩版百搭高跟鞋 金色-两穿凉拖6号 36',
                retailPrice: 10,
                earningPrice: 1,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
              }, {
                id: uuidv4(),
                productName: 'ACECOAT简约商务休闲手提包男女笔记本电脑包文件袋托特包苹果联想小米13.3英寸手拎包单肩包14 卡其色【短手提版】 13.3/14英寸',
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/389/435/9230534983_451685149.jpg'
              }, {
                id: uuidv4(),
                productName: '恋着你短袖t恤女宽松2020春夏新品韩版学生显瘦大码男女半袖女士上衣打底衫团体班服定制WD0042 0312白色 M(建议115-130斤内)',
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/dd/72/dd72813265caf61cf1b81c21d1a0b5a8.jpg'
              }, {
                id: uuidv4(),
                productName: 'CUF 香港潮牌 棉麻连衣裙夏季新款女装纯色薄款透气无袖系带收腰显瘦气质中长款过膝亚麻A字裙子 卡其色 S',
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/23/1123993833cebee6ebbce589240baaad.jpg'
              }]
            }, {
              id: uuidv4(),
              title: '导航二',
              subTitle: '副标题',
              linkType: 2,
              productId: '92941',
              productList: [{
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 1,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/389/435/9230534983_451685149.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/dd/72/dd72813265caf61cf1b81c21d1a0b5a8.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/23/1123993833cebee6ebbce589240baaad.jpg'
              }]
            }, {
              id: uuidv4(),
              title: '导航三',
              subTitle: '副标题',
              linkType: 2,
              productId: '92941',
              productList: [{
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 1,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/389/435/9230534983_451685149.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/dd/72/dd72813265caf61cf1b81c21d1a0b5a8.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/23/1123993833cebee6ebbce589240baaad.jpg'
              }]
            }, {
              id: uuidv4(),
              title: '导航四',
              subTitle: '副标题',
              linkType: 2,
              productId: '92941',
              productList: [{
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 1,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/389/435/9230534983_451685149.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/dd/72/dd72813265caf61cf1b81c21d1a0b5a8.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/23/1123993833cebee6ebbce589240baaad.jpg'
              }]
            }, {
              id: uuidv4(),
              title: '导航五',
              subTitle: '副标题',
              linkType: 2,
              productId: '92941',
              productList: [{
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 1,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/389/435/9230534983_451685149.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/dd/72/dd72813265caf61cf1b81c21d1a0b5a8.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/23/1123993833cebee6ebbce589240baaad.jpg'
              }]
            }]
          }, {
            id: uuidv4(),
            type: 6,
            templateType: 3,
            componentStyle: {
              marginBottom: 10,
              backgroundColor: '#F8F8F8'
            },
            componentContentList: [{
              id: uuidv4(),
              productId: '92941',
              productList: [{
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 1,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/818/675/8122576818_2034219315.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://cbu01.alicdn.com/img/ibank/2018/389/435/9230534983_451685149.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/dd/72/dd72813265caf61cf1b81c21d1a0b5a8.jpg'
              }, {
                id: uuidv4(),
                retailPrice: 10,
                earningPrice: 9,
                mainPic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/23/1123993833cebee6ebbce589240baaad.jpg'
              }]
            }]
          }]
        })
        resolve()
      })
    }
  }
}
