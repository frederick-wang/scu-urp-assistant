## [0.12.1](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.12.0...v0.12.1) (2021-07-12)


### Bug Fixes

* **plugins/score:** 修复了选中课程中存在重修课程时，计算会始终忽视低分课程的bug ([a249258](https://github.com/frederick-wang/scu-urp-assistant/commit/a24925883f3e6df1451f93523d9d2dc016770b57)), closes [#46](https://github.com/frederick-wang/scu-urp-assistant/issues/46)



# [0.12.0](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.11.3...v0.12.0) (2021-07-12)


### Bug Fixes

* **plugins/feedback:** 修改作者邮箱为当前正在使用的邮箱 ([2b9ae65](https://github.com/frederick-wang/scu-urp-assistant/commit/2b9ae65d4aa8f51a0dab4c548157d5677e376281))
* **plugins/score:** typo fixed ([d685b9e](https://github.com/frederick-wang/scu-urp-assistant/commit/d685b9e514d5d749ba1f2bd3f6b0ecbc71c0fdba))
* **plugins/score:** 修复了「均分绩点计算器」与「成绩信息查询」失效的 bug ([40fb7b8](https://github.com/frederick-wang/scu-urp-assistant/commit/40fb7b8ae2e24005e175eab3e2078f593aff988a)), closes [#43](https://github.com/frederick-wang/scu-urp-assistant/issues/43)
* **plugins/score:** 修复了「预期成绩估计」功能无法正常使用的bug ([6716bb8](https://github.com/frederick-wang/scu-urp-assistant/commit/6716bb886b5377fa6ba0576536a556e00575bfe3)), closes [#45](https://github.com/frederick-wang/scu-urp-assistant/issues/45)
* **plugins/score:** 修复了如果课程没有等级成绩，绩点计算器中等级成绩会留空的 bug ([46deaf4](https://github.com/frederick-wang/scu-urp-assistant/commit/46deaf4f4533c93e3b6e98d65b9c0b318b34ec4f)), closes [#40](https://github.com/frederick-wang/scu-urp-assistant/issues/40)
* **plugins/score:** 修复了存在重修课程时计算出错的bug ([5d4c104](https://github.com/frederick-wang/scu-urp-assistant/commit/5d4c1048df2caee4290e1228a43c25331c954a59)), closes [#39](https://github.com/frederick-wang/scu-urp-assistant/issues/39)
* **plugins/score:** 修复了未评教时，对成绩为 -999 的课程仍会加入绩点计算的 bug ([37ae082](https://github.com/frederick-wang/scu-urp-assistant/commit/37ae082761c3a836d67040e2280e07fa5e2a0485)), closes [#41](https://github.com/frederick-wang/scu-urp-assistant/issues/41)
* **plugins/subitem-score:** 修复了分项成绩查询表格中的异常小数问题 ([e58c519](https://github.com/frederick-wang/scu-urp-assistant/commit/e58c5191bcd1633f4ff3d7f82f65520be08518ab)), closes [#29](https://github.com/frederick-wang/scu-urp-assistant/issues/29)
* **plugins/subitem-score:** 修复了教务系统更新后，「分项成绩查询」功能无法正常使用的问题。 ([c361d66](https://github.com/frederick-wang/scu-urp-assistant/commit/c361d66d93e337b5ab2d20cfa5b4b503e5b456c9)), closes [#44](https://github.com/frederick-wang/scu-urp-assistant/issues/44)


### Features

* **plugins/donate:** 更新了 Donate 插件的信息 ([668c1c7](https://github.com/frederick-wang/scu-urp-assistant/commit/668c1c779ee71798bbb84eee59d6d91053d5432d))
* **plugins/score:** 计算成绩时，将辅修课程单独列出 ([9601acd](https://github.com/frederick-wang/scu-urp-assistant/commit/9601acddaf1addd039b569dc18bef357112aff20)), closes [#31](https://github.com/frederick-wang/scu-urp-assistant/issues/31)



## [0.11.3](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.11.2...v0.11.3) (2021-03-05)


### Bug Fixes

* **plugin/rearrange:** iE 11 支持 flex，重排功能应当生效 ([a879040](https://github.com/frederick-wang/scu-urp-assistant/commit/a8790401d13e45050bb13a8a64c41cd64ffabd47))
* **plugins/training-scheme:** 修改「培养方案查询」页面的提示文字。 ([8d0ab4a](https://github.com/frederick-wang/scu-urp-assistant/commit/8d0ab4a8890c7c90162cde697c53796ed42f7a8b))
* **webpack.config:** 修改 UserScript 的加载位置为 document-end ([29563e4](https://github.com/frederick-wang/scu-urp-assistant/commit/29563e4979bdf43191025442f35cf389d6dc9c1d))



## [0.11.2](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.11.1...v0.11.2) (2021-01-30)


### Bug Fixes

* **core/router:** 修复了当 currentRouteIndexInHistory 为 0 时，push & replace 不会清除 history[1] 的 bug ([a962659](https://github.com/frederick-wang/scu-urp-assistant/commit/a962659979fc7bd4c41eb1f63d2880558f631b8b)), closes [#22](https://github.com/frederick-wang/scu-urp-assistant/issues/22)
* **plugin/score:** 如果「分项成绩查询」插件未开启，在成绩信息页面中屏蔽「尝试查询」按钮 ([3c25ed6](https://github.com/frederick-wang/scu-urp-assistant/commit/3c25ed60cc736d2b23bc9ec654f7e7de21848cdb)), closes [#26](https://github.com/frederick-wang/scu-urp-assistant/issues/26)


### Features

* **helper/logger:** 不仅导出完整对象 Logger，其中的子方法也都分别导出 ([c433542](https://github.com/frederick-wang/scu-urp-assistant/commit/c433542ecc731a39e830ebb3ff848d1a3e7e6587))
* **helper/util:** 增加 CSS 是否支持属性的判断方法，和浏览器类型版本的判断方法 ([3dcbd6a](https://github.com/frederick-wang/scu-urp-assistant/commit/3dcbd6a3f77d9c9c7d90553637379febd068f51f))
* **plugin/changelog:** 在「帮助」菜单下增加「更新日志」页面 ([2283500](https://github.com/frederick-wang/scu-urp-assistant/commit/2283500582a07be179822365d1e88b88bb0328a4)), closes [#25](https://github.com/frederick-wang/scu-urp-assistant/issues/25)
* **plugin/rearrange:** 界面重排后，使 URP 首页的「通知」中的通知标题完整显示 ([cea3e69](https://github.com/frederick-wang/scu-urp-assistant/commit/cea3e69727de6d8b154db4f4beb7e8d4348cc6d7)), closes [#21](https://github.com/frederick-wang/scu-urp-assistant/issues/21)
* **plugin/score:** 将预期成绩估计的必修课与选修课分开，初始行数为空并增加提示 ([3a47c0e](https://github.com/frederick-wang/scu-urp-assistant/commit/3a47c0e40c63e78e71d3ab300220b6f6520ca180)), closes [#17](https://github.com/frederick-wang/scu-urp-assistant/issues/17)
* **plugin/score:** 没有评教的课程无法查看成绩，为这种情况增加了特别的提示 ([5311a5d](https://github.com/frederick-wang/scu-urp-assistant/commit/5311a5d387b4e946225e7a74ef252c520bc7ac26)), closes [#20](https://github.com/frederick-wang/scu-urp-assistant/issues/20)
* **plugins:** 去除 Vue 组件中对 typo.css 的单独引用，减小体积。 ([111ccc2](https://github.com/frederick-wang/scu-urp-assistant/commit/111ccc28b2d00c324ddded2559fb088be55aa7f0))



## [0.11.1](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.11.0...v0.11.1) (2021-01-29)


### Bug Fixes

* **helper/util:** 将 console 换成 Logger ([0991a8b](https://github.com/frederick-wang/scu-urp-assistant/commit/0991a8bd286d6f5ea6083af1279d340361674bba))
* **plugin/setting:** 修复了插件管理页面中，插件的 tag 过多时，行与行之间粘连的 bug ([0842991](https://github.com/frederick-wang/scu-urp-assistant/commit/08429916482a88ea8c5d1ff69185f97c6577621c))


### Features

* **helper/util:** 将 Element-UI 的 Message 和 Notification 组件提出全局方法以便调用 ([35497b4](https://github.com/frederick-wang/scu-urp-assistant/commit/35497b47eb0c94e1ccda043d9d88cbcdbfb142a5))
* **plugin/subitem-score:** 分项成绩查询页面增加「分项成绩 × 所占系数」一列，方便查看 ([c956498](https://github.com/frederick-wang/scu-urp-assistant/commit/c956498cf185c482e0e9deaffcfb46dc2c66e565))
* **plugin/subitem-score:** 增加参数校验与错误提示 ([37550f2](https://github.com/frederick-wang/scu-urp-assistant/commit/37550f230273a1e278b30c3f94d0f993a45c73ac))
* **plugin/subitem-score:** 统计分项成绩查询成功或失败的次数信息 ([248159c](https://github.com/frederick-wang/scu-urp-assistant/commit/248159cf3e86ed47a84b94481020443585b6b1b1))



# [0.11.0](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.10.4...v0.11.0) (2021-01-29)


### Bug Fixes

* **core/router:** 修复了路由切换时因历史产生的bug和params比较产生的bug ([6d4b8fc](https://github.com/frederick-wang/scu-urp-assistant/commit/6d4b8fc8eaf9c91bc9d4f6d3405c90401d217d73))
* **core/router:** 修复路由传参中的bug ([8526247](https://github.com/frederick-wang/scu-urp-assistant/commit/8526247c537dd2506d6e7c84b13be1bd42fe7de2))
* **core/updater:** 修复了确定执行更新脚本版本范围时出错的 bug ([d03bdb4](https://github.com/frederick-wang/scu-urp-assistant/commit/d03bdb433b36fc78292230e85ad26a936aa8150f))
* **core/updater:** 引入 compareVersions 包比较版本号大小 ([6ecb94c](https://github.com/frederick-wang/scu-urp-assistant/commit/6ecb94c65c44bbc5da7cbda17939b5444aa2adc5))
* **gpa:** 如果成绩项的分数不存在或者为负数，则跳过 ([c15557f](https://github.com/frederick-wang/scu-urp-assistant/commit/c15557f543e3fb28653ecd7fe8d15e485c622cc3))
* **helper/getter:** 修复 getUserId 方法中获取 studentInfos 时可能获取到空值的 bug. ([c191fb6](https://github.com/frederick-wang/scu-urp-assistant/commit/c191fb6b5368ff0d5b22acc946ff60277cfca24b))
* **plugin/setting:** 修复了插件管理器因面包屑导航属性删除，导致渲染失败的bug ([a9ac504](https://github.com/frederick-wang/scu-urp-assistant/commit/a9ac504738ed8c151da5c118721b3c9113f3fe1c))
* **plugin/subitem-score:** 如果分享成绩有空，则不计算总成绩 ([6a91577](https://github.com/frederick-wang/scu-urp-assistant/commit/6a91577856d37d004a0754648a0f012e5d5af05e))
* **plugins:** 为需要 typo.css 的组件在组件内部引用 ([b984ba4](https://github.com/frederick-wang/scu-urp-assistant/commit/b984ba4d2a6b788ecc7438589faa17cc015fceb6))
* **plugins:** 修复了空白页组件的 class 名称 ([b5c4655](https://github.com/frederick-wang/scu-urp-assistant/commit/b5c46555c4a1d02248037fc54f87b2f1c80909ad))
* **score:** 调整 GPACalculator 组件 type 参数的类型 ([463f335](https://github.com/frederick-wang/scu-urp-assistant/commit/463f335545d8055340e28cb9dcd4075f3c44b083))


### Features

* **core:** 增加更新脚本 ([d0f9cb3](https://github.com/frederick-wang/scu-urp-assistant/commit/d0f9cb36a16488fa77d879a3a96eef7bc8ebf536))
* **core, helper:** 增加 EVA风格的加载提示和启动钩子 ([2bba392](https://github.com/frederick-wang/scu-urp-assistant/commit/2bba3928c22c94508051503fd011253436c1b1f6))
* **core/loader:** 将左侧自定义菜单的加载位置从列表末尾提升到最前 ([606af8f](https://github.com/frederick-wang/scu-urp-assistant/commit/606af8f9b5f5cd2406e8e6f219c4b59a67e6411d))
* **core/router:** 实现 router 在历史记录中移动的功能 ([f8c3223](https://github.com/frederick-wang/scu-urp-assistant/commit/f8c32239398290d02409f4614e848f6643cb108d))
* **core/router:** 引入 qs 包取代 query-string 包处理路由参数 ([1784ce5](https://github.com/frederick-wang/scu-urp-assistant/commit/1784ce5d00277c073a89c0b8aadc871f42501088))
* **plugin/score:** 分项成绩查询页面后退按钮生效 ([c803fb8](https://github.com/frederick-wang/scu-urp-assistant/commit/c803fb8218f325b21fbba81d221d7cfbc5fa1dc1))
* **plugin/score:** 当查不到分项成绩时，弹出 message 提示 ([4580369](https://github.com/frederick-wang/scu-urp-assistant/commit/4580369b2dd616f376678e3c9d9797ad981f1b7f))
* **plugin/subitem-score:** 为分项成绩查询页面增加 Loading 动画 ([230c816](https://github.com/frederick-wang/scu-urp-assistant/commit/230c8169cf86d0a4abde35e40fa5e0790c33aa0b))
* **plugin/subitem-score:** 分项成绩查询界面增加绩点显示 ([efe4143](https://github.com/frederick-wang/scu-urp-assistant/commit/efe414382a83ea3897584edf3afa654740eb7135))
* **plugin/subitem-score:** 删除分项成绩查询所占的菜单项 ([2f0871d](https://github.com/frederick-wang/scu-urp-assistant/commit/2f0871d6437a2d37add0173af96bf3241fa0ed20))
* **plugin/subitem-score:** 基本完成分项成绩查询功能 ([43f2841](https://github.com/frederick-wang/scu-urp-assistant/commit/43f284116e4bc3d6ebdf5f28b8889fb417752a4d))
* **plugin/training-scheme:** 为培养方案查询&比较功能的空白页增加提示 ([e954403](https://github.com/frederick-wang/scu-urp-assistant/commit/e9544033692f37e863cf553f1b7f94ea1764ad3f))
* **plugins:** 为子菜单项添加控制是否显示的属性 ([9baa7cb](https://github.com/frederick-wang/scu-urp-assistant/commit/9baa7cb9244de1ca407461de791b406eb59533f1))
* **plugins:** 为插件增加 defaultEnabledState 属性， ([42210ff](https://github.com/frederick-wang/scu-urp-assistant/commit/42210ffc91ee1aae40646d1886f73a4a1da9df9d))
* **plugins:** 删除专门的 breadcrumbs 属性，改为由菜单项自动生成 ([9ea75d9](https://github.com/frederick-wang/scu-urp-assistant/commit/9ea75d93f7bedf457473e60448d199a35f9ff8d0))
* **plugins:** 增加空白提示页 ([1296611](https://github.com/frederick-wang/scu-urp-assistant/commit/1296611936185c9083d1cfccfcb6e217d69eb367))
* **plugins:** 添加检测插件是否启用的工具函数 ([246d37c](https://github.com/frederick-wang/scu-urp-assistant/commit/246d37cac7bfe44a5b2e783b569f5aac3a2fe78b))
* **plugins/list:** 加载分项成绩查询插件 ([6df5671](https://github.com/frederick-wang/scu-urp-assistant/commit/6df56719029e9ce9fc9a347f8ce661a2dced473b))
* **plugins/subitem-score:** 创建分项成绩查询插件 ([f1ea3bb](https://github.com/frederick-wang/scu-urp-assistant/commit/f1ea3bb6845cdea5135cb807afec900de146f7e8))
* **plugins/subitem-score:** 增加警告提示信息 ([8dac5b9](https://github.com/frederick-wang/scu-urp-assistant/commit/8dac5b9ab010e9170648aed962deae1a24adadd7))
* **store:** 增加 getVersionFromLocalStore 方法， ([e8cca64](https://github.com/frederick-wang/scu-urp-assistant/commit/e8cca64b1fc8226563b860eb47ac855f6fc9d336))



## [0.10.4](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.10.3...v0.10.4) (2021-01-18)



## [0.10.3](https://github.com/frederick-wang/scu-urp-assistant/compare/v0.10.2...v0.10.3) (2021-01-12)



## [0.10.2](https://github.com/frederick-wang/scu-urp-assistant/compare/0.10.1...v0.10.2) (2020-06-11)



## 0.10.1 (2020-05-25)
