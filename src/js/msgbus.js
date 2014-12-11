import Wreqr from 'backbone.wreqr';

export default {
	reqres: new Wreqr.RequestResponse(),
	commands: new Wreqr.Commands(),
	events: new Wreqr.EventAggregator()
};