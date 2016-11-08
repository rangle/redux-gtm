# ReduxGTM

Google Tag Manager integration for Redux and ngrx/store

[![license](https://img.shields.io/github/license/rangle/redux-gtm.svg?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/redux-gtm.svg?style=flat-square)](https://www.npmjs.com/package/redux-gtm)
[![CircleCI](https://img.shields.io/circleci/project/github/rangle/redux-gtm.svg?style=flat-square)](https://circleci.com/gh/rangle/redux-gtm)

## Getting Started

### Prerequisites

 - An app using [Redux](http://redux.js.org/) or [ngrx/store](https://github.com/ngrx/store) to manage state
 - A Google Tag Manager account
 - (Web) A [container snippet](https://developers.google.com/tag-manager/quickstart) in your app's html.

### Installation

With [npm](https://www.npmjs.com/):
```bash
npm install --save redux-gtm
```

With [yarn](https://yarnpkg.com/):
```bash
yarn add redux-gtm
```

### How it Works

```js
import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';

// 1. Import ReduxGTM
import { createMiddleware } from 'redux-gtm';

// 2. Create a mapping between you Redux actions and you Google Tag Manager events
const eventDefinitions = {
  'SOME_REDUX_ACTION_TYPE': { eventName: 'some-gtm-custom-event' },
};

// 3. Create the middleware using createMiddleware from ReduxGTM
const analyticsMiddleware = createMiddleware(eventDefinitions);

// 4. Apply the middleware when creating your Redux store
const store = createStore(reducer, applyMiddleware(analyticsMiddleware));
```

Now, whenever your application dispatches `SOME_REDUX_ACTION_TYPE`,
ReduxGTM will emit `some-gtm-custom-event` to Google Tag Manager.

#### Notes
- When mapping actions to events, each action type must be mapped to a
  valid [eventDefinition](docs/event-definition.md).

## Examples
 - [How do I track pageviews when using React Router?](docs/examples/example1.md)
 - [How do I track failure events?](docs/examples/example2.md)
 - [How to do mini surveys](docs/examples/example3.md)

## API
 - [createMiddleware](docs/create-middleware.md)([eventDefinitionsMap](docs/event-definitions-map.md), [[dataLayer]](docs/data-layer.md))
 - [createMetaReducer](docs/create-meta-reducer.md)([eventDefinitionsMap](docs/event-definitions-map.md), [[dataLayer]](docs/data-layer.md))
 - [EventHelpers](docs/event-helpers/event-helpers.md)
   - [createGAevent](docs/event-helpers/create-ga-event.md)
   - [createGApageview](docs/event-helpers/create-ga-pageview.md)

## License

This project is licensed under the MIT License - see
the [LICENSE](LICENSE) file for details
