import Controller from './ctrl';
import msgbus from '/msgbus';

var api = {
	show: () => new Controller(msgbus.reqres.request('region:main'))
};

msgbus.commands.setHandler("select-file:start", () => {
	api.show();
});

export default api;