var db = ( function() {

		var api = {};
		var conn;
		// = Ti.Database.open('mytime');
		// conn.close();

		api.open = function() {
			if (conn == null) {
				conn = Ti.Database.open('alarm');
			}
		}

		api.close = function() {
			if (conn != null) {
				conn.close();
				conn = null;
			}
		}

		api.addAlarm = function(title, date) {
			
			conn.execute('INSERT INTO alarms("title", "dt") VALUES(?, ?)', title, date);
		}

		api.getAll = function() {

			var resultSet = conn.execute("select * from alarms");

			var results = [];

			while (resultSet.isValidRow()) {
				results.push({
					title : resultSet.fieldByName('title'),
					date : resultSet.fieldByName('dt'),
				});
				resultSet.next();
			}

			resultSet.close();

			return results;
		};

		return api;
	}());
