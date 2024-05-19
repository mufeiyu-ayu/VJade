import type { Component } from 'vue'

const types = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  MESSAGE: 'message'
}

type MessageType = 'success' | 'error' | 'warning' | 'message'

export interface MessageOptions {
  type?: MessageType
  duration?: number
  message: string
  dangerouslyUseHTMLString?: boolean
  icon?: string | Component
}

export interface MessageProps {}
export { types }
