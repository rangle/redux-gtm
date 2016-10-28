## How to do mini surveys

Let's say you want to run a simple survey 'Do you like sushi?' For that
purpose you created an event in GTM called `do-you-like-sushi`. This event is
to track answers and categorize (label) them into 'yes' and 'no'.

You also configured store to respond to action `SURVEY_ANSWERED_SUCCESS` expecting
the following example payload:

```js
let surveyAnsweredPayload = {
  surveyName: 'do-you-like-sushi',
  answer: 'Yes',
  howMuch: 5
};
```

The event definition will then look like this:

```js
// event-definitions.js

export const surveyEvents = {
  SURVEY_ANSWERED_SUCCESS: {
    eventFields: (state, action) => action.payload,
    eventSchema,
  },
};

const eventSchema = {
  answer: answer => answer,
  howMuch: howMuch => howMuch > 0,
};

```

In this case you may also instruct GTM to use data layer variable `howMuch`
as this particular event value. So you now only track 'yes' and 'no' answers, but also
have average ratings per these categories.

`eventSchema` in this example makes sure that no event without an answer or positive
value will enter the data layer.
