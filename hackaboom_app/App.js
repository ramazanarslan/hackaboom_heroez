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

import Icon from 'react-native-vector-icons/Ionicons';

import Clothes from "./src/screens/Clothes";
import Dashboard from "./src/screens/Dashboard";
import Music from "./src/screens/Music";
import Splash from "./src/screens/Splash";

Navigation.registerComponent('hackaboomapp.Clothes', () => Clothes, store, Provider);
Navigation.registerComponent('hackaboomapp.Dashboard', () => Dashboard, store, Provider);
Navigation.registerComponent('hackaboomapp.Music', () => Music, store, Provider);
Navigation.registerComponent('hackaboomapp.Splash', () => Splash, store, Provider);

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


// _populateIcons = () => {
//   return new Promise(function (resolve, reject) {
//     Promise.all(
//       [
//         Icon.getImageSource('ios-heart', 24),
//         Icon.getImageSource('ios-shirt', 24),
//         Icon.getImageSource('ios-musical-notes', 24)
//       ]
//     ).then((values) => {
//       resolve(values);
//     }).catch((error) => {
//       console.log(error);
//       reject(error);
//     }).done();
//   });
// };
//
// startApp = (values) => {
//   Navigation.startTabBasedApp({
//     tabs: [
//       {
//         label: 'Dashboard',
//         screen: 'hackaboomapp.Dashboard',
//         icon: values[0],
//         title: 'dashboard'
//       },
//       {
//         label: 'Clothes',
//         screen: 'hackaboomapp.Clothes',
//         icon: values[1],
//         title: 'clothes'
//       },
//       {
//         label: 'Music',
//         screen: 'hackaboomapp.Music',
//         icon: values[2],
//         title: 'music'
//       }
//     ],
//     tabsStyle: {
//       tabBarButtonColor: '#ffff00',
//       tabBarSelectedButtonColor: '#ff9900',
//       tabBarBackgroundColor: '#551A8B',
//       initialTabIndex: 1,
//     },
//     appStyle: {
//       orientation: 'portrait'
//     },
//     animationType: 'slide-down'
//   })
//     .then(() => {
//       null;
//     })
//     .catch((err) => {
//       console.log("Navigation is failed. Error => ", err);
//     });
// }
//
// _populateIcons().then((values) => {
//   // Start app only if all icons are loaded
//   startApp(values);
// }).catch((error) => {
//   console.error(error);
// });
