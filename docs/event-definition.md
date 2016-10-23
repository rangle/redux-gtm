## eventDefinition `Object`
Used by ReduxGTM to generate an event for a given Redux action.

```js
    {
     eventName: 'my-app-page-view',
     eventFields: (state, action) => ({
       route: action.payload.location.pathname,
     }),
     eventSchema: {
       event: value => typeof value === 'string',
       route: value => typeof value === 'string',
     },
    }
```

#### eventDefinition.eventName (Optional) `String`
Use this property to specify the name of the event you want to emit
for the associated Redux action. If not provided, the event name
defaults to the Redux action type.

#### eventDefinition.eventFields (Optional) `Function`
Attach a function to this property to define any variables you would
like to emit with the event. Any function assigned to this property
will receive the state of the application, and the associated action
object. Any properties in the object returned by the attached function
will be emitted along with the event.

#### eventDefinition.eventSchema (Optional) `Object`
Use this property to define a schema for the event. Attach validation
functions for each property in the event that you want to validate. If
any of these validation functions return false, the event will not be
emitted.
