## createMetaReducer(eventDefinitionsMap, [dataLayer])

### Returns
A [meta reducer](https://gist.github.com/btroncone/a6e4347326749f938510#implementing-a-meta-reducer)
 (for use with ngrx/store) that synchronizes actions to Google Tag Manager events.

### Expects
##### `object` [eventDefinitionsMap](event-definitions-map.md)
##### `object` *(optional)* dataLayer

### Example
```js
import { createMetaReducer } from 'redux-gtm';

const eventDefinitionsMap = {
   'SOME_REDUX_ACTION': { eventName: 'some-gtm-event' },
};

const metaReducer = createMetaReducer(eventDefinitionsMap);
```
