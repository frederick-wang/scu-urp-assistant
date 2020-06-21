import { isLoginPage, isSCU } from '@/helper/judger'
import fastEvaluation from '@/plugins/fast-evaluation'
import tooltip from '@/plugins/tooltip'
import recoverRememberMe from '@/plugins/recover-remember-me'
import rearrange from '@/plugins/rearrange'
import score from '@/plugins/score'
import trainingScheme from '@/plugins/training-scheme'
import submitData from '@/plugins/user-experience-improvement-program'
import dataAnalysis from '@/plugins/data-analysis'
import about from '@/plugins/about'
import feedback from '@/plugins/feedback'
import donate from '@/plugins/donate'
import bachelorDegree from '@/plugins/bachelor-degree'
import scuUietp from '@/plugins/scu-uietp'
import beautify from '@/plugins/beautify'
import setting from '@/plugins/setting'
import courseEvaluation from '@/plugins/course-evaluation'
import { SUAPlugin } from '@/core/types'

const necessaryPlugins = [dataAnalysis, tooltip]
const optionalPluginsBeforeLogin = [recoverRememberMe]
const optionalPluginsLoginedOnlySCU = [
  trainingScheme,
  bachelorDegree,
  scuUietp,
  courseEvaluation
]
const optionalPluginsLogined = [
  beautify,
  rearrange,
  fastEvaluation,
  score,
  // 之所以放到中间，是因为菜单的渲染顺序是和数组中的顺序一致的
  // 需要将「设置」菜单和「帮助」菜单放到最后
  ...(isSCU() ? optionalPluginsLoginedOnlySCU : []),
  submitData,
  setting,
  about,
  feedback,
  donate
]

function getAllPlugins(): SUAPlugin[] {
  return [
    ...necessaryPlugins,
    ...optionalPluginsBeforeLogin,
    ...optionalPluginsLogined
  ]
}

function getAvailablePluginsByLoginStatus(): SUAPlugin[] {
  return [
    ...necessaryPlugins,
    ...(isLoginPage() ? optionalPluginsBeforeLogin : optionalPluginsLogined)
  ]
}

export { getAvailablePluginsByLoginStatus, getAllPlugins }
