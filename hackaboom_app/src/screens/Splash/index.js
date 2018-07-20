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
        }

    render()
        {
        const {HulkVisible} = this.state;
        return (
            <Container>
                <ImageBackground source={bg} style={styles.bg}>


                    {HulkVisible ?
                        <Animatable.Image style={styles.bgMiddle} animation="fadeIn"  duration={1000}
                                          source={hulk}></Animatable.Image>
                        :
                        <Animatable.Image style={styles.bgMiddle}  animation="fadeOut"
                                         duration={3000}
                                          source={man}></Animatable.Image>
                    }


                </ImageBackground>
            </Container>
        );
        }

    _toogle()
        {

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


import Animated from 'react-native';

class Fade extends Component
    {
    constructor(props)
        {
        super(props);
        this.state = {
            visible: props.visible,
        };
        };

    componentWillMount()
        {
        this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
        }

    componentWillReceiveProps(nextProps)
        {
        if ( nextProps.visible )
            {
            this.setState({visible: true});
            }
        Animated.timing(this._visibility, {
            toValue: nextProps.visible ? 1 : 0,
            duration: 300,
        }).start(() =>
        {
        this.setState({visible: nextProps.visible});
        });
        }

    render()
        {
        const {visible, style, children, ... rest} = this.props;

        const containerStyle = {
            opacity: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            }),
            transform: [
                {
                    scale: this._visibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1.1, 1],
                    }),
                },
            ],
        };

        const combinedStyle = [containerStyle, style];
        return (
            <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {... rest}>
                {this.state.visible ? children : null}
            </Animated.View>
        );
        }
    }
