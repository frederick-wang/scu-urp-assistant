import state from './state'
import local from './local'
import { Request, Submit, actions } from './actions'
import { Logger } from '@/helper/logger'
import { LocalStore } from './types'

let localStore: LocalStore

async function init(): Promise<void> {
  localStore = await local.load()
}

async function initState(): Promise<void> {
  await state.init(localStore)
  Logger.info('Store.state初始化成功:', state)
}

export { Request, Submit, actions, state, init, initState }
