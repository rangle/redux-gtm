## createGAevent
Now we have a very basic event that GTM debugger reports. However, this event does not match with any of our GTM tags. To find a proper tag for the event, we need to provide more information in its definition by assigning a function to `eventFields`. ReduxGTM provides `EventHelpers` which can create _GA-starter-compatible_ triggers. We use `createGAevent` event helper to specify [dataLayer](https://developers.google.com/tag-manager/devguide) variables and pass them to GTM as a tag trigger. `createGAevent` takes an object called `eventProps` as an optional parameter and returns the following Javascript object.

```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'event',
  eventAction, // defaults to "unkown action"
  eventCategory, // defaults to "unknown category"
  eventLabel, // defaults to "unknown label"
  eventValue, // defaults to "unknown value"
}
```

With `createGAevent`, we can assign specific values to the variables to enhance `eventDefinitionsMap`.

_src/app/sample-app.ts_

```js

...

// import ReduxGTM APIs
import { createMiddleware, EventHelpers } from 'redux-gtm';
const { createGAevent } = EventHelpers;

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
};

...

```
GTM debugger logs that user login action now emits an event that has enough information to trigger `GAEvents` tag.

<img width="499" alt="login-event-info" src="https://cloud.githubusercontent.com/assets/4659414/20890855/7d32108a-bad6-11e6-9bee-2dadc12b254e.png">

We can create eventDefinitions using `createGAevent` the for other actions defined in `src/actions/session.actions.ts` and `src/actions/counter.actions.ts`.
