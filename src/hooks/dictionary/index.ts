import $Store, { useStore } from '@/store'

const useDictionary = () => {
  return {
    // 获取字典数据
    get: (keys: string | string[]) => {
      return new Promise((resolve, reject) => {
        try {
          const $store = useStore()
          const dictNames = typeof keys === 'string' ? keys : keys.join(',')
          $store
            .dispatch('dictionary/getDictionary', {
              dictNames
            })
            .then((res) => {
              resolve(res)
            })
            .catch(() => {
              reject()
            })
        } catch (e) {}
      })
    },
    // 查找匹配字典数据
    find: (value: string | number | null, keys: string) => {
      try {
        const dictionary = $Store.getters.dictionary || {}
        const current = dictionary[keys]
        const find = current?.find((item: { label: string; value: string | number }) => item.value === value)
        return find ? find.label : '-'
      } catch (e) {
        return '-'
      }
    }
  }
}

export { useDictionary }
