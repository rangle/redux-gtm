## createMiddleware(eventDefinitionsMap, [dataLayer])

### Returns
[Redux middleware](http://redux.js.org/docs/advanced/Middleware.html#the-final-approach)
that synchronizes actions to Google Tag Manager events.

### Parameters
##### `object` [eventDefinitionsMap](event-definitions-map.md)
##### `object` *(optional)* [options](options.md)

### Example
```js
import { createMiddleware } from 'redux-gtm';

const eventDefinitionsMap = {
   'SOME_REDUX_ACTION': { eventName: 'some-gtm-event' },
};

const middleware = createMiddleware(eventDefinitionsMap);
```
