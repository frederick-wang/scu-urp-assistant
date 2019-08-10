import state from './state'
import { Request, Submit, actions } from './actions'
import localforage from 'localforage'
import { logger } from '@/utils'

async function init() {
  await state.init()
  logger.info('Store.state初始化成功:', state)
}

export { Request, Submit, actions, state, init }
