// create variable "win" to refer to current window
var win = Titanium.UI.currentWindow;
var tableView;

// Function loadContacts() 
function loadContacts() {
	
	// empty array "rowData" for table view cells
	var rowData = [];
	
	// create http client
	var loader = Titanium.Network.createHTTPClient();
	// set http request method and url
	loader.setRequestHeader("Accept", "application/json");
	loader.open("GET", "http://localhost:8080/roocontactssample/contacts");
	// run the function when the data is ready for us to process
	loader.onload = function(){
		
		Ti.API.debug("JSON Data: " + this.responseText);
		
		// evaluate json
		var contacts = JSON.parse(this.responseText);
		
		// sort contacts by name
		contacts.sort(function (a, b) {
		    if (a.name > b.name)
		      return 1;
		    if (a.name < b.name)
		      return -1;
		    // a must be equal to b
		    return 0;
		});

		for(var i=0; i < contacts.length; i++) {
			
			var id = contacts[i].id;
			Ti.API.debug("JSON Data, Row[" + i + "], ID: " + contacts[i].id);
			var name = contacts[i].name;
			Ti.API.debug("JSON Data, Row[" + i + "], Name: " + contacts[i].name);
			var phone = contacts[i].phone;
			Ti.API.debug("JSON Data, Row[" + i + "], Phone: " + contacts[i].phone);
			var address = contacts[i].address;
			Ti.API.debug("JSON Data, Row[" + i + "], Address: " + contacts[i].address);
			
			// create row
			var row = Titanium.UI.createTableViewRow({ height:Ti.UI.SIZE });
			
			// create row's view
			var contactView = Titanium.UI.createView({
				height:Ti.UI.SIZE,
				layout:'vertical', 
				top:5, 
				right:5, 
				bottom:5, 
				left:5 });
			var nameLbl = Titanium.UI.createLabel({
				text:name,
				left:5,
				height:24,
				width:236,
				textAlign:'left',
				color:'#444444',
				font:{
					fontFamily:'Trebuchet MS', fontSize:16, fontWeight:'bold'
				}
			});
			var phoneLbl = Titanium.UI.createLabel({
				text: phone,
				top:0,
				bottom:2,
				height:Ti.UI.SIZE,
				width:236,
				textAlign:'right',
				font:{ fontSize:14}
			});
			var addressLbl = Titanium.UI.createLabel({
				text: address,
				top:0,
				bottom:2,
				height:Ti.UI.SIZE,
				width:236,
				textAlign:'right',
				font:{ fontSize:14}
			});
			contactView.add(nameLbl);
			contactView.add(phoneLbl);
			contactView.add(addressLbl);
			
			row.add(contactView);
			row.className = "item" + i;
			
			rowData.push(row);
		}
		
		// create table view
		tableView = Titanium.UI.createTableView( { data: rowData });
		win.add(tableView);
	};
	
	// send request
	loader.send();
	
}

// add listener to update windows on focus
win.addEventListener('focus', function(e) {
	Ti.API.info("Fired focus event.");
	loadContacts();
});

