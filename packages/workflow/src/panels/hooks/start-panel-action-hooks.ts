import { computed, watchEffect, getCurrentInstance } from 'vue'
import type { FormProperty } from '../../types'

export const startPanelActionHooks = (fields) => {
  const { props } = getCurrentInstance()
  const allReadonly = computed({
    get() {
      return props!.activeData.formProperties.every((e) => e.readonly)
    },
    set(val) {
      props.activeData.formProperties.forEach((e) => (e.readonly = val))
      if (val) {
        allHidden.value = false
        allRequired.value = false
      }
    }
  })
  const allHidden = computed({
    get() {
      return props.activeData.formProperties.every((e) => e.hidden)
    },
    set(val) {
      props.activeData.formProperties.forEach((e) => (e.hidden = val))
      if (val) {
        allRequired.value = false
        allReadonly.value = false
      }
    }
  })
  const allRequired = computed({
    get() {
      return props.activeData.formProperties.every((e) => e.required)
    },
    set(val) {
      props.activeData.formProperties.forEach((e) => (e.required = val))
      if (val) {
        allReadonly.value = false
        allHidden.value = false
      }
    }
  })

  const changeReadonly = (row: FormProperty) => {
    if (row.readonly) {
      row.required = false
      row.hidden = false
    }
  }
  const changeRequired = (row: FormProperty) => {
    if (row.required) {
      row.readonly = false
      row.hidden = false
    }
  }
  const changeHidden = (row: FormProperty) => {
    if (row.hidden) {
      row.readonly = false
      row.required = false
    }
  }

  /** @description 将fields赋值给formProperties */
  watchEffect(() => {
    const formProperties = props.activeData.formProperties

    props.activeData.formProperties = fields.value.map((field) => ({
      id: field.id,
      name: field.label,
      readonly: field.readonly || false,
      hidden: field.hidden || false,
      required: field.required || false
    }))
    props.activeData.formProperties.forEach((item) => {
      const properties = formProperties.find((f) => f.id === item.id)
      if (properties) {
        item.readonly = properties.readonly
        item.hidden = properties.hidden
        item.required = properties.required
      }
    })
  })
  return {
    allReadonly,
    allHidden,
    allRequired,
    changeReadonly,
    changeRequired,
    changeHidden
  }
}
