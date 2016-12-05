## Setting up a starter container for Google Analytics
ReduxGTM provides a starter container that makes it easy to track basic GA pageview and event trackings with GTM.

1. Download [`GA starter`](https://raw.githubusercontent.com/rangle/redux-gtm/master/containers/ga-starter.json) from ReduxGTM.
2. Login to [your own GTM container](#prerequisites)
3. In the top navigation, click through to the **ADMIN**
4. Under the **CONTAINER** options, click on the **Import Container**
5. Choose `GA starter` as your container file

<img width="1050" alt="import-ga-starter" src="https://cloud.githubusercontent.com/assets/4659414/20890853/7d2af052-bad6-11e6-9ee0-13e7edcf0024.png">

After importing the starter container to GTM, you should see some changes in the GTM workspace.

<img width="1404" alt="workspace-changes" src="https://cloud.githubusercontent.com/assets/4659414/20890854/7d2b5dbc-bad6-11e6-83e7-7bb59f22cf79.png">

Assign `GA_TRACKING_ID` with your own GA Account ID ([find your GA Account ID](https://support.google.com/analytics/answer/1032385?hl=en)).

Now we are ready to debug our container for the first time! You can find _How to preview and debug containers_ [here](https://support.google.com/tagmanager/answer/6107056?hl=en).
Having GTM's preview mode on, just run the following commands in _angular2-redux-example_ folder.
```
npm install
npm run dev
```
You should be able to see the app running on `localhost:8080` with GTM debugger.

<img width="1431" alt="first-gtm-debugging" src="https://cloud.githubusercontent.com/assets/4659414/20890850/7d2571c2-bad6-11e6-9080-78ad022c90e2.png">
