## Tracking Offline Hits On Cordova App

Suppose you want to have offline storage for your Cordova app to track redux actions. You are assumed to have [eventDefinitionsMap](../api/event-definitions-map.md) and [offline-web](../api/extensions/offline-web.md) implemented in your application at this point. If you are not ready with the requirements, please follow [our tutorial](../tutorial/index.md).

Now you would need to create a new GTM container for your mobile application. Follow the instruction [here](https://support.google.com/tagmanager/answer/6103696?hl=en&ref_topic=3441530). The container needs to have some listeners setup. Please follow [GTM Setup](https://github.com/kraihn/cordova-plugin-tag-manager/wiki/GTM-Setup).

Next, install a Cordova plugin, [cordova-plugin-tag-manager](https://github.com/kraihn/cordova-plugin-tag-manager), that posts usage information to your GTM by simply running the following command in your Cordova project:

```js
cordova plugin add cordova-plugin-tag-manager
```
Import the Cordova plugin using `cordova.js` in your source code to set up and create a ReduxGTM with a `customDataLayer` when [`deviceready`](https://cordova.apache.org/docs/en/4.0.0/cordova/events/events.deviceready.html) occurs or when your app is on init.

The code below is a proof of concept of how to implement `cordova-plugin-tag-manager` in Angular2 using Redux along with the pre-requisites mentioned in the beginning.

```js
import { Component, OnInit } from '@angular/core';
import { middleware, enhancers } from '../store';
import { NgRedux } from 'ng2-redux';
import { rootReducer } from '../store';
import { createMiddleware, EventHelpers, Extensions } from 'redux-gtm';

// Import cordova.js
declare const cordova: any;

// Map your redux action types to analytics events
const eventDefinitionsMap = {
  ...
};

// Create a connectivity selector.
// It accepts the Redux state.
// It returns true when online, otherwise, returns false
const isConnected = state => state.counter.toJS().isConnected;

// Create the offline storage extension.
const offlineStorage = Extensions.offlineWeb(isConnected);

@Component({
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {
  ...

  ngOnInit() {
    // So at this moment, the cordova device/platform should be ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    StatusBar.styleDefault();
    Splashscreen.hide();

    var tagManager = cordova.require('com.jareddickson.cordova.tag-manager.TagManager');
    var gtmId = 'GTM-XXXXXXX';  // your Google Tag Manager ID for mobile container
    var intervalPeriod = 30;    // seconds

    // Initialize your GTM container
    tagManager.init(null, null, gtmId, intervalPeriod);

    // Create a custom data layer extension
    var customDataLayer = {
      push(event) {
      switch(event.hitType) {
        case 'event':
            tagManager.trackEvent(null, null, event.eventCategory, event.eventAction, event.eventLabel, event.eventValue);
        break;

        case 'pageview':
            tagManager.trackPage(null, null, event.page);
        break;

        default:
        break;
      }
    }
  }

    // Create the analytics middleware and push it to
    middleware.push(createMiddleware(eventDefinitionsMap, { customDataLayer, offlineStorage }));

    this.ngRedux.configureStore(rootReducer, {}, middleware, enhancers);
  }
}

```
