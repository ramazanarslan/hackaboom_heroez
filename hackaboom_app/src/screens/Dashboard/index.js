import React, {Component} from "react";
import {
    View, Animated, Easing, ImageBackground
} from "react-native";

import {
    Container,
    Content,
    Button,
    Text, CardItem, Card, Right
} from 'native-base';

import {connect} from "react-redux";

import LottieView from 'lottie-react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';

const bg = require("../../../assets/bggradient.png");

import styles from "./styles";

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
            duration: 45000,
            easing: Easing.linear,
        }).start();
        }

    render()
        {
        return (
            <Container>

                <ImageBackground source={bg} style={styles.bg}>
                    <Content>

                        <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                            <LottieView style={{height: 250, width: 250, position: 'absolute', zIndex: 2}} loop={true}
                                        source={require('../../../assets/heartt')}
                                        progress={this.state.progress}/>

                            <LottieView style={{height: 250, width: 250}} loop={true}
                                        source={require('../../../assets/pulse')}
                                        progress={this.state.progress}/>


                        </View>
                        <View
                            style={{
                                margin: 15,
                                borderBottomColor: "white",
                                borderBottomWidth: 1
                            }}
                        />
                        <View style={{margin: 10}}>

                            <View style={styles.card}>
                                <IconFA
                                    name="heartbeat"
                                    style={{
                                        fontSize: 25,
                                        color: 'white',


                                    }}
                                />
                                <Text
                                    style={styles.textSt}> Heartbeat
                                </Text>
                                <Right>

                                    <Text style={styles.textStb}>82
                                        bpm</Text>
                                </Right>
                            </View>

                            <View style={styles.card}>
                                <IconMI
                                    name="av-timer"
                                    style={{
                                        fontSize: 25,
                                        color: 'white',


                                    }}
                                />

                                <Text style={styles.textSt} > Blood
                                    Pressure</Text>
                                <Right><Text style={styles.textStb}>100/60 mmHg</Text></Right>
                            </View>
                            <View style={styles.card}>
                                <IconE
                                    name="water"
                                    style={{
                                        fontSize: 25,
                                        color: 'white',


                                    }}
                                />
                                <Text style={{
                                    color: 'white',
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Regular'
                                }}> Perspiration</Text>
                                <Right><Text style={styles.textStb}> (Sweating) - 2.7 L/h</Text></Right>
                            </View>
                        </View>
                    </Content>
                </ImageBackground>


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
