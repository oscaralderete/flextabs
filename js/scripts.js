const vue1 = new Vue({
	el: '#vueApp',
	data(){
		return{
			tab: null,
			tabs: [
				{caption: 'Home', icon: 'home'},
				{caption: 'Car', icon: 'car'},
				{caption: 'Run', icon: 'running'}
			],
			apiUrl: 'https://reqres.in/api/users/',
			userID: 1,
			content1: '',
			content2: 'Fixed content rendered by Vue',
		}
	},
	mounted(){
		const self = this;
		this.tab = new Flextab({
			id: 'vueTab',
			active_index: 1,
			callback: function(tabIndex){
				switch(tabIndex){
					case 0:
						self.handleFirstTab();
						break;
					case 1:
						self.handleSecondTab();
						break;
					default:
						self.handleThirdTab();
				}
			}
		});
	},
	methods: {
		fetchUser(){
			var self = this;
			this.content1 = '...';
			fetch(this.apiUrl + this.userID)
				.then(response => response.json())
				.then(data => {
					console.log(data);
					const x = data.data;
					self.content1 = `Username is ${x.first_name}, [${x.email}] and its ID is ${x.id}`;
					self.userID++;
					if(self.userID>12){
						self.userID = 1;
					}
				});
		},
		handleFirstTab(){
			this.fetchUser();
		},
		handleSecondTab(){
			console.log('hey 2');
		},
		handleThirdTab(){
			console.log('hey 3');
		},
	}
});

const vue2 = new Vue({
	el: '#vue-2',
	data(){
		return{
			apiUrl: 'https://fakerapi.it/api/v1/persons?_locale=',
			langs: ['fr_FR','es_ES','us_US','ru_RU'],
			current_lang: 'fr_FR',
			lang: 'fr_FR',
			people: []
		};
	},
	methods: {
		populatePeople(){
			const self = this;
			this.people = [];
			fetch(this.apiUrl + this.lang)
				.then(response => response.json())
				.then(data => {
					self.people = data.data;
					self.current_lang = self.lang;
					//set next lang to be fetched
					switch(self.lang){
						case 'fr_FR':
							self.lang = 'es_ES';
							break;
						case 'es_ES':
							self.lang = 'us_US';
							break;
						case 'us_US':
							self.lang = 'ru_RU';
							break;
						default:
							self.lang = 'fr_FR';
					}
				});
		}
	}
});

const secondTab = new Flextab({
	id: 'secondTab'
});

const thirdTab = new Flextab({
	id: 'basic-sample',
	active_index: 2,
	callback: function(tabIndex){
		if(tabIndex===0){
			console.log('Only runs when first tab is clicked...');
			vue2.populatePeople();
		}
	}
});

//basic toast dialog implementation
const toast = {
	el: document.getElementById('toast'),
	timeout: null,
	timeout_duration: 4, //in seconds
	make(str){
		this.setMsg(str);
		const z = 'active'; //switching class name
		this.el.classList.toggle(z);
	},
	setMsg(str){
		clearTimeout(this.timeout);
		if(typeof(str) !== 'undefined'){
			const self = this;
			this.el.innerHTML = `<span>${str}</span>`;
			this.timeout = null;
			this.timeout = setTimeout(() => {
				self.make();
			}, this.timeout_duration * 1000);
		}
	}
}


function switchTo(str){
	if(str!==vue2.current_lang){
		vue2.lang = str;
		vue2.populatePeople();
	}
	else{
		toast.make('Locale '+str+' names are already listed.');
	}
}