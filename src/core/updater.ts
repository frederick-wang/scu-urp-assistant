import compareVersions from 'compare-versions'

import local, { getVersionFromLocalStore } from '@/store/local'

import pack from '@/../package.json'
import { Logger } from '@/helper/logger'
import { addPreStartTask } from './hook'

const { version: targetVersion } = pack

const updateScript: Record<string, () => Promise<void> | void> = {
  '0.10.5': async function() {
    local.removeAll()
  }
}

const runUpdateScript = async (): Promise<void> => {
  const updateScriptList = Object.entries(updateScript).sort(([a], [b]) =>
    compareVersions(a, b)
  )
  const latestVersion = updateScriptList[updateScriptList.length - 1][0]
  const currentVersion = getVersionFromLocalStore()

  if (compareVersions(latestVersion, currentVersion) > 0) {
    const currentVersionIndex = updateScriptList
      .map(([v]) => v)
      .indexOf(currentVersion)
    const versionIndex = updateScriptList.map(([v]) => v).indexOf(targetVersion)
    const beginIndex = currentVersionIndex == -1 ? 0 : currentVersionIndex
    let endIndex = -1
    if (versionIndex !== -1) {
      endIndex = versionIndex
    } else {
      const restUpdateScriptList = updateScriptList.filter(
        ([ver]) => compareVersions(targetVersion, ver) >= 0
      )
      if (restUpdateScriptList.length) {
        endIndex = updateScriptList.indexOf(
          restUpdateScriptList[restUpdateScriptList.length - 1]
        )
      }
    }
    for (let i = beginIndex; i <= endIndex; i++) {
      Logger.info(
        `执行更新脚本：${updateScriptList[i][0]} (当前版本：${currentVersion}，目标版本：${targetVersion})`
      )
      await updateScriptList[i][1]()
    }
  }
}

export const init = async (): Promise<void> => {
  addPreStartTask('run-update-script', runUpdateScript)
}
