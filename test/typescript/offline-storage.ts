import { Extensions } from '../../index.d';

const { OfflineStorage } = Extensions;

const isConnected = () => true;
const AsyncStorage = {};

const offlineStorageWeb = OfflineStorage.indexedDB(isConnected);
const offlineStorageRB = OfflineStorage.asyncStorage({}, isConnected);