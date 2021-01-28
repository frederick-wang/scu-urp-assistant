import compareVersions from 'compare-versions'

import local, { getVersionFromLocalStore } from '@/store/local'

import pack from '@/../package.json'
import { Logger } from '@/helper/logger'
import { addPreStartTask } from './hook'

const { version: targetVersion } = pack

const updateScript: Record<string, () => Promise<void>> = {
  '0.10.5': async function() {
    local.removeAll()
  }
}

const runUpdateScript = async (): Promise<void> => {
  const convertVerStrToNum = (str: string) => Number(str.replace(/\./g, ''))
  const updateScriptList = Object.entries(updateScript).sort(([a], [b]) =>
    compareVersions(a, b)
  )
  const latestVersion = updateScriptList[updateScriptList.length - 1][0]
  const currentVersion = getVersionFromLocalStore()
  if (convertVerStrToNum(currentVersion) < convertVerStrToNum(latestVersion)) {
    const currentVersionIndex = updateScriptList
      .map(([v]) => v)
      .indexOf(currentVersion)
    const versionIndex = updateScriptList.map(([v]) => v).indexOf(targetVersion)
    for (
      let i = currentVersionIndex == -1 ? 0 : currentVersionIndex;
      i <= versionIndex;
      i++
    ) {
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
