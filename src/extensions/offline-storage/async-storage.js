function asyncStorage(undefined, isConnected) {
  return {
    saveEvents: () => {},
    purgeEvents: () => {},
    isConnected,
  };
}

module.exports = asyncStorage;
