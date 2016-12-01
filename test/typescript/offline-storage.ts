import { Extensions } from '../../index.d';

const isConnected = () => true;

const offlineStorageWeb = Extensions.offlineWeb(isConnected);
const offlineStorageRB = Extensions.offlineReactNative({}, isConnected);
