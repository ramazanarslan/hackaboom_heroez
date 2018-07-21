/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {Navigation} from 'react-native-navigation';
import {Provider} from "react-redux";
import store from "./src/redux/configureStore";

import Clothes from "./src/screens/Clothes";
import Dashboard from "./src/screens/Dashboard";
import Music from "./src/screens/Music";
import Splash from "./src/screens/Splash";
import ShopDetail from "./src/screens/ShopDetail";

Navigation.registerComponent('hackaboomapp.Clothes', () => Clothes, store, Provider);
Navigation.registerComponent('hackaboomapp.Dashboard', () => Dashboard, store, Provider);
Navigation.registerComponent('hackaboomapp.Music', () => Music, store, Provider);
Navigation.registerComponent('hackaboomapp.Splash', () => Splash, store, Provider);
Navigation.registerComponent('hackaboomapp.ShopDetail', () => Splash, store, Provider);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'hackaboomapp.Splash', // unique ID registered with Navigation.registerScreen
        title: 'Welcome', // title of the screen as appears in the nav bar (optional)
        navigatorStyle: {navBarHidden: true}, // override the navigator style for the screen, see "Styling the
                                              // navigator" below (optional)
        navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below
                             // (optional)
    },

    animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});

