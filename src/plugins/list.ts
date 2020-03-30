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
import bachelorDegree from '@/plugins/bachelor-degree'
import scuUietp from '@/plugins/scu-uietp'
import beautify from '@/plugins/beautify'
import setting from '@/plugins/setting'

function getSuitablePluginsByLoginStatus(): SUAPlugin[] {
  const necessaryPlugins = [dataAnalysis, tooltip]
  const optionalPluginsBeforeLogin = [recoverRememberMe]
  const optionalPluginsLogined = [
    beautify,
    rearrange,
    fastEvaluation,
    score,
    trainingScheme,
    bachelorDegree,
    scuUietp,
    submitData,
    setting,
    about,
    feedback
  ]

  return [
    ...necessaryPlugins,
    ...(window.location.pathname === '/login'
      ? optionalPluginsBeforeLogin
      : optionalPluginsLogined)
  ]
}

export { getSuitablePluginsByLoginStatus }
