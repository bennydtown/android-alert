Ti.include('../database/database.js');

var win = Ti.UI.currentWindow;

Ti.App.Properties.setString('date', "");

var lblTitle = Ti.UI.createLabel({
	text : 'Title :',
	color : 'black',
	left : 10,
	top : 50,
	width : 60,
	height : 40
});

win.add(lblTitle);

var txtTitle = Ti.UI.createTextField({
	left : lblTitle.left + lblTitle.width + 10,
	top : lblTitle.top,
	width : 230,
	height : 40
});

win.add(txtTitle);

var lblDate = Ti.UI.createLabel({
	text : 'Date :',
	left : lblTitle.left,
	top : txtTitle.top + txtTitle.height + 20,
	color : 'black',
	width : 60,
	height : 40
});

win.add(lblDate);

var txtDate = Ti.UI.createLabel({
	left : lblDate.left + lblDate.width + 10,
	top : lblDate.top,
	width : 230,
	height : 40,
	borderColor : 'gray',
	borderRadius : 5,
	borderWidth : 2
});

txtDate.addEventListener('click', function(e) {
	var winPicker = Ti.UI.createWindow({
		url : 'picker.js',
		backgroundColor : '#000'
	});
	winPicker.open({
		modal : true
	});
});

win.add(txtDate);

var btnAdd = Ti.UI.createButton({
	title : 'ADD',
	top : txtDate.top + txtDate.height + 20,
	width : 60,
	height : 40
});
btnAdd.addEventListener('click', function(e) {

	if (txtTitle.value != null && txtTitle.value.length > 0 && txtDate.text != null && txtDate.text.length > 0) {

		db.open();

		db.addAlarm(txtTitle.value, txtDate.text);

		db.close();

		var now = new Date();
		var dt1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

		var dt = new Date(txtDate.text);
		var dt2 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes());

		var interval = dt2 - dt1;

		var now = new Date().getTime();
		var delta = new Date(now + interval);
		
		// setNotification(txtTitle.value, delta - now);
		Ti.App.fireEvent('setAlarm', {
			message : txtTitle.value,
			interval : delta - now
		});
		win.close();
	}

});
win.add(btnAdd);

win.addEventListener('close', function(e) {
	Ti.App.Properties.setString('date', "");
});

win.addEventListener('focus', function(e) {
	txtDate.text = Ti.App.Properties.getString('date');
})
