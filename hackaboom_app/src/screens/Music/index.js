import React, { Component } from "react";
import {
    View
} from "react-native";
import {
    Container,
    Content,
    Button,
    Text
} from 'native-base';

import TrackPlayer from 'react-native-track-player';

import { connect } from "react-redux";

class Dashboard extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Button onPress={() => this.playTestSound()}>
                        <Text>Play it DJ!</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    /* playTestSound() {
        console.log("setuping player");
        TrackPlayer.setupPlayer().then(() => {
            TrackPlayer.add({
                id: 'trackId',
                url: require("../../testMusic.m4a"),
                title: 'Track Title',
                artist: 'Track Artist'
            }).then(() => {
                console.log("playing now...");
                TrackPlayer.play();
            }).catch((err) => {
                console.log("Error when adding tracks.", err);
            });
        }).catch((err) => console.log("trackplayer error => ", err));
    } */
}

function bindAction(dispatch) {
    return {

    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, bindAction)(Dashboard);