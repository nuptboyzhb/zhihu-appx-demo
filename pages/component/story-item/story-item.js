/**
 * 示例组件描述，描述会显示在 axml 的提示中
 */
Component({
  mixins: [],
  props: {
    image: '',
    title: '',
    id: 0,
    seq:0,
    onStroryClick: () => { },
    detail:{}
  },
  data: {
    defaultImg: 'https://dingyue.ws.126.net/2020/0325/ea53da73g00q7q7g501u0c0005k009wm.gif',
    headerMargin : 160,
  },
  onInit() {
    console.log('story item onInit:' + JSON.stringify(this.props));
  },

  deriveDataFromProps() {
    console.log('story item deriveDataFromProps:' + JSON.stringify(this.props));
  },

  didMount() {
    console.log('story item didMount:' + this.props.seq);
    if(this.props.seq == 1){
       console.log('story item set headerMargin 100');
       const headerMargin = 180;
       this.setData({headerMargin});
    }
  },
  didUpdate(prevProps, prevData) {
    console.log('story item didUpdate:' + JSON.stringify(this.props));
  },
  didUnmount() {
    console.log('story item didUnmount');
  },
  methods: {
    handlerJump(event) {
      console.log('image url = ' + JSON.stringify(event));
      const id = this.props.id;
      this.props.onStroryClick(id);
    },

    handlerJump1:(event)=> {
      console.log('image url = ' + JSON.stringify(event));
      const id = this.props.id;
      this.props.onStroryClick(id);
    },

    handlerJump2:function(event) {
      console.log('image url = ' + JSON.stringify(event));
      const id = this.props.id;
      let dateStr = this.$page.getHttpDate();
      console.log('date str = '+dateStr);
      if(this.$page.storyItem){
        let image = this.props.image;
         this.$page.storyItem.setData({image});
      }
    },

    onImgLoadError(e) {
      console.log('image error = ' + JSON.stringify(e));
      const image = this.data.defaultImg;
      this.setData({ image });
    },

    onImageLoad(e) {
      //console.log('image load = ' + JSON.stringify(e));
    },

  },
});