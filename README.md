## 使用支付宝小程序写列表页

### 一、效果

![](https://img.alicdn.com/tfs/TB1H71Uh1P2gK0jSZFoXXauIVXa-320-686.gif)


- 1.有sticky效果

- 2.列表可滑动

- 3.滑动列表有2中类型的Cell

- 4.底部有固定的操作区域

- 5.自动加载更多


### 二、页面的布局和样式

- 布局

``` xml
<view class="schedule-container">
    <view class="suspend-title">
        <text onTap="onNextPage" class="btn">下一页</text>
        <text onTap="onScrollToTop" class="btn">回到顶部</text>
    </view>
    <scroll-view scroll-y="{{true}}" onScrollToLower="scrollMytrip" class="schedule-scroll" scroll-into-view="{{toViewId}}" scroll-top="{{scrollTop}}" enable-back-to-top="{{true}}">
        <block a:for="{{list}}" a:for-index="idx" a:for-item="item">
            <view a:if="{{item.type == 1}}" class="sticky-title">
                <story-title title="{{item.title}}" id="{{idx}}"></story-title>
            </view>
            <story-item a:if="{{item.type == 0}}" title="{{item.title}}" image="{{item.images[0]}} " id="{{item.id}}" seq="{{idx}}" onStroryClick="onStroryClick">
            </story-item>
            <view id="{{idx}}"></view>
        </block>
        <view class="spinner" style="{{show ? '' : 'display:none'}}">
            <view class="bounce1 bounce"></view>
            <view class="bounce2 bounce"></view>
            <view class="bounce3 bounce"></view>
            <view style="margin:20rpx 0 0 20rpx;color:#666666;">加载中...</view>
        </view>
    </scroll-view>
</view>
```

- 样式

```
.schedule-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.schedule-scroll {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
}

.spinner {
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner .bounce {
    margin-top: 20rpx;
    width: 13rpx;
    height: 21rpx;
    display: inline-block;
    animation-fill-mode: both;
    margin-left: 13rpx;
    transform: skewX(-15deg);
}

.spinner .bounce1 {
    background: #108EE9;
    animation: bouncedelay1 2.1s infinite linear;
}

.spinner .bounce2 {
    background: #9DCDEF;
    animation: bouncedelay2 2.1s infinite linear;
}

.spinner .bounce3 {
    background: #EAECF3;
    animation: bouncedelay3 2.1s infinite linear;
}

.spinner .spinner-word {
    margin-top: 24rpx;
    line-height: 40rpx;
    height: 40rpx;
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    color: #999999;
}

@keyframes bouncedelay1 {
    0% {
        background: #108EE9;
    }
    50% {
        background: #9DCDEF;
    }
    100% {
        background: #EAECF3;
    }
}

@keyframes bouncedelay2 {
    0% {
        background: #9DCDEF;
    }
    50% {
        background: #EAECF3;
    }
    100% {
        background: #108EE9;
    }
}

@keyframes bouncedelay3 {
    0% {
        background: #EAECF3;
    }
    50% {
        background: #108EE9;
    }
    100% {
        background: #9DCDEF;
    }
}

.schedule-detail {
    width: 100%;
    height: 218rpx;
    background-color: #ffffff;
    margin-top: 20rpx;
}

.schedule-place, .schedule-trainNumber, .schedule-time {
    padding: 30rpx 30rpx 35rpx 30rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 32rpx;
    color: #333333;
}

.schedule-money {
    color: #E8541E;
}

.font {
    color: #999999;
    font-size: 28rpx;
}

.padd {
    padding: 0rpx 30rpx 20rpx 30rpx;
}

.suspend-title {
    display: flex;
    position: absolute;
    bottom: 0rpx;
    left: 0rpx;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 80rpx;
    background-color: #108EE9;
    z-index: 9;
}

.btn {
    font-size: 24rpx;
    color: #FF5900;
    background-color: #FFF5F0;
    margin: 8rpx 8rpx 8rpx 8rpx;
    height: 40rpx;
    line-height: 40rpx;
    padding: 0 10rpx;
    border-radius: 3rpx;
}

.sticky-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 2;
}
```

- JS脚本

```
// mock列表总数
const mockTotal = 600;
var storyItem;
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
```





