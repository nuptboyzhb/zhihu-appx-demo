App({
  onLaunch(options) {
    // 第一次打开
    console.log('App.onLaunch:'+options.query);
    // {number:1}
    console.log('App.onLaunch:'+options.path);
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
