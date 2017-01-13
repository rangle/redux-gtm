/**
 * If pageProps not specified, google analytics could still
 * pick up page's title and location.
 */
function createGApageview(page = 'unknown page', pageProps = {}) {
  const defaultPageView = {
    event: 'REDUX_GTM_GA_EVENT',
    hitType: 'pageview',
    page,
  };
  return Object.assign(defaultPageView, pageProps);
}

module.exports = createGApageview;
