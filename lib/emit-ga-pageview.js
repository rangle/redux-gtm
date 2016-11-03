function emitGApageview(page = 'unknown page') {
  return {
    event: 'REDUX_GTM_GA_EVENT',
    hitType: 'pageview',
    page,
  };
}

module.exports = emitGApageview;
