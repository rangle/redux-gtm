## EventHelpers `object`

Helper functions for creating events with a specific shape.

```js
import { EventHelpers } from 'redux-gtm';

const eventDefinition = {
  eventFields: (prevState, action) => EventHelpers.someEventHelper(action.payload),
};
```

Use event helpers within an
[eventDefinition's](../event-definition.md) `eventFields` method to
create some standard event shape.

ReduxGTM provides the following event helpers:
 - [createGAevent](./create-ga-event.md)
 - [createGApageview](./create-ga-pageview.md)
