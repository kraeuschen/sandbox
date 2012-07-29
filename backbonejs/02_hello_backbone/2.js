var ListView = Backbone.View.extend({
	el: $('body'), // attaches this el to body

	events: {
		'click button#add': 'addItem' // eventtype element#id
	},

	initialize: function(){
		_.bindAll(this, 'render', 'addItem'); // every function handles with 'this' should be included

		this.counter = 0; // total number of items
		this.render();
	},

	render: function(){
		$(this.el).append('<button id="add">Add list Item</button>');
		$(this.el).append("<ul></ul>");
	},

	addItem: function(){
		console.log('foo');
		this.counter++;
		$('ul', this.el).append('<li>hello world ' + this.counter + '</li>');
	}
});

var listView = new ListView();