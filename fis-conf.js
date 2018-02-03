/**
 * Created by Tomokylelie on 2017/3/28.
 */
fis.hook('relative');
fis.match('**', { relative: true })
fis.match('{package.json, 报表psd/**, iconfontDemo/**, readme.md, psd/**}', {
    release: false
});
//忽略配置
fis.config.set("project.watch.usePolling", true);

fis.match('*.scss', {
    // fis-parser-less 插件进行解析
    parser: fis.plugin('scss'),
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
});
fis.match('*.js', {
    // fis-optimizer-uglify-js 插件进行压缩
    optimizer: fis.plugin('uglify-js')
});
fis.match('*.{scss,css}', {
    // fis-optimizer-clean-css 插件进行压缩
    optimizer: fis.plugin('clean-css')
});