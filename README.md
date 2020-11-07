# klook-page-test

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> pageTest for klook ssr

## TODO

- [x] 由 typescript 编写
- [x] 支持多任务
- [x] 支持 desktop 和 mobile
- [x] 支持插件系统(待完善)
- [x] metrics 插件，主要有 TTFB、FP、FCP、FMP
- [x] timing 插件，主要根据```performance.timing api```得出的各个性能信息
- [x] 支持数据导出到文件
- [ ] 增加 cli
- [ ] 多任务时自动求平均值
- [ ] 使用 cluster 提升性能
- [ ] 单元测试

## 参考资料

1. [Web Performance Recipes With Puppeteer](https://addyosmani.com/blog/puppeteer-recipes/#performance-observer-lcp)
2. [Test website performance with Puppeteer](https://michaljanaszek.com/blog/test-website-performance-with-puppeteer/#firstMeaningfulPaint)
