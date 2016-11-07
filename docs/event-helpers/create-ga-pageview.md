## createGApageview(page)

### Returns
A plain JavaScript object with the following properties:
```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'pageview',
  page, // defaults to 'unknown page',
}
```

### Expects
##### `string` page *(optional)*
Use the `page` argument to pass in a value for the `page` property.

### Example
You want to track the number of page views in your application. You
have an action `ROUTE_CHANGED` that dispatches with a route as its
payload whenever your app's view changes.

```js
import { EventHelpers: { createGApageview } } from 'redux-gtm';

const eventDefinitionsMap = {
  ROUTE_CHANGED: {
    eventFields: (prevState, action) => {
      return createGApageview(action.payload);
    },
  }
};
```

Say one of your users moves to the `/my-account` page of your
application. ReduxGTM will emit the following event:

```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'pageview',
  page: '/my-account',
}
```
