// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

function setNotification(message, interval) {
	var intent = Ti.Android.createServiceIntent({
		url : 'service.js'
	});
	
	intent.putExtra('message', message || 'You have a notification!');
	
	if (interval) {
		intent.putExtra('interval', interval);
	}
	
	Ti.Android.startService(intent);
}

Ti.App.addEventListener('setAlarm',function(e){
	setNotification(e.message,e.interval);
});

var db = Ti.Database.install('database/alarm.sqlite', 'alarm');
db.close();

//
// create base UI tab and root window
//
var win = Titanium.UI.createWindow({
	title : 'Alarm',
	url : 'ui/Alarms.js',
	backgroundColor : '#fff'
});

win.open();