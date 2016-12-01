# ReduxGTM

Google Tag Manager integration for Redux and ngrx/store

[![license](https://img.shields.io/github/license/rangle/redux-gtm.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/redux-gtm.svg)](https://www.npmjs.com/package/redux-gtm)
[![CircleCI](https://img.shields.io/circleci/project/github/rangle/redux-gtm.svg)](https://circleci.com/gh/rangle/redux-gtm)

```bash
npm install --save redux-gtm
```
----

### Quick Start

##### What You Need First
 - An app using [Redux](http://redux.js.org/) or [ngrx/store](https://github.com/ngrx/store) to manage state
 - A [Google Tag Manager](https://developers.google.com/tag-manager/) (GTM) account
 - An installed GTM [container snippet](https://developers.google.com/tag-manager/quickstart)

##### How it Works
In a nutshell, ReduxGTM provides a way for mapping your redux actions to
[custom Gooogle Tag Manager events](https://developers.google.com/tag-manager/devguide#events).
The first step is to create an `EventDefinitionsMap` which maps your
action types to an `EventDefinition`:

```js
const eventDefinitionsMap = {
  'SOME_ACTION_TYPE': {
    eventName: 'some-custom-gtm-event',
    eventFields: (state, action) => ({
      'someEventVariable': action.payload
    }),
  }
};
```

The object mapped to `SOME_ACTION_TYPE` is called an
`EventDefinition`. ReduxGTM uses `EventDefinitions` to generate a
custom GTM events. The `EventDefinition` above will produce an event
with following shape:

```js
{
  'event': 'some-custom-gtm-event',
  'someEventVariable': ... // the value stored in action.payload
}
```

Once we've got an event definitions map, all we have to do is create
the middleware, and apply it to our store.

```js
import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';

// Import ReduxGTM
import { createMiddleware } from 'redux-gtm';

// The event definitions map prepared earlier
const eventDefinitionsMap = {
  'SOME_ACTION_TYPE': {
    eventName: 'some-custom-gtm-event',
    eventFields: (state, action) => ({
      'someEventVariable': action.payload
    }),
  }
};

// Create the ReduxGTM middleware
const middleware = createMiddleware(eventDefinitionsMap);

// Apply the middleware when creating your Redux store
const store = createStore(reducer, applyMiddleware(analyticsMiddleware));
```

Now, whenever your application dispatches `SOME_ACTION_TYPE`, ReduxGTM
will create the associated custom event and push it to the data layer.

##### What Else Can You Do?

 * You can use ReduxGTM in React Native and Cordova apps
 * You can track analytics events even if one of your users loses connection
 * You can provide multiple event definitions for a single redux action

### Official Docs
Please refer to the offlicial docs for a comprehensive API reference, tutorials, and examples.

### License
This project is licensed under the MIT License.
