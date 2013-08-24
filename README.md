TiAndroidMenuItems
-------------------
This takes the heavy lifting out of manually creating menu items in a Titanium Mobile project for Android.

Looking at taking advantage of the action bar and earlier OS support. It will allow for customisation and give a way to manage changes in the TiSDK.

This is an early experimental library built as a CommonJS library that can be dropped into any project.

It will create menu items you request, by default using the built in native icons that the Android OS provide, ideally these can be customised to your own.

Requirements
------------

You will need to create a folder called `lib` within the `app` folder of an Alloy project or place this library into the `Resources` directory of a classic Titanium Application.

Basic Configuration
-------------------

The controller of your app will be sending an array of data to the module, determining which items to show, this can either be toggle on and off with the showItem property or simply not sending the data through. The only reason i'm using this property is in case you are wanting to dynamically change the state of a menu item.

Example Code
------------ 

Here is an example in Alloy for the index.js - you can use a basic default Alloy Project and replace this code into the main index.js to test out the functionality of the module.

Screenshot of the example app - this is located within the repo under the app subfolder
![Screenshot1](../master/app/assets/images/device-2013-08-24-190142.png?raw=true)

```
function doOpen(e) {
	var menuItems = require('menuItems');

	var activity = menuItems.getActivity($.index, false);
	var items = [];
	items.push({
		itemID: 'logout',
		showItem: true
	});

	items.push({
		itemID: 'share',
		showItem: true
	});

	items.push({
		itemID: 'save',
		showItem: true
	});

	items.push({
		itemID: 'search',
		showItem: true
	});

	items.push({
		itemID: 'info',
		showItem: true
	});

	items.push({
		itemID: 'email',
		showItem: true
	});
	menuItems.onCreateOptionsMenu(items);

}
$.index.addEventListener('open', doOpen);
$.index.open();
```