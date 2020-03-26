import {getApp} from '../../common/utils'
// mock列表总数
const mockTotal = 600;
var storyItem;
let app = getApp();
Page({
    data: {
        scrollTop: 0,
        toViewId: 0,
        show: false, // 是否显示加载动画
        page: 1, // 当前页数
        list: [] // 页面List数据
    },
    onLoad() {
        this.mySchedulde();
        console.log('### app = '+JSON.stringify(app));
    },

    onNextPage() {
        const toViewId = 5 + this.data.toViewId;
        console.log('onSuspendTitleClick = ' + toViewId);
        this.setData({ toViewId })
    },

    onScrollToTop() {
        const scrollTop = 0;
        console.log('onScrollToTop = ' + this.data.scrollTop);
        this.setData({ scrollTop })
    },

    getHttpDate(page = 1) {
        let nowDate = new Date();
        let paramTime = nowDate.getTime() - 1000 * 60 * 60 * 24 * page;
        let paramDate = new Date(paramTime);
        let mm = paramDate.getMonth() + 1; // getMonth() is zero-based
        let dd = paramDate.getDate();
        if (page == 1) {
            return [paramDate.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
            ].join('');
        }
        return [paramDate.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('');
    },
    /**
     * scroll-view滑到底部触发事件
     * @method scrollMytrip
     */
    async scrollMytrip() {
        try {
            const { page, list, } = this.data;
            // 判断是否还有数据需要加载
            if (list.length < mockTotal) {
                this.setData({ show: true });
                const newPage = page + 1;
                this.mySchedulde(newPage);
            }
        } catch (e) {
            this.setData({ show: false });
            console.log('scrollMytrip执行异常:', e);
        }
    },

    onStroryClick(id) {
        const detailUrl = `https://news-at.zhihu.com/api/4/news/${id}`;
        console.log('detailUrl = ' + detailUrl);
        const params = encodeURIComponent(detailUrl);
        my.navigateTo({
            url: `../detail/detail?params=${params}`
        });
    },
    /**
     * 模拟请求服务端查询数据并渲染页面
     * @method mySchedulde
     * @param {int} page 分页,默认第1页
     */
    async mySchedulde(page = 1) {
        try {
            let list = this.data.list;
            // https://news-at.zhihu.com/api/4/news/before/20190907

            let pdate = this.getHttpDate(page);
            console.log('pDate = ' + pdate);

            my.request({
                url: `https://news-at.zhihu.com/api/4/news/before/${pdate}`,
                method: 'GET',
                data: {
                    from: '支付宝',
                    production: 'AlipayJSAPI',
                },
                dataType: 'json',
                success: (res) => {
                    console.log('res = ' + JSON.stringify(res));
                    let zhihuList = res.data.stories;
                    list = [...list,...zhihuList];
                    let pageTitle = { type: 1, title: `日期：${pdate}`, remarksa: `我是第${page}页`, remarksb: '' };
                    list.push(pageTitle);
                    console.log('list = ' + JSON.stringify(list));
                    this.setData({
                        list,
                        page,
                        show: false
                    });
                    if (page === 1) {
                        console.log('loading next page');
                        this.scrollMytrip();
                    }
                },
                fail: function(res) {
                    my.alert({ content: 'fail' });
                },
                complete: function(res) {
                    my.hideLoading();
                }
            });
        } catch (e) {
            console.log('mySchedulde执行异常:', e);
        }
    }
});