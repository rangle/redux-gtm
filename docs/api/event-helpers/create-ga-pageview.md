### `createGApageview(page, pageProps?)`

Returns a plain JavaScript object with the following properties:
```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'pageview',
  page, // defaults to 'unknown page',
}
```

#### Parameters
##### `string` page *(optional)*
Use the `page` argument to pass in a value for the `page` property.
##### `object` pageProps *(optional)*
Use the `eventProps` argument to pass in values for `title` and `location`.

#### Example 1
You want to track the number of page views in your application. You
have an action `ROUTE_CHANGED` that dispatches with a route as its
payload whenever your app's view changes.

```js
import { EventHelpers } from 'redux-gtm';
const { createGApageview } = EventHelpers;

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

#### Example 2
You want to track a form submission as a virtual page view. You
have an action `FORM_SUBMITTED`.

```js
import { EventHelpers } from 'redux-gtm';
const { createGApageview } = EventHelpers;

const eventDefinitionsMap = {
  FORM_SUBMITTED: {
    eventFields: (prevState, action) => {
      return createGApageview('/form_submitted', {
        title: 'Form Submitted',
        location: '/form_submitted',
      });
    },
  }
};
```

Say one of your users has submitted the form, ReduxGTM will emit the following event:

```js
{
  event: 'REDUX_GTM_GA_EVENT',
  hitType: 'pageview',
  page: '/form_submitted',
  title: 'Form Submitted',
  location: '/form_submitted',
}
```
