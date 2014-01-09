ParkSwap
========

**Give a ride, get a spot!** In any busy city, there are people spending too much time driving around looking for a parking spot. At the same time, there are people who walk too far to get to their car. This app aims to connect these people, so the parkers can give people rides back to their car, and take their parking spot afterwards. We hope that those who get rides will also bring the parker back to the original location.

This is a work in progress, currently being built as a student project at [Hack Reactor](http://www.hackreactor.com). Team members are [Dan Chao](http://www.github.com/bioball), [Joseph Toney](http://www.github.com/chip2int) and [Yong-Soo Chung](http://www.github.com/yongsoo).

####Contents####

* [Usage](#usage)
* [Android homescreen](#android-homescreen)
* [Setup & installation](#setup--installation)
* [Aspect ratio](#aspect-ratio)
* [Version](#version)
* [Deployment](#deployment)
* [Credits](#credits)

Usage
-----

####If you are parking####
Select "I want a spot", and wait for the list to populate with people with parking spots. The list will show you the parking spot address, distance from you, and the rider's current address.

Clicking an entry will show you the person's picture, as well as buttons to call and navigate.

####If you want a ride to your car####
Select "I want a ride", then enter your car's parking location. Enable location tracking if the browser requests it. Upon submit, your information will be sent to our servers, and we will try to connect you to a parker. 

If somebody is coming to pick you up, you will recieve a text from us, including a link to go back to view that person's profile picture, as well as a button to call them.

*Note: Your search will time out after 10 minutes.*

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

Aspect ratio
------------

The site is designed for mobile phones in portrait view. When viewed from a landscape mode, the pages will be distorted out of proportion.

If viewing from the browser, we suggest using Google Chrome Canary, and using their emulation feature (Developer Tools > Sources > Emulation), which will fix the aspect for you.


Version
-------

### 1.0.1 ###


Deployment
----------

[park-swap.herokuapp.com](http://park-swap.herokuapp.com/)


Credits
-------

Shoutouts to Emma Tzeng for the idea!
