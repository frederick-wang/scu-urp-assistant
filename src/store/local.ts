import { Logger } from '@/helper/logger'
import { LocalStore } from './types'
import localforage from 'localforage'
import state from './state'

let localStore: LocalStore

function get(key: string): unknown {
  clearExpiredData()
  if (localStore.state.data[key]) {
    return localStore.state.data[key].payload
  }
  return null
}

function getAll(): Record<string, unknown> {
  clearExpiredData()
  const result: Record<string, unknown> = {}
  for (const key in localStore.state.data) {
    if (localStore.state.data.hasOwnProperty(key)) {
      if (localStore.state.data[key]) {
        result[key] = localStore.state.data[key].payload
      }
    }
  }
  return result
}

function remove(key: string): void {
  delete localStore.state.data[key]
  saveData()
}

function removeAll(): void {
  for (const key in localStore.state.data) {
    if (localStore.state.data.hasOwnProperty(key)) {
      delete localStore.state.data[key]
    }
  }
  saveData()
}

function clearExpiredData(): void {
  const time = new Date().getTime()
  for (const [key, item] of Object.entries(localStore.state.data)) {
    if (item.expirationTime !== -1 && item.expirationTime < time) {
      Logger.log(`LocalStore.clearExpiredData: [key=${key}]`)
      remove(key)
    }
  }
}

async function saveData(
  data?: { key: string; payload: unknown },
  // 默认永不过期
  expirationTime = -1
): Promise<LocalStore> {
  const time = new Date().getTime()
  const { version } = state.core
  if (localStore) {
    clearExpiredData()
  }
  const res: LocalStore = {
    time,
    state: {
      core: {
        version
      },
      data: localStore ? localStore.state.data : {}
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
  Logger.info(
    `LocalStore${data ? `[key=${data.key}]` : ''}保存成功:`,
    localStore
  )
  return localStore
}

async function load(): Promise<LocalStore> {
  const tmp: LocalStore | null = await localforage.getItem('sua_store')
  if (tmp) {
    localStore = tmp
    clearExpiredData()
    Logger.info('加载LocalStore成功:', localStore)
  } else {
    await saveData()
  }
  return localStore
}

export const getVersionFromLocalStore = (): string =>
  localStore.state.core.version

export default {
  load,
  saveData,
  get,
  getAll,
  remove,
  removeAll
}
