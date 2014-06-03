// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create all contacts window
var allContactsWindow = Titanium.UI.createWindow({  
    title:'Contacts',
    backgroundColor:'#fff',
    url:'allContacts.js'
});

// create all contacts tab
var allContactsTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'All Contacts',
    window:allContactsWindow
});

// create create contact window
var createContactWindow = Titanium.UI.createWindow({  
    title:'New Contact',
    backgroundColor:'#fff',
    url:'createContact.js'
});

// create create contact tab
var createContactTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'New Contact',
    window:createContactWindow
});

//  add both tabs to the tab group
tabGroup.addTab(allContactsTab);  
tabGroup.addTab(createContactTab);

// open tab group
tabGroup.open();
