/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { Navigation } from 'react-native-navigation';
import { Provider } from "react-redux";
import store from "./src/redux/configureStore";

import SignIn from "./src/screens/SignIn"

Navigation.registerComponent('mke.SignIn', () => SignIn,store,Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'mke.SignIn', // unique ID registered with Navigation.registerScreen
    title: 'Welcome', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
