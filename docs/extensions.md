# extensions

There are three types of extensions supported by ReduxGTM:
 - [customDataLayer](#customdatalayer)
 - [offlineStorage](#offlinestorage)
 - [logger](#logger)

## customDataLayer
An `Object`that ReduxGTM will push events to instead of the `window.dataLayer`.

### Properties

#### `function` push
ReduxGTM will call this function with each created event. The function
should accept a plain event object as its first argument.

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

## offlineStorage
An `Object` that ReduxGTM will use to determine whether or not your
app is offline.

### Properties

#### `function` saveEvents(events)
#### `function` purgeEvents()
#### `function` isConnected(state)

## logger

### Properties

#### `function` log(event, action, state)
