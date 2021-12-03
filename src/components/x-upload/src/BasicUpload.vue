<template>
  <div class="x-upload">
    <div v-if="isSlots" class="slots">
      <n-upload v-bind="$props" @before-upload="onBeforeUpload" @finish="onFinish" @change="onChange">
        <slot />
      </n-upload>
    </div>
    <div v-else>
      <div class="upload">
        <div class="upload-card">
          <!--图片列表-->
          <div
            v-for="(item, index) in imgList"
            :key="`img_${index}`"
            class="upload-card-item"
            :style="getCSSProperties"
          >
            <div class="upload-card-item-info">
              <video v-if="data.mediaType === 2" class="upload-video" :src="item" muted />
              <img v-else class="upload-img" :src="item" />
              <div class="img-box-actions">
                <n-icon size="18" class="action-icon" @click="preview(item)">
                  <EyeOutlined />
                </n-icon>
                <n-icon v-if="!disabled" size="18" class="action-icon" @click="remove(index)">
                  <DeleteOutlined />
                </n-icon>
              </div>
            </div>
          </div>
          <!--上传图片-->
          <div
            v-if="imgList.length < limit && !disabled"
            class="upload-card-item upload-card-item-select-picture"
            :style="getCSSProperties"
          >
            <n-spin :show="isLoading">
              <n-upload v-bind="$props" @before-upload="onBeforeUpload" @finish="onFinish" @change="onChange">
                <div class="flex center column" :style="getCSSProperties">
                  <n-icon size="18">
                    <PlusOutlined />
                  </n-icon>
                  <div v-if="width > 60" class="upload-title">上传图片</div>
                </div>
              </n-upload>
            </n-spin>
          </div>
        </div>
      </div>

      <n-space>
        <div v-if="restrictionText" class="restriction-text">{{ restrictionText }}</div>
      </n-space>

      <!--提示-->
      <n-space>
        <n-alert v-if="helpText" type="warning" class="flex">
          {{ helpText }}
        </n-alert>
      </n-space>
    </div>
  </div>

  <!--预览图片-->
  <n-modal v-model:show="showModal" preset="card" title="预览" :bordered="false" :style="{ width: '520px' }">
    <div class="flex center">
      <video v-if="data.mediaType === 2" style="width: 100%; max-height: 500px" :src="previewUrl" controls muted />
      <n-image v-else class="preview-img" :src="previewUrl" />
    </div>
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, computed, watch } from 'vue'
  import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd'
  import { NUpload, NIcon, NModal, NSpace, NAlert, NImage, NSpin, useMessage, useDialog } from 'naive-ui'
  import { basicProps } from './props'
  import { isObject, isString } from '@/utils/is'

  export default defineComponent({
    name: 'BasicUpload',

    components: {
      NUpload,
      NIcon,
      NModal,
      NSpace,
      NAlert,
      EyeOutlined,
      DeleteOutlined,
      PlusOutlined,
      NImage,
      NSpin
    },
    props: {
      ...NUpload.props, // 这里继承原 UI 组件的 props
      ...basicProps
    },
    emits: ['success', 'update:value', 'remove'],
    setup(props, { emit, slots }) {
      const imageTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/svg', 'image/gif', 'image/webp']
      const videoTypes = ['video/mp4', 'video/mov', 'video/avi']
      const getCSSProperties = computed(() => {
        return {
          width: `${props.width}px`,
          height: `${props.height}px`
        }
      })

      watch(
        () => props.value,
        (val) => {
          updateValue()
        }
      )

      const message = useMessage()
      const dialog = useDialog()

      interface IState {
        count: number
        isLoading: boolean
        showModal: boolean
        previewUrl: string
        imgList: string[]
        containerPadding: string
        isSlots: any
      }
      const state = reactive<IState>({
        count: 0,
        isLoading: false,
        showModal: false,
        previewUrl: '',
        imgList: [],
        containerPadding: props.width > 60 ? '8px' : '2px',
        // 组件是否有插槽内容；如果有，上传组件中的样式使用插槽的
        isSlots: slots?.default
      })

      updateValue()
      function updateValue() {
        if (!props.value) return
        //赋值默认图片显示
        if (isString(props.value)) {
          if (props.value) {
            state.imgList = props.value.split(',').map((item) => getImgUrl(item))
          }
        } else {
          if (props.value.length) {
            state.imgList = props.value.map((item: string) => getImgUrl(item))
          }
        }
      }

      function getFormattedValue() {
        let updateValue
        if (isString(props.value) || !props.value) {
          updateValue = state.imgList.join(',')
        } else {
          updateValue = state.imgList
        }
        return updateValue
      }

      //预览
      function preview(url: string) {
        state.showModal = true
        state.previewUrl = url
      }

      //删除
      function remove(index: number) {
        dialog.warning({
          title: '提示',
          content: '你确定要删除吗？',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            state.imgList.splice(index, 1)
            const updateValue = getFormattedValue()
            emit('update:value', updateValue)
            emit('remove', index)
          }
        })
      }

      //组装完整图片地址
      function getImgUrl(url: string): string {
        return url
      }

      //上传之前
      async function onBeforeUpload({ file }) {
        const fileInfo = file.file
        const { validate, limit } = props
        const needValidate = isObject(validate)
        state.count++
        const currentNum = state.imgList.length + state.count

        if (currentNum > limit) {
          message.warning(`最多选择${limit}张图片, 超出数量的图片已取消上传`)
          return false
        }

        if (needValidate) {
          const { fileSize } = validate
          if (fileSize) {
            const isSize = fileInfo.size / 1024 < fileSize
            if (!isSize) {
              message.error(`文件大小不能超过${bytesToSize(fileSize)}!`)
              return false
            }
          }

          if (imageTypes.includes(fileInfo.type)) {
            //  图片类型
            await validateImage(fileInfo, validate)
          } else if (videoTypes.includes(fileInfo.type)) {
            //  视频类型
            await validateVideo(fileInfo, validate)
          }
        }

        state.isLoading = true
        return true
      }

      function onChange({ file }) {
        if (file.status === 'uploading') {
          state.isLoading = true
        }
      }

      //上传结束
      function onFinish({ file, event }) {
        state.isLoading = false
        state.count = 0
        const { success, data, msg } = JSON.parse(event.target.response)
        const messageText = msg || '上传失败'
        //成功
        if (success) {
          if (!props.isManual) {
            let imgUrl = getImgUrl(data.fileUrl)
            state.imgList.push(imgUrl)
            const updateValue = getFormattedValue()
            emit('update:value', updateValue)
          }
          emit('success', data)
        } else {
          message.error(messageText)
        }
      }

      /**
       * 校验图片
       */
      function validateImage(file, restriction) {
        const { width, height, type } = restriction
        return new Promise<void>((resolve, reject) => {
          if (type) {
            const typeList = type.split(',')
            if (!typeList.includes(file.type)) {
              reject()
              return message.error(`图片类型不正确，请上传类型为${type}的图片`)
            }
          }
          if (width && height) {
            const _URL = window.URL || window.webkitURL
            const img = new Image()
            img.src = _URL.createObjectURL(file)
            img.onload = () => {
              const valid = img.width === width && img.height === height
              if (valid) {
                resolve()
              } else {
                reject()
                message.error(`请上传尺寸为 ${width}×${height}像素 的图片!`)
              }
            }
          } else {
            resolve()
          }
        })
      }

      /**
       * 校验视频
       * @param file
       * @param restriction
       * @returns {Promise<unknown>}
       */
      function validateVideo(file, restriction) {
        const { minWidth, minHeight, minDuration, maxDuration, ratioWidth, ratioHeight } = restriction
        return new Promise<void>((resolve, reject) => {
          const _URL = window.URL || window.webkitURL
          const fileUrl = _URL.createObjectURL(file)
          const video = document.createElement('video')

          video.addEventListener('loadedmetadata', (e) => {
            _URL.revokeObjectURL(fileUrl)
            const pixel = video.videoWidth >= minWidth && video.videoHeight >= minHeight
            const duration = minDuration < video.duration && video.duration < maxDuration
            const ratio = video.videoWidth / video.videoHeight === ratioWidth / ratioHeight
            if (!pixel && minWidth && minHeight) {
              reject()
              message.error(`视频尺寸须大于${minWidth}px*${minHeight}px!`)
            } else if (!duration && minDuration && maxDuration) {
              reject()
              message.error(`视频时长控制在${minDuration}-${maxDuration}内!`)
            } else if (!ratio && ratioWidth && ratioHeight) {
              reject()
              message.error(`请上传比例为${ratioWidth}:${ratioHeight}的视频!`)
            } else {
              resolve()
            }
          })
          video.src = fileUrl
        })
      }

      function bytesToSize(bytes: number): string {
        if (!bytes) return '0 KB'
        const k = 1024
        const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i)) + sizes[i]
      }

      return {
        ...toRefs(state),
        onFinish,
        onChange,
        preview,
        remove,
        onBeforeUpload,
        getCSSProperties
      }
    }
  })
</script>

<style scoped lang="scss">
  .upload {
    width: 100%;
    overflow: hidden;

    &-card {
      width: auto;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &-item {
        margin: 0 8px 8px 0;
        position: relative;
        padding: v-bind(containerPadding);
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        &:hover {
          background: 0 0;

          .upload-card-item-info::before {
            opacity: 1;
          }

          &-info::before {
            opacity: 1;
          }
        }

        &-info {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 0;
          overflow: hidden;
          display: flex;

          &:hover {
            .img-box-actions {
              opacity: 1;
            }
          }

          &::before {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: all 0.3s;
            content: ' ';
          }

          .upload-img {
            width: 100%;
            height: 100%;
            object-fit: fill;
          }

          .upload-video {
            width: 100%;
            max-height: 100%;
            margin: auto;
          }

          .img-box-actions {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 10;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:hover {
              background: 0 0;
            }

            .action-icon {
              margin: 0 5px;
              color: rgba(255, 255, 255, 0.85);

              &:hover {
                cursor: pointer;
                color: #fff;
              }
            }
          }
        }
      }

      &-item-select-picture {
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        cursor: pointer;
        background: #fafafa;
        color: #666;

        .upload-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .upload-title {
          color: #666;
        }
      }
    }
  }
  .restriction-text {
    color: #9a9a9a;
  }
</style>
