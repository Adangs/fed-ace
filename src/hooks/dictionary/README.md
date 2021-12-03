### 使用方式

> .js
```javascript
// 引入
import { useDictionary } from '@/hooks'
// 初始化
const $dictionary = useDictionary()
// 获取字典值
$dictionary.get('RESOURCE_TYPE,ROLE_STATUS,ROLE_TYPE')
// 列表匹配
$dictionary.find(row.roleStatus, 'ROLE_STATUS')
// 使用 computed 获取
dictionary: computed(() => {
  return $store.getters.dictionary
})
```

> .vue
```vue
<n-select
  v-model:value="currentRow.resourceType"
  :options="dictionary['RESOURCE_TYPE']"
  placeholder="请选择资源类型"
/>
```
