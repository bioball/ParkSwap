ParkSwap
========

####Give a ride, get a spot!####
In any busy city, there are people spending too much time driving around looking for a parking spot. At the same time, there are people who walk too far to get to their car. This app aims to connect these people, so the parkers can give people rides back to their car, and take their parking spot afterwards.

This project is maintained by [Dan Chao](http://www.github.com/bioball), [Joseph Toney](http://www.github.com/chip2int) and [Yong-Soo Chung](http://www.github.com/yongsoo), and was built as a student project at [Hack Reactor](http://www.hackreactor.com/).

####Contents####

* [Usage](#usage)
* [Android homescreen](#android-homescreen)
* [Setup & installation](#setup--installation)
* [Aspect ratio](#aspect-ratio)
* [Version](#version)
* [Deployment](#deployment)
* [Screenshots](#screenshots)
* [Credits](#credits)

Usage
-----

####If you are parking####
Select "I want a spot", and you will be shown a list of parking spots. This list will only show people within a mile radius of you, and will provide their parking spot address, distance from you, plus the person's current address.

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

The app is built on a SEAN stack (PostgreSQL/SQLite3, Express, Angular, Node). The back-end database is handled through the Bookshelf.js ORM, and authentication is handled through Passport.js.

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

The site is designed for mobile phones in portrait view. If viewing from the browser, make sure your window is roughly the same aspect ratio as a portrait a mobile phone (e.g. 9 units wide x 16 units high).


Version
-------

### 1.1.3 ###

Deployment
----------

[parkswap.co](http://parkswap.co/)


Screenshots
-----------

<img src="/screens/login.png" height="33%" width="33%"></img>
<img src="/screens/main.png" height="33%" width="33%" style=""></img>
<img src="/screens/where.png" height="33%" width="33%" style=""></img>
<img src="/screens/wait.png" height="33%" width="33%" style=""></img>
<img src="/screens/list.png" height="33%" width="33%" style=""></img>
<img src="/screens/pickup.png" height="33%" width="33%" style=""></img>

Credits
-------

Shoutouts to Emma Tzeng for the idea!
