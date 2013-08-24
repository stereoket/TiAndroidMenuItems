/**
 * Android Menu Item Manager for multiple sections/windows of an app.
 * It will allow for a an app to dynamically change a menu item for a window based on state
 * changes, as well as have individual menu items for tabgroups/windows.
 *
 * It will allow an overide of custom icons, and map the items used to external methods in your own 
 * controllers so that this module can be maintained an upgraded.
 *
 * Action Bar
 * ----------
 *
 * There is some support for the action bar in this module as well, which will make it easier to toggle
 * features and enable action bar behvaior. Such as up icon and changing titles. Overflow menu etc.
 *
 * @todo  manage the method names; make the configuration so that custom event listeneres and icons can be
 * attached
 * 
 * @module TiAndroidMenuItems
 * @author Ketan Majmudar
 */

Ti.API.warn("MENU ITEM MODULE");

var activity, actionBar, custom_ic;

function getActivity(win, tabgroup) {
	if (tabgroup !== undefined && tabgroup) {
		Ti.API.warn("Tabgroup");
		activity = Ti.App.TabGroup.getActivity();
		return activity
	} else if (win !== null && win) {
		Ti.API.warn("win");
		activity = win.activity;
		return activity
	} else {
		Ti.API.error("no object to get activity from");
		return false;
	}
}


function disaplyHomeAsUp(closeWin) {
	if (activity !== undefined && actionBar) {
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = function () {
			closeWin.close();
		};
	}
}

function invalidateOptionsMenu() {
	activity.invalidateOptionsMenu();
}

function setActionBarTitle(title) {
	if (actionBar) {
		actionBar.title = title;
	}
}

function onCreateOptionsMenu(items) {
	Ti.API.info("setting the options menu");
	Ti.API.warn(JSON.stringify(items, null, 2));
	var i, l = items.length,
		menuItems = items;

	var optionsMenu = function(e){
		Ti.API.info("menu items method");
		var menu = e.menu;
		menu.clear();
		for (i = 0; i < l; i++) {
			Ti.API.info("onCreateOptionsMenu()");
			Ti.API.info(JSON.stringify(menuItems[i], null, 2));
			if (menuItems[i].showItem !== undefined && menuItems[i].showItem) {

				addItemToMenu(menu, menuItems[i].itemID);
			}
		};
	}
	activity.onCreateOptionsMenu = optionsMenu;
}

function alertMessage(e){
	alert(e.source.title);
}

function addItemToMenu(menu, itemID) {
	Ti.API.warn("adding item to menu");

	switch (itemID) {
	case 'logout':
		var item7 = menu.add({
			title: 'Logout',
			itemId: 7,
			icon: (custom_ic !== undefined && custom_ic.iconCheck(7))?custom_ic.getIcon(7):Ti.Android.R.drawable.ic_lock_power_off,
			showAsAction: (custom_ic !== undefined && custom_ic.actionCheck(7))?custom_ic.getshowAsAction(7):Ti.Android.SHOW_AS_ACTION_ALWAYS
		});

		item7.addEventListener('click', alertMessage);
		
		break;

	case 'search':
		var item6 = menu.add({
			title: 'Search',
			itemId: 6,
			icon: (custom_ic !== undefined && custom_ic.iconCheck(6))?custom_ic.getIcon(6):Ti.Android.R.drawable.ic_menu_search,
			showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
		});

		item6.addEventListener('click', alertMessage);
		break;

	case 'email':
		var item5 = menu.add({
			title: 'Email',
			itemId: 5,
			icon: (custom_ic !== undefined && custom_ic.iconCheck(5))?custom_ic.getIcon(5):Ti.Android.R.drawable.sym_action_email,
			showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
		});

		item5.addEventListener('click', alertMessage);
		break;
	case 'save':
		var item4 = menu.add({
			title: 'Save',
			itemId: 4,
			icon: (custom_ic !== undefined && custom_ic.iconCheck(4))?custom_ic.getIcon(4):Ti.Android.R.drawable.ic_menu_save,
			showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
		});

		item4.addEventListener('click', alertMessage);
		break;
	case 'info':
		var item3 = menu.add({
			title: 'Info',
			itemId: 3,
			icon: (custom_ic !== undefined && custom_ic.iconCheck(3))?custom_ic.getIcon(3):Ti.Android.R.drawable.ic_menu_info_details,
			showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
		});

		item3.addEventListener('click', alertMessage);
		break;
	case 'share':
		var item2 = menu.add({
			title: 'Share',
			itemId: 2,
			icon: (custom_ic !== undefined && custom_ic.iconCheck(2))?custom_ic.getIcon(2):Ti.Android.R.drawable.ic_menu_share,
			showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
		});

		item2.addEventListener('click', alertMessage);
		break;
	}
}

exports.getActivity = getActivity;
exports.onCreateOptionsMenu = onCreateOptionsMenu;