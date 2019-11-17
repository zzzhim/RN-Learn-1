/**
 * @format
 */
import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import AppNavigators from './src/navigator/AppNavigators'

// AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent(appName, () => AppNavigators)