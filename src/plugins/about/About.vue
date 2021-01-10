<template lang="pug">
.sua-container-about.typo
  h2 四川大学综合教务系统助手
    p: small version {{ version }}
  h3 简介
  blockquote
    p 用户脚本（UserScript）是一段能够为用户增强网页浏览体验的 JavaScript 代码。在安装之后，它们可自动为用户访问的网站添加功能，或使其更加易用、更加清新。要使用用户脚本，用户首先需要安装一个用户脚本管理器，最常见的是 Tampermonkey 。
    cite
      | ——
      |
      a(
        href='https://www.zhihu.com/topic/19802381',
        title='用户脚本（UserScript） - 知乎',
        target='blank'
      ) 用户脚本（UserScript） - 知乎
  p.indent 四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个 Bookmarklet 在点击后运行。
  p.indent 该脚本可以为综合教务系统增加以下功能：
  p(style='padding-left: 2em')
    ol
      li(v-for='feature in featureList')
        strong {{ feature[0] }}：
        span {{ feature[1] }}
  p.indent
    strong 做一个「功能强大」且「安全」的用户脚本是我的初衷。
    | 与那些「独立的 APP、网页、微信小程序」不同，综合教务系统助手只是一个集成在教务系统网站上的、源代码完全公开的脚本，不会存储同学的学号与教务系统密码。而那些独立的程序和教务系统是完全分离的，因此它们如果想获取同学的信息，就必须用同学们的学号和密码代理登录教务系统，也就是说同学需要在这些独立程序中输入自己的学号和密码。但程序内部就像一个黑盒，会执行什么操作对用户而言完全是未知的，甚至输入的学号和密码可能会被存储在「教务系统之外的其他服务器上」，有安全隐患。
  p.indent 如果您有什么对教务处功能增添修补的「脑洞」，可以随时联系我，我将在对其评估后进行开发。您也可以在 Github 上关注这个项目，为其打个 Star。
  p.indent Github Repo地址：
    a(
      href='https://github.com/frederick-wang/scu-urp-assistant',
      title='四川大学综合教务系统助手的Github仓库地址'
    ) https://github.com/frederick-wang/scu-urp-assistant
  h3 开发者
  div(style='display: flex; margin: 2em')
    .indent: img.avatar(
      src='https://zhaoji.wang/wp-content/uploads/2019/08/Van-Gogh.png'
    )
    div(
      style='flex: 1; display: flex; flex-direction: column; justify-content: space-around; padding-left: 2em'
    )
      div(style='font-size: 1.2em') 王兆基
      div 男，九十年代生人，可能是一个程序员。
      div 更多信息可参见博客的
        a(href='https://zhaoji.wang/about/', target='blank') 「关于我」页面
  h3 版权声明
  p.indent
    span 四川大学综合教务系统助手（SCU URP Assistant）以
    |
    |
    a(
      target='_blank',
      href='https://github.com/frederick-wang/scu-urp-assistant/blob/master/LICENSE'
    ) Apache Licene 2.0
    |
    |
    span 协议开源。原作者在保有代码著作权的前提下允许代码修改以及再发布（作为开源或商业用途）。如果你需要使用本开源程序的源代码，请遵守以下约定：
  ol
    li 使用者必须放置协议说明；
    li 如果你修改了代码，需要在被修改的文件中说明；
    li 在延伸的代码中（修改和有源代码衍生的代码中）需要带有原来代码中的协议，商标，专利声明和其他原来作者规定需要包含的说明；
    li 如果再发布的产品中包含一个 Notice 文件，则在 Notice 文件中需要带有 Apache Licence。你可以在 Notice 中增加自己的许可，但不可以表现为对 Apache Licence 构成更改；
    li 禁止使用者用作者的名号进行商业广告；
    li 原作者不承担代码使用后风险。
  p.indent
    span 完整协议文本请点击
    a(
      target='_blank',
      href='https://github.com/frederick-wang/scu-urp-assistant/blob/master/LICENSE'
    ) 此处
    span 阅读。
  p
    a(target='_blank', href='https://icons8.cn/icons/set/settings') Settings
    | ,
    |
    a(target='_blank', href='https://icons8.cn/icons/set/idea') idea
    |
    | and other icons by
    |
    a(target='_blank', href='https://icons8.cn') Icons8
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import pack from '@/../package.json'
import { isDev } from '@/helper/judger'

const { version, description } = pack

@Component
export default class About extends Vue {
  get version(): string {
    return `${version} (${isDev() ? 'dev' : 'stable'})`
  }

  get featureList(): string[][] {
    const r = description.match(/该脚本可以为综合教务系统增加以下功能：(.+)$/)
    if (r) {
      const text = r[1].trim()
      const features = text
        .split(/\d+\./)
        .map(v => v.trim())
        .filter(v => v)
        .map(v => v.split(/：|\:/).filter(w => w))
      return features
    }
    return []
  }
}
</script>

<style lang="scss" scoped>
ol > li {
  list-style-type: decimal;
}

p.indent {
  text-indent: 2em;
}

.avatar {
  border-radius: 50%;
  width: 100px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
</style>
