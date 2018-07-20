import React, {Component} from "react";
import {
    View
} from "react-native";
import {Animated, Easing} from 'react-native';

import {
    Container,
    Content,
    Button,
    Text
} from 'native-base';

import {connect} from "react-redux";

import LottieView from 'lottie-react-native';

class Dashboard extends Component
    {
    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props)
        {
        super(props);
        this.state = {
            progress: new Animated.Value(0),
        };
        }

    componentDidMount()
        {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 15000,
            easing: Easing.linear,
        }).start();
        }

    render()
        {
        return (
            <Container>
                <Content>
                    <View style={{alignSelf: 'center',justifyContent:'center'}}>
                        <LottieView style={{height: 350, width: 350}} source={require('../../../assets/music')}
                                    progress={this.state.progress}/>
                    </View>
                </Content>
            </Container>
        );
        }
    }

function bindAction(dispatch)
    {
    return {}
    }

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(Dashboard);
