var win = Ti.UI.currentWindow;

var label = Ti.UI.createLabel({
	text : 'Choose a time',
	top : 6,
	width : 'auto',
	height : 'auto',
	textAlign : 'center',
	color : 'white'
});
win.add(label);

var minDate = new Date();
minDate.setFullYear(1);
minDate.setMonth(0);
minDate.setDate(1);

var maxDate = new Date();
maxDate.setFullYear(2999);
maxDate.setMonth(11);
maxDate.setDate(31);

var now = new Date();

label.text = now.toString();

Ti.App.Properties.setString('date',now.toString());

var datePicker = Ti.UI.createPicker({
	top : 50,
	type : Ti.UI.PICKER_TYPE_DATE,
	minDate : minDate,
	maxDate : maxDate,
	value : now
});

// turn on the selection indicator (off by default)
datePicker.selectionIndicator = true;

datePicker.addEventListener('change', function(e) {
	var dt = new Date(e.value);
	now.setDate(dt.getDate());
	now.setMonth(dt.getMonth());
	now.setFullYear(dt.getFullYear());
	label.text = now.toString();

});

win.add(datePicker);

/// ==================================== Time Picker

var timePicker = Ti.UI.createPicker({
	top : 230,
	type : Ti.UI.PICKER_TYPE_TIME,
	value : now
});

// turn on the selection indicator (off by default)
timePicker.selectionIndicator = true;

timePicker.addEventListener('change', function(e) {
	var dt = new Date(e.value);
	now.setHours(dt.getHours());
	now.setMinutes(dt.getMinutes());
	label.text = now.toString();
});

win.add(timePicker);

var btnSet = Ti.UI.createButton({
	title : 'Set',
	bottom : 10,
	width : 320,
	height : 40 
});

btnSet.addEventListener('click',function(e){
	Ti.App.Properties.setString('date',now.toString());
	win.close();
});

win.add(btnSet);
