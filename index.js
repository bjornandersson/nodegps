var gpsd = require('node-gpsd');

var daemon = new gpsd.Daemon({
	program: 'gpsd',
	device: '/dev/ttyUSB0',
	port: 2947,
	pid: '/tmp/gpsd.pid',
	logger: {
		info: function() {},
		warn: console.warn,
		error: console.error
	}
});

daemon.start(function() {
	console.log('Started');


var listener = new gpsd.Listener({
	port: 2947,
	hostname: 'localhost',
	logger: {
		info: function(msg) {
			console.log(msg);
		},
		warn: function(msg) {
			console.log(msg);
		},
		error: function(msg) {
			console.log(msg);
		}
	},
	parse: true
});

listener.connect(function() {
	console.log('Connected');
	
	listener.watch({class:'WATCH', json: true, nmea: false});
	listener.on('TPV', function(tpvData) {
		console.log(tpvData);
	});

});

});


