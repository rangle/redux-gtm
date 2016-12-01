### `createMiddleware(eventDefinitionsMap, extensions?)`

Returns [Redux middleware](http://redux.js.org/docs/advanced/Middleware.html#the-final-approach)
that synchronizes actions to Google Tag Manager events.

```js
import { createStore, applyMiddleware } from 'redux';
import { createMiddleware } from 'redux-gtm';

import reducer from './reducer';

const eventDefinitionsMap = {
   'SOME_REDUX_ACTION': { eventName: 'some-gtm-event' },
};

const middleware = createMiddleware(eventDefinitionsMap);
const store = createStore(reducer, applyMiddleware(middleware));
```
#### Parameters
##### `object` [eventDefinitionsMap](event-definitions-map.md)
##### `object` *(optional)* [extensions](extensions/index.md)
