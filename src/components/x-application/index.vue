<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <n-loading-bar-provider :loading-bar-style="loadingBarStyle">
      <x-loading-content />
      <n-dialog-provider>
        <x-dialog-content />
        <n-notification-provider>
          <n-message-provider>
            <x-message-content />
            <slot />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    NDialogProvider,
    NNotificationProvider,
    NMessageProvider,
    NLoadingBarProvider,
    NConfigProvider,
    zhCN,
    dateZhCN,
    GlobalThemeOverrides
  } from 'naive-ui'
  import { XMessageContent } from '@/components/x-message-content'
  import { XDialogContent } from '@/components/x-dialog-content'
  import { XLoadingContent } from '@/components/x-loading-content'

  export default defineComponent({
    name: 'XApplication',
    components: {
      NDialogProvider,
      NNotificationProvider,
      NMessageProvider,
      NLoadingBarProvider,
      NConfigProvider,
      XMessageContent,
      XDialogContent,
      XLoadingContent
    },
    setup() {
      const themeOverrides: GlobalThemeOverrides = {
        common: {
          primaryColor: '#536FFF',
          primaryColorHover: 'rgba(83, 111, 255, .9)',
          primaryColorPressed: '#536FFF',
          primaryColorSuppl: 'rgba(83, 111, 255, .9)',
          successColor: '#22B46B',
          infoColor: '#536FFF',
          warningColor: '#FDAA29',
          errorColor: '#FD494D',
          textColorBase: '#1F2225',
          textColorDisabled: '#888'
        }
      }
      const loadingBarStyle = {
        loading: {
          'background-color': '#54BC2B',
          height: '3px'
        }
      }
      return {
        zhCN,
        dateZhCN,
        themeOverrides,
        loadingBarStyle
      }
    }
  })
</script>
<style></style>
