if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../pages/component/story-item/story-item?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/component/story-title/story-title?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/component/story-detail-all/story-detail-all?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/pages/list/index?hash=b99c7cf157ec6be5cfcea31e713635748f401d05');
require('../../pages/pages/detail/detail?hash=ac7b5322b6ea92993e683aa760a5386e5ae7611a');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}