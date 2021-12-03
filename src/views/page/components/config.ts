// 数据基本结构
export const aside = [
  {
    title: '基础组件',
    type: 'base',
    list: [
      {
        vue_name: 'Banner广告',
        vue_icon: 'icon-030',
        vue_componentsName: 'banner',
        vue_limit: 50,
        type: 1,
        templateType: 1,
        componentStyle: {
          marginBottom: 10,
          backgroundColor: null
        },
        componentContentList: []
      },
      {
        vue_name: '标题文本',
        vue_icon: 'icon-040',
        vue_componentsName: 'text',
        vue_limit: 20,
        type: 8,
        templateType: 12,
        componentStyle: {
          marginBottom: 10,
          backgroundColor: '#ffffff'
        },
        componentContentList: [
          {
            title: '标题',
            remark: '描述',
            contentStyle: {
              textAlign: 'left',
              titleFontSize: 18,
              titleColor: '#333333',
              titleFontWeight: 'bold',
              descFontSize: 16,
              descColor: '#646464',
              descFontWeight: 'normal'
            }
          }
        ]
      },
      {
        vue_name: '分类导航',
        vue_icon: 'icon-048',
        vue_componentsName: 'nav',
        vue_limit: 20,
        type: 4,
        templateType: 14,
        listType: 5,
        componentStyle: {
          marginBottom: 0,
          backgroundColor: '#ffffff'
        },
        componentContentList: []
      },
      {
        vue_name: '商品/推广页',
        vue_icon: 'icon-043',
        vue_componentsName: 'product',
        vue_limit: 30,
        type: 6,
        templateType: 3,
        componentStyle: {
          marginBottom: 10,
          backgroundColor: '#F8F8F8'
        },
        componentContentList: [
          {
            linkType: 2,
            productId: null,
            productList: [],
            contentStyle: {
              buying: { enable: false, value: 1 },
              sign: {
                enable: false,
                value:
                  'https://alicdn.madaomall.com/test/feima-uploaded/images/1b/d5/1bd5c6c474245b707e4bfe9c920145b9.png'
              }
            }
          }
        ]
      }
    ]
  }
]
