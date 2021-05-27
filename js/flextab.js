/*!
@author: Oscar Alderete - oscaralderete@gmail.com
@website: https://oscaralderete.com/
@generator: NetBeans 12.0
*/
function Flextab(obj){
	'use strict';
	if(typeof obj === 'object' && obj.hasOwnProperty('id')){
		this.el = obj.id; //element ID
		//current active tab index (could be defined by parameter)
		this.ai = (obj.hasOwnProperty('active_index') && typeof obj.active_index === 'number') ? obj.active_index : 0;
		this.callback = (obj.hasOwnProperty('callback') && typeof obj.callback === 'function') ? obj.callback : null;
		var self = this,
			x = document.getElementById(this.el),
			y = 'active', //css classname
			LIs = x.children,
			contents = x.nextElementSibling.children;

		//first of all, show active content
		LIs[this.ai].classList.toggle(y);
		contents[this.ai].classList.toggle(y);

		document.querySelectorAll('#'+this.el+' > li').forEach(function(item, index){
			item.addEventListener('click',function(event){
				event.preventDefault();
				//navigate between tabs
				self.navTo(index);
			});
		});

		this.navTo = function(tabIndex){
			if(tabIndex !== self.ai){
				//remove the active class to all tabs + tab contents
				LIs[self.ai].classList.remove(y);
				contents[self.ai].classList.remove(y);
				//assign the new active index
				self.ai = tabIndex;
				//toggle current active tab + tab content
				LIs[tabIndex].classList.toggle(y);
				contents[tabIndex].classList.toggle(y);
				if(self.callback !== null){
					self.callback(tabIndex);
				}
			}
		}
	}
	else{
		console.log('Flextab ERROR: You need to pass a properly configuration object!');
	}
};