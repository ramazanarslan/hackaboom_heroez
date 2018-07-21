import React, { Component } from "react";
import {
    View, Animated, Easing, TouchableWithoutFeedback, FlatList
} from "react-native";

import {
    Container,
    Content,
    Button,
    Text,
    Card,
    CardItem,
    Icon,
    Right
} from 'native-base';

import Video from "react-native-video";
import LottieView from 'lottie-react-native';

import { tryGetHappy, getHappyReset, tryGetAngry, getAngryReset } from "../../redux/music/Actions";
import { connect } from "react-redux";

import styles from "./styles";

class Music extends Component {

    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            paused: true,
            progress: new Animated.Value(0),
            listStyle: -1,
            pickedTrack: {
                title: 'Stressed Out',
                artist: 'Twenty One Pilots',
                audioUrl: "https://soundcloud.com/uiceheidd/lucid-dreams-forget-me",
            }
        }
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 6500,
            easing: Easing.linear,
        }).start();
    }

    componentDidUpdate() {
        const {
            getHappyInProgress, getHappyHasError, getHappyCompleted,
            getAngryInProgress, getAngryHasError, getAngryCompleted
        } = this.props.music;

        if (!getHappyInProgress && !getHappyHasError && getHappyCompleted) {
            this.props.getHappyReset();
            this.setState({ listStyle: 0 });
        }

        if (!getAngryInProgress && !getAngryHasError && getAngryCompleted) {
            this.props.getAngryReset();
            this.setState({ listStyle: 1 });
        }
    }

    render() {
        const { listStyle } = this.state;

        return (
            <Container>
                {listStyle === -1 ?
                    this.renderListPickingEmojis()
                    :
                    this.renderList()
                }
                <Video
                    source={{ uri: this.state.pickedTrack.audioUrl }} // Can be a URL or a local file.
                    ref={(el) => this.audioEl = el}
                    paused={this.state.paused}               // Pauses playback entirely.
                    onLoad={(data) => console.log("audio is loaded.", data)}    // Callback when video loads
                />
            </Container>
        );
    }

    renderListPickingEmojis() {
        return (
            <Content contentContainerStyle={{ flex: 1 }} padder>
                <View style={styles.happyPart}>
                    <TouchableWithoutFeedback onPress={() => this.pickHappyMusics()}>
                        <LottieView style={{ height: 150, width: 150 }} source={require('../../../assets/happy')}
                            progress={this.state.progress} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.angryPart}>
                    <TouchableWithoutFeedback onPress={() => this.pickAngryMusics()}>
                        <LottieView style={{ height: 150, width: 150, }} source={require('../../../assets/angry')}
                            progress={this.state.progress} />
                    </TouchableWithoutFeedback>
                </View>
            </Content>
        );
    }

    pickHappyMusics() {
        this.props.tryGetHappy();
    }

    pickAngryMusics() {
        this.props.tryGetAngry();
    }

    renderList() {
        const { musicList } = this.props.music;

        return (
            <Content contentContainerStyle={{ flex: 1 }} padder>
                <FlatList
                    data={[{
                        title: 'Stressed Out',
                        artist: 'Twenty One Pilots',
                        audioUrl: "https://soundcloud.com/uiceheidd/lucid-dreams-forget-me",
                    }]}
                    keyExtractor={(item, index) => item.id + "-" + index}
                    renderItem={({ item, index }) => this.renderMusicListItem(item, index)}
                    ListEmptyComponent={() => this.renderEmptyListItem()}
                />
            </Content>
        );
    }

    renderMusicListItem(item, index) {
        return (
            <Card>
                <CardItem>
                    <Icon active name="ios-musical-note" />
                    <Text>{item.title}</Text>
                    <Right>
                        <Icon name="ios-play" size={24} style={{color: "black"}}/>
                    </Right>
                </CardItem>
            </Card>
        );
    }

    renderEmptyListItem() {
        return (
            <View>
                <Text>No item :(</Text>
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        tryGetHappy: () => dispatch(tryGetHappy()),
        getHappyReset: () => dispatch(getHappyReset()),

        tryGetAngry: () => dispatch(tryGetAngry()),
        getAngryReset: () => dispatch(getAngryReset())
    }
}

const mapStateToProps = state => ({
    music: state.music
});

export default connect(mapStateToProps, bindAction)(Music);
