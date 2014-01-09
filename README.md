ParkSwap
========

Give a ride, get a spot! This is a work in progress, currently being built as a student project at [Hack Reactor](http://www.hackreactor.com). Team members are [Dan Chao](http://www.github.com/bioball), [Joseph Toney](http://www.github.com/chip2int) and [Yong-Soo Chung](http://www.github.com/yongsoo).

Usage
-----

Too often, people spend their time circling around city blocks looking for a parking spot. At the same time, there are people who have parked quite far away from where they are, and need to walk a considerable distance to get back to their car. This app aims to connect these people, so the parkers can give people rides back to their car, and take their parking spot afterwards. By virtue of this, it's our hope that the riders would give the parker a ride back to the original location.

The site is designed for mobile phones in portrait view. When viewed from a landscape mode, the pages will be distorted out of proportion.

If viewing from the browser, we suggest using Google Chrome Canary, and using their emulation feature (Developer Tools > Sources > Emulation), which will fix the aspect for you.

Android homescreen
------------------

This app is Android homescreen capable. If you would like this app to appear on your homescreen, you will need to download Chrome Beta, and [follow these instructions](https://developers.google.com/chrome/mobile/docs/installtohomescreen).

Tech stack
----------

The app is built on a SEAN stack (SQL, Express, Angular, Node). The back-end database is handled through the Bookshelf.js ORM, and authentication is handled through Passport.js.

The front-end libraries are frameworked by Angular, includes the ui-map and ui-utils libraries for Google Map integration, and jQuery for certain animations.


Setup & installation
--------------------

If you would like to fork this branch and set it up on your own environment, follow these instructions:

1. `git clone https://github.com/bioball/ParkSwap`
2. `cd ParkSwap`
3. `npm install`
4. `bower install`
5. `npm run-script migrate`
6. `npm start`

Version
-------

### 1.0.1 ###


Deployment
----------

[park-swap.herokuapp.com](http://park-swap.herokuapp.com/)
