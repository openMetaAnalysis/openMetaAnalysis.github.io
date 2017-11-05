var vm = new Vue({
  el: '#menu',
  data: {
  	'active': 'home',
    'pureMenuLevel': 'pure-menu-list'
  },
  methods: {
  	makeActive: function(item){
    	this.active = item;
    }
  }
});
