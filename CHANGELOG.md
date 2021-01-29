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



