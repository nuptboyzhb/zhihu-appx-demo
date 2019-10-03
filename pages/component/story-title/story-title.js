Component({
  mixins: [],
  data: {},
  props: {
    id:'',
    title:''
  },
  didMount() {
      console.log('title component = '+this.props.id);
  },
  didUpdate() {},
  didUnmount() {},
  methods: {},
});
