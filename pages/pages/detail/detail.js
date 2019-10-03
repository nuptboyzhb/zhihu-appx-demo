Page({
  data: {
    detail:{}
  },
  onLoad(e) {
    console.log('onLoad:e' + JSON.stringify(e))
    const httpApi = e.params;
    this.requestData(httpApi);
  },

  onWebviewMessage(e){
    console.log('onWebviewMessage'+JSON.stringify(e));
  },

  async requestData(httpApi) {
    try {
      my.request({
        url: httpApi,
        method: 'GET',
        data: {
          from: '支付宝',
          production: 'AlipayJSAPI',
        },
        dataType: 'json',
        success: (res) => {
          const detail = res.data;
          console.log('detail = ' + JSON.stringify(detail));
          this.setData({
            detail
          });
        },
        fail: function(res) {
          my.alert({ content: 'fail' });
        },
        complete: function(res) {
          my.hideLoading();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
});
