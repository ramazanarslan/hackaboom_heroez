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
    Right,
    Left,
    Body,
    ListItem
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
            pickedTrack: {}
        }
    }

    componentDidMount() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2500,
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
                    source={{ uri: "http://167.99.141.244/media/sounds/Koop_-_Koop_Island_Blues_Official_Music_Video.mp3" }} // Can be a URL or a local file.
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
                    data={musicList}
                    keyExtractor={(item, index) => item.id + "-" + index}
                    renderItem={({ item, index }) => this.renderMusicListItem(item, index)}
                    ListEmptyComponent={() => this.renderEmptyListItem()}
                />
            </Content>
        );
    }

    renderMusicListItem(item, index) {
        return (
            <ListItem onPress={() => this.playItem(item)}>
                <Left>
                    <Icon active name="ios-musical-note" />
                </Left>
                <Body>
                    <Text>{item.title}</Text>
                </Body>
                <Right>
                    <Icon name="ios-play" size={24} style={{ color: "black" }} />
                </Right>
            </ListItem>
        );
    }

    playItem(item) {
        this.setState({
            pickedTrack: {
                title: item.title,
                artist: item.artist,
                audioUrl: item.sound,
            }
        });
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
