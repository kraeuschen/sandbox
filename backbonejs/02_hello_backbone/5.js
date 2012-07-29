Backbone.sync = function(method, model, success, error){
	success();
}

var Item = Backbone.Model.extend({
	defaults: {
		part1: 'hello',
		part2: 'world'
	}
});

var List = Backbone.Collection.extend({
	model: Item,
});

var ItemVIew = Backbone.View.extend({
	
	tagName: 'li', // element attached to this.el

	events: {
		'click span.swap': 'swap',
		'click span.delete': 'remove'
	},

	initialize: function(){
		_.bindAll(this, 'render', 'unrender', 'swap', 'remove');

		this.model.bind('change', this.render);
		this.model.bind('destroy', this.unrender);
	},

	render: function(){
		$(this.el).html('<span style="color:black;">'+this.model.get('part1')+' '+this.model.get('part2')
			+'</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
      	return this; // for chaining
	},

	unrender: function(){
		$(this.el).remove();
	},

	swap: function(){
		var swapped = {
			part1: this.model.get('part2'),
			part2: this.model.get('part1')
		};
		this.model.set(swapped); // calls event bind change
	},

	remove: function(){
		this.model.destroy();
	},
});

var ListView = Backbone.View.extend({
	el: $('body'),

	events: {
		'click button#add': 'addItem' // eventtype element#id
	},

	initialize: function(){
		_.bindAll(this, 'render', 'addItem', 'appendItem'); // every function handles with 'this' should be included

		this.collection = new List();
		this.collection.bind('add', this.appendItem); // collection event binder

		this.counter = 0; // total number of items
		this.render();
	},

	render: function(){
		var self = this;

		$(this.el).append('<button id="add">Add list Item</button>');
		$(this.el).append("<ul></ul>");

		_.each(this.collection.models, function(item){ // if items exists in collection
			self.appendItem(item);
		}, this);
	},

	addItem: function(){
		this.counter++;
		
		var item = new Item();
		item.set({
			part2: item.get('part2') + this.counter
		});
		this.collection.add(item);
	},

	appendItem: function(item){
		var itemView = new ItemVIew({
			model: item
		});

		$('ul', this.el).append(itemView.render().el);
	},
});

var listView = new ListView();