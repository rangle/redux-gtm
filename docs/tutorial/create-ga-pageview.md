## createGApageview
Time to create a pageview which triggers `GAPageViews` tag. Similar to creating a `GAEvents` trigger, we call `createGApageview` for pageview events.
`createGApageview` takes a string as an optional parameter and returns the following Javascript object. The parameter is to pass in a value of `page` property.

```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'pageview',
  page, // defaults to 'unknown page',
}
```
`ng2-redux-router` dispatches `UPDATE_LOCATION` action on every route change for which we can create a pageview event definition, hence, we need to import `UPDATE_LOCATION` from `ng2-redux-router` and `createGApageview` from ReduxGTM `EventHelpers`.

_src/app/sample-app.ts_

```js
import { NgReduxRouter, UPDATE_LOCATION } from 'ng2-redux-router';

...

// import ReduxGTM APIs
import { createMiddleware, EventHelpers } from 'redux-gtm';
const { createGAevent, createGApageview } = EventHelpers;

const eventDefinitionsMap = {
  'LOGIN_USER': {
    eventFields: (prevState, action) => {
      return createGAevent({
        eventAction: 'Click Login Button',
        eventCategory: 'Login',
        eventLabel: 'Login Attempt',
        eventValue: action.payload.username,
      });
    },
  },
  [UPDATE_LOCATION]: {
    eventFields: (prevState, action) => {
      return createGApageview( action.payload );
    },
  },
};
...
```

If we refresh our app running with GTM preview mode in a browser and click on `About Us` link on the top nav bar, we see `GAPageViews` tag triggered on route change.

<img width="612" alt="pageview-props" src="https://cloud.githubusercontent.com/assets/4659414/20890851/7d25b70e-bad6-11e6-8ca9-bfe64c51d9a4.png">
