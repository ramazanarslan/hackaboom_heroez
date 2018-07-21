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

import LottieView from 'lottie-react-native';
import Sound from 'react-native-sound';

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
            progress: new Animated.Value(0),
            listStyle: -1,
            playingMusicId: 0,
            isMusicPlaying: false
        }

        Sound.setCategory('Playback');
        this.whoosh = null;
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
        return (
            <Content contentContainerStyle={{ flex: 1 }} padder>
                <View style={styles.oneOfThird}>
                    <Button onPress={() => this.playBackSound()}>
                        <Icon name={"ios-skip-backward"} style={{ fontSize: 42 }} />
                    </Button>
                </View>
                <View style={styles.oneOfThird}>
                    {this.whoosh && this.state.isMusicPlaying ?
                        <Button onPress={() => { this.whoosh.pause(); this.setState({ isMusicPlaying: false }) }}>
                            <Icon name={"ios-pause"} style={{ fontSize: 42 }} />
                        </Button>
                        :
                        <Button onPress={() => this.playItem()}>
                            <Icon name={"ios-play"} style={{ fontSize: 42 }} />
                        </Button>
                    }
                </View>
                <View style={styles.oneOfThird}>
                    <Button onPress={() => this.playForwardSound()}>
                        <Icon name={"ios-skip-forward"} style={{ fontSize: 42 }} />
                    </Button>
                </View>
                {/* <FlatList
                    data={musicList}
                    keyExtractor={(item, index) => item.id + "-" + index}
                    renderItem={({ item, index }) => this.renderMusicListItem(item, index)}
                    ListEmptyComponent={() => this.renderEmptyListItem()}
                /> */}
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

    playBackSound() {
        const { musicList } = this.props.music;
        const { playingMusicId } = this.state;
        if(playingMusicId === 0)
            this.setState({isMusicPlaying: true ,playingMusicId: musicList.length - 1});
        else
            this.setState({isMusicPlaying: true ,playingMusicId: this.state.playingMusicId - 1});

        this.whoosh.stop(() => {
            this.whoosh = null;
            this.playItem();
        });
    }

    playForwardSound() {
        const { musicList } = this.props.music;
        const { playingMusicId } = this.state;
        if(playingMusicId === musicList.length - 1)
            this.setState({isMusicPlaying: true ,playingMusicId: 0});
        else
            this.setState({isMusicPlaying: true ,playingMusicId: this.state.playingMusicId + 1});

        this.whoosh.stop(() => {
            this.whoosh = null;
            this.playItem();
        });
    }

    playItem() {
        const { musicList } = this.props.music;
        const { playingMusicId } = this.state;

        if (!this.whoosh) {
            console.log("null sound!");
            this.whoosh = new Sound(musicList[playingMusicId].sound, null, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                console.log('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
                this.whoosh.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                        // reset the player to its uninitialized state (android only)
                        // this is the only option to recover after an error occured and use the player again
                        this.whoosh.reset();
                    }
                });
                this.setState({ isMusicPlaying: true });
            });
        }
        else {
            if (this.whoosh._filename) {
                this.whoosh.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                        // reset the player to its uninitialized state (android only)
                        // this is the only option to recover after an error occured and use the player again
                        this.whoosh.reset();
                    }
                });
                this.setState({ isMusicPlaying: true });
            }
        }
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
