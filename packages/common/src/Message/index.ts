import { Message } from './Message'

import { withInstallFunction } from '@ayu-mu/utils'

export const AyuMessage = withInstallFunction(Message, '$message')

export * from './types'
