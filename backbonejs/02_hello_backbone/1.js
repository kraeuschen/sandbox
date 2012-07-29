var ListView = Backbone.View.extend({
	el: $('body'), // attaches this el to body

	initialize: function(){
		_.bindAll(this, 'render'); // fixes loss of context for this elements
		this.render();
	},

	render: function(){
		$(this.el).append("<ul><li>hellow world</li></ul>");
	}
});

var listView = new ListView();