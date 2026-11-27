import { watch } from 'vue'

export default defineNuxtPlugin(() => {
  const { cookiesEnabledIds } = useCookieControl()
  const { initialize } = useGtag()

  let initialized = false

  watch(
    () => cookiesEnabledIds.value,
    (enabled) => {
      if (!initialized && enabled?.includes('ga')) {
        initialize()
        initialized = true
      }
    },
    { immediate: true }
  )
})