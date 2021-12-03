## x-form

> 官方文档 https://www.naiveui.com/zh-CN/os-theme/components/form

### Form Props
| 名称  | 类型                        |   默认值    | 说明|
| :-------------- | ---------------- |---------- |--- |
| v-model:model   | `Object`         |  {}       | 必须使用`v-model:`，其它参考官方文档|
| wrap            | `Boolean`        |  false    | inline状态下支持自动换行|
| ...             | 参考官方文档         |  ...      | 参考方文档 |

### Form Methods
| 名称               | 类型                            | 说明|
| :---------------- | ------------------------ |--- |
| validate          | 参考方文档         | 验证表单，Promise rejection 的返回值类型是 Array<FormValidationError> |
| restoreValidation | () => void       | 还原到未校验的状态 |
| resetFields       | () => void       | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 |
| resetDefaultValue | (model?: any) => void       | 初始化重置对应的初始值；当`XForm`已经渲染，需要重置初始值时使用，入参可传新的初始值 |
| ...              | 参考官方文档         |  参考官方文档   |
