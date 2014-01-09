ParkSwap
========

Give a ride, get a spot! This is a work in progress, currently being built as a student project at [Hack Reactor](http://www.hackreactor.com). Team members are [Dan Chao](http://www.github.com/bioball), [Joseph Toney](http://www.github.com/chip2int) and [Yong-Soo Chung](http://www.github.com/yongsoo).

Tech stack
----------

The app is built on a SEAN stack (SQL, Express, Angular, Node). The back-end database is handled through the Bookshelf.js ORM, and authentication is handled through Passport.js.

The front-end libraries are frameworked by Angular, includes the ui-map and ui-utils libraries for Google Map integration, and jQuery for certain animations.


Set-up
------

1. `git clone https://github.com/bioball/ParkSwap`
2. `cd ParkSwap`
3. `bower install`
4. `npm run-script migrate`
5. `npm start`

Version
-------

1.0.1