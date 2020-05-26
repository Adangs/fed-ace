import Layout from '~/views/layout'

export default [{
  path: '',
  component: Layout,
  name: 'application',
  children: [{
    path: '',
    component: () => import('~/views/application/page'),
    name: 'Application',
    meta: { title: '页面配置' }
  }]
}]
