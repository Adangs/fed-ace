# fed-ace

## Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


### 微信第三方平台开发

````
1、前往 https://open.weixin.qq.com/ 创建微信开放平台账号
2、创建第三方平台
3、基础设置内绑定域名、ip白名单、权限管理
4、开发配置绑定母模版小程序（共可以绑定10个小程序）
5、获取APPID、APPSECRET供服务端使用
6、母模版小程序项目中添加ext.json文件 extAppid 配置为当前小程序appid即可；ext内配置动态参数
7、母模版小程序项目开发完成进行上传代码，此时会提示上传到绑定的第三方平台（通过 wx.getExtConfigSync() 获取动态的ext.json文件配置数据，请求接口的时候将关键参数入参给API接口）
8、在第三方平台 > 开发配置 > 小程序模版库 > 草稿箱中可以看到最新上传的代码
9、将新上传的代码添加到模版库
10、服务端可以通过相关的接口拉取到到模版库中所有版本的代码
11、其他小程序通过服务端提供的绑定授权接口与当前的第三方平台进行绑定
12、其他小程序可以通过服务端提供的数据选择指定的版本，让服务端将此版本的代码进行上传生成当前小程序的体验版，上传过程中服务端动态配置ext.json文件，将当前小程序的appid等关键信息配置到ext字段中，供小程序 wx.getExtConfigSync() 方法获取
13、体验版本测试通过后服务端通过官方接口提供审核、发布上线
````

### 相关文档

[微信开放平台](https://open.weixin.qq.com/)

[微信第三方平台](https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Mini_Programs/Intro.html)

[getExtConfigSync](https://developers.weixin.qq.com/miniprogram/dev/api/ext/wx.getExtConfigSync.html)

