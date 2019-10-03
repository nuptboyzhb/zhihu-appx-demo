Component({
    mixins: [],
    data: {
        content: '',
        //show:'0'
        list: [],
        imgList: [],
        bigImg: ''
    },
    props: {
        detail: {},
        show: '1'
    },
    deriveDataFromProps() {
        console.log('story-detail-all:deriveDataFromProps')
    },
    didMount() {

    },
    didUpdate() {
        try {
            let body = this.props.detail.body;
            let pContent = body.replace(new RegExp("<p>", "gm"), "#").replace(new RegExp("</p>", "gm"), "#").split("#");
            let reg = /[\u4e00-\uff1b]|[0-9]/g;
            let list = [];
            let imgList = [];
            pContent.forEach((item) => {
                if (item) {
                    let startIndex = item.indexOf('src=');
                    if (startIndex > 0) {
                        let imgContent = item.substr(startIndex + 5);
                        imgContent = imgContent.substr(0, imgContent.indexOf('"'))
                        imgList.push(imgContent);
                    }
                }
                let line = item.match(reg);
                if (line) {
                    line = line.join("")
                    list.push(line);
                }
            });
            this.props.show = '5';
            let show = '2';
            this.setData({ list, imgList, show });
        } catch (e) {
            console.log(e);
        }
    },
    didUnmount() { },
    methods: {
        onSmallImageTap(e) {
            console.log(e);
            let bigImg = e.currentTarget.id;
            console.log('bigImg = ' + bigImg);
            this.setData({ bigImg });
        },
        onBigImageTap(e) {
            let bigImg = '';
            this.setData({ bigImg })
        }
    },
});
