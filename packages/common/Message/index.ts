import { Message } from './Message'

import { withInstallFunction } from '@ayu/utils'

export const AyuMessage = withInstallFunction(Message, '$message')

export * from './types'
