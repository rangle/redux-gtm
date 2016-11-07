## eventDefinitionsMap
`Object` used by ReduxGTM to map action types to [eventDefinitions](./event-definition.md).

```js
import { someEventDefinition } from './event-definitions';

const eventDefinitionsMap = {
  'SOME_ACTION_TYPE': someEventDefinition,
};
```

### Notes
 - Each key must be a valid action type.
 - Each property must be a valid [eventDefinition](./event-definition.md).
