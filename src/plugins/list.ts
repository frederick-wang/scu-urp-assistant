import { isLoginPage, isSCU } from '@/helper/judger'
import { FastEvaluation } from '@/plugins/fast-evaluation'
import { Tooltip } from '@/plugins/tooltip'
import { RecoverRememberMe } from '@/plugins/recover-remember-me'
import { Rearrange } from '@/plugins/rearrange'
import { Score } from '@/plugins/score'
import { TrainingScheme } from '@/plugins/training-scheme'
import { UserExperienceImprovementProgram } from '@/plugins/user-experience-improvement-program'
import { DataAnalysis } from '@/plugins/data-analysis'
import { About } from '@/plugins/about'
import { Feedback } from '@/plugins/feedback'
import { Donate } from '@/plugins/donate'
import { BachelorDegree } from '@/plugins/bachelor-degree'
import { ScuUietp } from '@/plugins/scu-uietp'
import { Beautify } from '@/plugins/beautify'
import { Setting } from '@/plugins/setting'
// import courseEvaluation from '@/plugins/course-info-exchange'
import textbookSelection from '@/plugins/textbook-selection'
import { SUAPlugin } from '@/core/types'

const necessaryPlugins = [DataAnalysis, Tooltip]
const optionalPluginsBeforeLogin = [RecoverRememberMe]
const optionalPluginsLoginedOnlySCU = [TrainingScheme, BachelorDegree, ScuUietp]
const optionalPluginsLogined = [
  Beautify,
  Rearrange,
  FastEvaluation,
  textbookSelection,
  Score,
  // 之所以放到中间，是因为菜单的渲染顺序是和数组中的顺序一致的
  // 需要将「设置」菜单和「帮助」菜单放到最后
  ...(isSCU() ? optionalPluginsLoginedOnlySCU : []),
  UserExperienceImprovementProgram,
  Setting,
  About,
  Feedback,
  Donate
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
