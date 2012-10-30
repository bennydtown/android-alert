Ti.include('../database/database.js');

var win = Ti.UI.currentWindow;
var dataRow = [];

function setTableRows() {

	dataRow = [];

	db.open();

	var arrAlarms = db.getAll();	
	
	if (arrAlarms != null && arrAlarms.length > 0) {

		for (var i = 0; i < arrAlarms.length; i++) {
			var row = Ti.UI.createTableViewRow({
				height : 40
			});

			var obj = arrAlarms[i];

			var lblTitle = Ti.UI.createLabel({
				text : obj.title,
				top : 0,
				left : 10,
				width : 320,
				height : 20,
				color : 'black'
			});
			row.add(lblTitle);

			var lblDate = Ti.UI.createLabel({
				text : obj.date,
				top : lblTitle.top + lblTitle.height,
				left : 10,
				width : 320,
				height : 20
			});

			row.add(lblDate);

			dataRow.push(row);
		}	
	}
	
	db.close();
	
	tbl.data = [];
	tbl.data = dataRow;
	
}

var btnAddAlarm = Ti.UI.createButton({
	top : 0,
	left : 0,
	width : 320,
	height : 40,
	title : 'Add Alarm'
});

btnAddAlarm.addEventListener('click', function(e) {
	var winAdd = Ti.UI.createWindow({
		url : 'addAlarm.js',
		backgroundColor : '#fff'
	});

	winAdd.open({
		modal : true
	});
});

win.add(btnAddAlarm);

var tbl = Ti.UI.createTableView({
	top : btnAddAlarm.top + btnAddAlarm.height,
});

win.add(tbl);

win.addEventListener('focus',function(e){
	setTableRows();
})
