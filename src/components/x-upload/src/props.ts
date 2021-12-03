import type { PropType } from 'vue'
import { NUpload } from 'naive-ui'
import { local_storage } from '@/utils/storage'

export const basicProps = {
  ...NUpload.props,
  action: {
    type: String,
    default: '/api/product/media/upload'
  },
  data: {
    type: Object,
    default: () => ({
      mediaType: 1,
      resourceType: 0
    })
  },
  headers: {
    type: Object,
    default: () => ({
      accessToken: local_storage.get('token')
    })
  },
  accept: {
    type: String,
    default: '.jpg,.png,.jpeg,.svg,.gif'
  },
  showFileList: {
    type: Boolean,
    default: false
  },
  validate: {
    type: Object,
    default: () => ({})
  },
  helpText: {
    type: String as PropType<string>,
    default: ''
  },
  limit: {
    type: Number as PropType<number>,
    default: Infinity
  },
  value: {
    type: [Array as PropType<string[]>, String as PropType<string>],
    default: () => []
  },
  width: {
    type: Number as PropType<number>,
    default: 104
  },
  height: {
    type: Number as PropType<number>,
    default: 104 //建议不小于这个尺寸 太小页面可能显示有异常
  },
  restrictionText: {
    type: String as PropType<string>,
    default: ''
  },
  isManual: {
    type: Boolean,
    default: false
  }
}
