import state from './state'
import local from './local'
import { Request, Submit, actions } from './actions'
import { Logger } from '@/helper/logger'

async function init(): Promise<void> {
  const localStore = await local.load()
  await state.init(localStore)
  Logger.info('Store.state初始化成功:', state)
}

export { Request, Submit, actions, state, init }
