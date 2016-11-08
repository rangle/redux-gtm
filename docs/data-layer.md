## dataLayer

An `object` with a `push` method for adding events to a custom data
layer. The push method must accept a plain event object as its first
argument. Both `createMiddleware` and `createMetaReducer` accept a
`dataLayer` object as an optional argument and will push events to it
if provided.

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

const gtmMiddleware = createMiddlware(eventDefinitionsMap, customDataLayer);

const store = createStore(combinedReducer, applyMiddleware(gtmMiddleware));
```
