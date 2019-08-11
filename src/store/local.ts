import { logger } from '@/utils'
import { LocalStore } from './types'
import localforage from 'localforage'
import state from './state'

let localStore: LocalStore

async function load() {
  localStore = await localforage.getItem('sua_store')
  clearExpiredData()
  if (localStore) {
    logger.info('加载LocalStore成功:', localStore)
  }
  return localStore
}

function clearExpiredData() {
  const time = new Date().getTime()
  for (const [key, item] of Object.entries(localStore.state.data)) {
    if (item.expirationTime !== -1 && item.expirationTime < time) {
      remove(key)
    }
  }
}

async function saveData(
  data?: { key: string; payload: any },
  // 默认永不过期
  expirationTime: number = -1
) {
  const time = new Date().getTime()
  const { version } = state.core
  clearExpiredData()
  const res: LocalStore = {
    time,
    state: {
      core: {
        version
      },
      data: localStore.state.data
    }
  }
  if (data) {
    res.state.data = {
      ...res.state.data,
      [data.key]: {
        time,
        expirationTime,
        payload: data.payload
      }
    }
  }
  localStore = await localforage.setItem('sua_store', res)
  logger.info(
    `LocalStore${data ? `[key=${data.key}]` : ''}保存成功:`,
    localStore
  )
  return localStore
}

function get(key: string) {
  clearExpiredData()
  if (localStore.state.data[key]) {
    return localStore.state.data[key].payload
  }
  return null
}

function remove(key: string) {
  delete localStore.state.data[key]
  saveData()
}

export default { load, saveData, get, remove }
