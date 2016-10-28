## How do I track failure events?

Suppose you've created a custom event in Google Tag Manager (GTM) for
tracking failure events `BOOK_TIME_OFF_FAILURE`. You also want to
categorize failures based on HTTP return code to get general idea of
how many of them happened on server (code 500).
So you configured GTM to label events using data layer variable `errorCode`.

The event definitions then will look something like this:

```js
// event-definitions.js

export const eventDefinitions = {
  BOOK_TIME_OFF_FAILURE: {
    eventFields: (state, action) => ({
      // eventName: 'BOOK_TIME_OFF_FAILURE',
      errorCode: action.payload.errorCode,
    }),
  },
};

```

Note, that there is no need to specify `eventName` here (commented out),
because you named your GTM event the same as the tracked redux action.
If `eventName` is omitted, the value will be taken from `action.type` by default.

You have to provide `errorCode` as a part of acton payload when
dispatching `BOOK_TIME_OFF_FAILURE`. Needless to say, failures can be
categorized by any value other than `errorCode`.

Finally, create the middleware using `createMiddleware` and your event
definitions. Then apply the middleware when creating the Redux store.

```js
// wherever you are creating the Redux store

import { createMiddleware } from 'redux-gtm';
import eventDefinitions from './event-definitions';
import { createStore } from 'redux';
import reducer from './reducer';

const analyticsMiddleware = createMiddleware(eventDefinitions);
const store = createStore(reducer, applyMiddleware(analyticsMiddleware));
```

Now the event will be pushed to the data layer every time the failure action
gets dispatched. Google Analytics will categorize this particular event based
on `errorCode` value.
