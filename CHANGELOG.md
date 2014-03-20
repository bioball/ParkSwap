Changelog
=========

1.1.3
-----

* Fixed issue where map wasn't fetching a new address upon idle (again). Note: Using `lat()` and `lng()` on the object returned from `getCenter()`.
* Added a grunt clean task to cooperate with grunt concat.
* Fixed an issue where the desktop flash would briefly appear for users that have already seen it.
* More error handling for geolocation.

1.1.2
-----

* Concatenated all front-end Angular components into one file for faster loading
* Split up .sass sections into their own files
* Added a flash notice if a desktop user comes to the site for the first time

1.1.1
-----

* Fixed an issue where the map wasn't fetching a new address on map idle

1.1.0
-----

* Fixed an issue where momentum scrolling on Google maps would cause it to give you an incorrect address
* Removed UI elements from the main page unless the user is viewing from a desktop browser
* Removed points of interest from Google Maps
* Added a changelog
