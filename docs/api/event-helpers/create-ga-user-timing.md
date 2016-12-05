### `createGAuserTiming(timingProps?)`

Returns a plain JavaScript object with the following properties:
```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'timing',
  timingCategory, // defaults to 'unknown category'
  timingLabel, // defaults to 'unknown timing label'
  timingVar, // defaults to 'unknown timing var'
  timingValue, // defaults to 'unknown timing value'
}
```

#### Parameters
##### `object` timingProps *(optional)*
Use the `timingProps` argument to pass in values for `timingCategory`,
`timingLabel`, `timingVar`, and `timingValue`.

#### Example
You want to track the time on task of an input field. You have an
action `INPUT_FINISH` that dispatches with the number of milliseconds
user spent as its payload whenever that field got blurred.

```js
import { EventHelpers } from 'redux-gtm';
const { createGAuserTiming } = EventHelpers;

const eventDefinitionsMap = {
  INPUT_FINISH: {
    eventFields: (prevState, action) => {
      return createGAuserTiming({
        timingCategory: 'Form Input',
        timingValue: action.payload
      });
    },
  }
}
```

Say when you finish with that input field, ReduxGTM will emit the following event:

```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'timing',
  timingCategory: 'Form Input',
  timingLabel: 'unknown label'
  timingVar: 'unknown var',
  timingValue: 2000,
}
```
