import { withInstallFunction } from '@ayu-mu/utils'

import { Message } from './Message'

export const AyuMessage = withInstallFunction(Message, '$message')

export * from './types'
