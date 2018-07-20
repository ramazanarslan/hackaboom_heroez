import React, {Component} from "react";
import {
    View, ImageBackground, TouchableWithoutFeedback
} from "react-native";
import {
    Container,
    Content,
    Button,
    Text
} from 'native-base';

import {connect} from "react-redux";
import * as Animatable from 'react-native-animatable';

import {Navigation} from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const bg = require("../../../assets/bg.png");
const man = require("../../../assets/man.png");
const hulk = require("../../../assets/hulk.png");
import styles from "./styles";

class Splash extends Component
    {
    handleTextRef = ref => this.text = ref;

    constructor(props)
        {
        super(props);
        this.state = {

            HulkVisible: false
        }

        }

    componentDidMount()
        {
        setTimeout(() =>
        {
        this.setState({HulkVisible: true})
        }, 1500);

        setTimeout(() =>
        {
        this._populateIcons().then((values) =>
        {
        // Start app only if all icons are loaded
        this.startApp(values);
        }).catch((error) =>
        {
        console.error(error);
        });
        }, 2000);
        }

    render()
        {
        const {HulkVisible} = this.state;
        return (
            <Container>
                <ImageBackground source={bg} style={styles.bg}>


                    {HulkVisible ?
                        <Animatable.Image style={styles.bgMiddle} animation="fadeIn" duration={1000}
                                          source={hulk}></Animatable.Image>
                        :
                        <Animatable.Image style={styles.bgMiddle} animation="fadeOut"
                                          duration={3000}
                                          source={man}></Animatable.Image>
                    }


                </ImageBackground>
            </Container>
        );
        }

    _populateIcons = () =>
        {
        return new Promise(function (resolve, reject)
        {
        Promise.all(
            [
                IconFA.getImageSource('dashboard', 24),
                Icon.getImageSource('ios-shirt', 24),
                Icon.getImageSource('ios-musical-notes', 24)
            ]
        ).then((values) =>
        {
        resolve(values);
        }).catch((error) =>
        {
        console.log(error);
        reject(error);
        }).done();
        });
        };

    startApp = (values) =>
        {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Dashboard',
                    screen: 'hackaboomapp.Dashboard',
                    icon: values[0],
                    title: 'dashboard'
                },
                {
                    label: 'Clothes',
                    screen: 'hackaboomapp.Clothes',
                    icon: values[1],
                    title: 'clothes'
                },
                {
                    label: 'Music',
                    screen: 'hackaboomapp.Music',
                    icon: values[2],
                    title: 'music'
                }
            ],
            tabsStyle: {

                tabBarButtonColor: '#fff',
                tabBarSelectedButtonColor: '#fff',
                tabBarBackgroundColor: '#fff',
                initialTabIndex: 1,
            },
            appStyle: {
                orientation: 'portrait',
                tabBarButtonColor: '#669999',
                tabBarSelectedButtonColor: '#23c086',
                tabBarBackgroundColor: '#eaeaea',

                tabBarHideShadow: true,
                tabBarTranslucent: true,
                tabFontFamily: 'Avenir-Medium',  // existing font family name or asset file without extension which can
                                                 // be '.ttf' or '.otf' (searched only if '.ttf' asset not found)
                tabFontSize: 10,
                selectedTabFontSize: 12,
            },
            animationType: 'slide-down'
        })
            .then(() =>
            {
            null;
            })
            .catch((err) =>
            {
            console.log("Navigation is failed. Error => ", err);
            });
        }


    }

function bindAction(dispatch)
    {
    return {}
    }

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, bindAction)(Splash);

