const componentSizes = ['', 'default', 'small', 'large'] as const
export const useSizeProp = {
  type: String,
  values: componentSizes,
  required: false
} as const
