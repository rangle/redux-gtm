## ReduxGTM.createMiddleware(eventDefinitions, [dataLayer]) `Function`
### Returns
Redux middleware that synchronizes actions to Google Tag Manager events.
### Expects
#### eventDefinitions (Required) `Object`
Used by ReduxGTM to map Redux actions to events. The following example
shows how you would map the `PRODUCT_PURCHASED` action to the
`checkoutComplete` event.

```js
{
  'PRODUCT_PURCHASED': { eventName: 'checkoutComplete' }
}
```

##### Notes
 - Each key must be a valid Redux action type
 - Each property must be a valid [eventDefinition](event-definition.md)
