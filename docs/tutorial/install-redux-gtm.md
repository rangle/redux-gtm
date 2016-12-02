## ReduxGTM Installation & Configuration
Install **ReduxGTM** by running `npm install redux-gtm --save`.
Next, we import `createMiddleware` from ReduxGTM and create a simple event map for _`LOGIN_USER`_ action (the action is defined in `src/actions/session.actions.ts`). We define the map as `eventDefinitionsMap` in `src/app/sample-app.ts`.

```js

...

import { createMiddleware } from 'redux-gtm';

const eventDefinitionsMap = {
  'LOGIN_USER': {
    eventName: 'LOGIN_USER',
  }
};

...

export class RioSampleApp {

  ...

  constructor(
    private devTools: DevToolsExtension,
    private ngRedux: NgRedux<IAppState>,
    private ngReduxRouter: NgReduxRouter,
    private actions: SessionActions,
    private epics: SessionEpics) {

    middleware.push(createEpicMiddleware(this.epics.login));

    // create and push ReduxGTM
    middleware.push(createMiddleware(eventDefinitionsMap));

    ngRedux.configureStore(
      rootReducer,
      {},
      middleware,
      devTools.isEnabled() ?
        [ ...enhancers, devTools.enhancer() ] :
        enhancers);

    ngReduxRouter.initialize();
  }
}
```

If you run `npm run dev` with GTM preview mode on and log in with one of the credentials given in `server/user.json` (e.g. `Username: "user"`, `Password: "pass"`), then you would see `LOGIN_USER` action logged in GTM debugger.

![login-user-event](https://cloud.githubusercontent.com/assets/4659414/20890852/7d281530-bad6-11e6-9d0c-9c8ade8989cb.gif)
