# redux-gtm
> Synchronize Redux actions with Google Tag Manager events

## Getting Started

### Installation

With [npm](https://www.npmjs.com/):
```bash
npm install --save redux-gtm
```

With [yarn](https://yarnpkg.com/):
```bash
yarn add redux-gtm
```

### Example Usage
> Tracking page views using react-router-redux and redux-gtm

Suppose you've created a custom event in Google Tag Manger (GTM) for
tracking page views: `my-app-page-view`. And the custom event triggers a
Google Analytics tag that sends the custom Data Layer variable: `route`.

Suppose also that your application
uses [react-router](https://github.com/ReactTraining/react-router) in
combination with
[react-router-redux](https://github.com/reactjs/react-router-redux) to
manage routing.

Here's how you would use `redux-gtm` to map the routing actions
generated by `react-router-redux` with your custom GTM event
`my-app-page-view`:

Start by creating a mapping between your Redux actions and you analytics
events. In this example the action type we want to track is defined by
the `LOCATION_CHANGE` constant exposed by `react-router-redux`.

```js
// event-definitions.js

import { LOCATION_CHANGE } from 'react-router-redux';

const eventDefinitions = {
  [LOCATION_CHANGE]: {
    eventName: 'my-app-page-view' // The name of the custom GTM event
    eventFields: (state, action) => ({
      // Map the custom Data Layer variable to the new route
      route: action.payload.location.pathname,
    }),
  },
}

export default eventDefinitions;
```

Next, create the middleware using `createMiddleware` and your event
definitions. Then apply the middleware when creating the Redux store.

```js
// wherever you are creating the Redux store

import { createMiddleware } from 'redux-gtm'; // **
import eventDefinitions from './event-definitions'; // **
import { createStore } from 'redux';
import reducer from './reducer';

const analyticsMiddleware = createMiddleware(eventDefinitions);

const store = createStore(reducer, applyMiddleware(analyticsMiddleware));
```

That's it! Now, whenever the route changes, ReduxGTM will create and emit
an event to Google Tag Manger.

## Examples
[WIP]

## API

### ReduxGTM.createMiddleware(eventDefinitions, [dataLayer])

Returns Redux middleware for synchronizing actions to custom GTM events.

### ReduxGTM.createMetaReducer(eventDefinitions, [dataLayer])

Return a meta reducer for synchronizing actions to custom GTM events.

### eventDefinitions `Object`
Used by ReduxGTM to map Redux actions to events.

##### Example
The following example shows how you would map the `PRODUCT_PURCHASED` action
to the `checkoutComplete` event.

```js
{
  'PRODUCT_PURCHASED': { eventName: 'checkoutComplete' }
}
```

#### Notes:
 - Each key in the `eventDefinitions` object must match an existing Redux action type.
 - Each value must be a valid `eventDefinition` (see below).

### eventDefinition `Object`
Used by ReduxGTM to generate an event for a Redux action.

##### Example

```js
    {
     eventName: 'my-app-page-view',
     eventFields: (state, action) => ({
       route: action.payload.location.pathname,
     }),
     eventSchema: {
       event: value => typeof value === 'string',
       route: value => typeof value === 'string',
     },
    }
```

#### eventDefinition.eventName (Optional) `String`
Use this property to specify the name of the event you want to emit
for the associated Redux action. If not provided, the event name
defaults to the Redux action type.

#### eventDefinition.eventFields (Optional) `Function`
Attach a function to this property to define any variables you would
like to emit with the event. Any function assigned to this property
will receive the state of the application, and the associated action
object. Any properties in the object returned by the attached function
will be emitted along with the event.

#### eventDefinition.eventSchema (Optional) `Object`
Use this property to define a schema for the event. Attach validation
functions for each property in the event that you want to validate. If
any of these validation functions return false, the event will not be
emitted.
