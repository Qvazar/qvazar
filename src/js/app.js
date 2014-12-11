import Backbine from 'backbone';
import Marionette from 'marionette';
import _ from 'lodash';
import msgbus from './msgbus';

app = new Marionette.Application();

app.rootRoute = 'index';

var regions = {
	mainRegion: 'main',
	headerRegion: 'header',
	footerRegion: 'footer'
};

app.addRegions(regions);

for (var r in regions) {
	msgbus.reqres.setHandler('region:' + r.replace(/Region$/, ''), () => app[r];
}

msgbus.commands.setHandler('instance:register', (instance, id) => app.register(instance, id));
msgbus.commands.setHandler('instance:unregister', (instance, id) => app.unregister(instance, id));

app.on("initialize:after", function(options) {
	var appstate, frag, match;

	if (options == null) {
		options = {};
	}

	appstate = msgbus.reqres.request("appstate:get");

	if (Backbone.history) {
		Backbone.history.start();
		frag = Backbone.history.fragment;
		match = /access_token/i.test(frag);
		if (match) {
			appstate.set("accessToken", frag.split("=")[1]);
			appstate.set("loginStatus", true);
			return this.navigate(this.authRoute, {
				trigger: true
			});
		} else {
			appstate.set("loginStatus", false);
			if (this.getCurrentRoute() === null) {
				return this.navigate(this.rootRoute, {
				  trigger: true
				});
			}
		}
	}
});