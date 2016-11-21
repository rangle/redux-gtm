## createGAevent(eventProps)

### Returns
A plain JavaScript object with the following properties:
```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'event',
  eventAction, // defaults to "unkown action"
  eventCategory, // defaults to "unknown category"
  eventLabel, // defaults to "unknown label"
  eventValue, // defaults to "unknown value"
}
```

### Expects
##### `object` eventProps *(optional)*
Use the `eventProps` argument to pass in values for `eventAction`,
`eventCategory`, `eventLabel`, and `eventValue`.

### Example
You want to track the number of failed requests in your
application. You have an action `REQUEST_ERROR` that dispatches with
an http status code as its payload whenever there's a failed request.

```js
import { EventHelpers } from 'redux-gtm';
const { createGAevent } = EventHelpers;

const eventDefinitionsMap = {
  REQUEST_ERROR: {
    eventFields: (prevState, action) => {
      return createGAevent({ eventCategory: 'Error', eventValue: action.payload });
    },
  }
}
```

Say your app experiences a request that fails with a `500` status
code. ReduxGTM will emit the following event:

```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'event',
  eventAction: 'unkown action',
  eventCategory: 'Error',
  eventLabel: 'unknown label'
  eventValue: 500,
}
```
