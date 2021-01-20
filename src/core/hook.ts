import { Logger } from '@/helper/logger'

const prestartTasks: {
  name: string
  func: () => Promise<void>
}[] = []

const poststartTasks: {
  name: string
  func: () => Promise<void>
}[] = []

export const addPreStartTask = (
  name: string,
  func: () => Promise<void>
): number => prestartTasks.push({ name, func })

export const removePreStartTask = (name: string): void => {
  const index = prestartTasks.map(({ name }) => name).indexOf(name)
  prestartTasks.splice(index, 1)
}

export const addPostStartTask = (
  name: string,
  func: () => Promise<void>
): number => poststartTasks.push({ name, func })

export const removePostStartTask = (name: string): void => {
  const index = poststartTasks.map(({ name }) => name).indexOf(name)
  poststartTasks.splice(index, 1)
}

export const prestart = async (): Promise<void> => {
  Logger.evaMessage('插入栓 插入……')
  Logger.evaMessage('解放程序传导系统，准备接续……')
  for (const task of prestartTasks) {
    await task.func()
  }
  Logger.evaMessage('探针插入 完毕')
}

export const poststart = async (): Promise<void> => {
  Logger.evaMessage('安全装置解除……')
  Logger.evaMessage('移往射出口……')
  for (const task of poststartTasks) {
    await task.func()
  }
  Logger.evaMessage('程序 启动！')
}
