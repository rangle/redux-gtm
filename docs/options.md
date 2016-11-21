# options
 - [customDataLayer](#customdatalayer)
 - [connectivitySelector](#connectivityselector)
 - [offlineStorage](#offlinestorage)

## customDataLayer

An `object` with a `push` method for adding events to a custom data
layer. The push method must accept a plain event object as its first
argument.

### Example

The following example shows how you would create middleware with a
custom data layer in a React Native application:

```js
import { createStore, applyMiddleware } from 'redux';
import { createMiddlware } from 'redux-gtm';
import { GoogleTagManager } from 'react-native-google-analytics-bridge';

import eventDefinitionsMap from './event-definitions';
import combinedReducer from './reducers';

GoogleTagManager.openContainerWithId('GTM-XXXXXX');

const customDataLayer = {
  push(event) {
    GoogleTagManager.pushDataLayerEvent(event);
  }
}

const gtmMiddleware = createMiddlware(eventDefinitionsMap, { customDataLayer });

const store = createStore(combinedReducer, applyMiddleware(gtmMiddleware));
```

## connectivitySelector
A selector function that accepts the redux state, and returns a
connectivity boolean. ReduxGTM uses this connectivity boolean to
determine whether or not your app is offline. ReduxGTM expects the
connectivity boolean to be `true` when your app is online, and `false`
when your app is offline.

## offlineStorage
A constructor for an offline storage abstraction (e.g. IndexDB and
AsyncStorage/ReactNative). ReduxGTM will store events here when
offline, and retrieve stored events from here when back online.
