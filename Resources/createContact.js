var win = Titanium.UI.currentWindow;

function loadForm() {
	var forms = require('forms');
	var fields = [
			{title:'Name', type:'text', id:'name'},
			{title:'Address', type:'text', id:'address'},
			{title:'Phone', type:'text', id:'phone'},
			{title:'Add Contact', type:'submit', id:'postCreateUserForm'}
	];
	
	var form = forms.createForm({
		style:  forms.STYLE_LABEL,
		fields: fields
	});
	
	form.addEventListener('postCreateUserForm', function(e) {
		postForm(
			e.values.name,
			e.values.address,
			e.values.phone
		);
		Ti.API.debug(e);
	});
	
	win.add(form);
}

function postForm(name, address, phone) {
	var client = Titanium.Network.createHTTPClient();

	client.setTimeout(5000);	 
	client.open('POST','http://localhost:8080/roocontactssample/contacts/');
	client.setRequestHeader( 'Content-type','application/json');
	
	client.onreadystatechange = function() {
		if(this.DONE == this.readyState) {
			try {
				Ti.API.info("New contact created successfully.");
			} catch(ex) {
				Ti.API.error(ex);
			}
		}
	};
	
	var params = {
	  'name':name,
	  'address':address,
	  'phone':phone
	};
	
	// pass POST parameters through here
	client.send(JSON.stringify(params));
}

loadForm();
