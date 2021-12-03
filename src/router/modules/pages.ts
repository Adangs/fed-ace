import LayoutOuter from '@/layout/index.vue'
import { markRaw } from 'vue'

export default [
  {
    path: '/pages',
    component: markRaw(LayoutOuter),
    redirect: 'pages/create',
    children: [
      {
        path: 'create',
        name: 'PageCreate',
        component: () => import('@/views/page/create.vue'),
        meta: {
          title: '微页面创建'
        }
      },
      {
        path: 'edit',
        name: 'PageEdit',
        component: () => import('@/views/page/create.vue'),
        meta: {
          title: '微页面编辑'
        }
      },
      {
        path: 'copy',
        name: 'PageCopy',
        component: () => import('@/views/page/create.vue'),
        meta: {
          title: '微页面复制'
        }
      },
      {
        path: 'preview',
        name: 'PagePreview',
        component: () => import('@/views/page/preview.vue'),
        meta: {
          title: '微页面预览'
        }
      }
    ]
  }
]
