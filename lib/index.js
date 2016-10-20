const middleware = require('./middleware');
const metaReducer = require('./meta-reducer');

module.exports = actionsToTrack => ({
  middleware: middleware(actionsToTrack),
  metaReducer: metaReducer(actionsToTrack),
});
