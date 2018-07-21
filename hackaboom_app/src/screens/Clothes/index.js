import React, { Component } from "react";
import {
    View, FlatList, Card, CardItem,
    TouchableWithoutFeedback
} from "react-native";
import {
    Container,
    Text, Icon, Right, Left, Body
} from 'native-base';

import { connect } from "react-redux";
import { tryGetShops, getShopsReset } from "../../redux/clothes/Actions";

import MapView, { Marker } from 'react-native-maps';

import styles from "./styles";

class Clothes extends Component {
    static navigatorStyle = {
        navBarHidden: true,
    };

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 41.053655,
                longitude: 28.991958,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    componentDidMount() {
        const { shopList } = this.props.clothes;
        if (shopList.length <= 0)
            this.props.tryGetShops();
    }

    componentDidUpdate() {
        const {
            getShopsInProgress, getShopsHasError, getShopsCompleted
        } = this.props.clothes;

        if (!getShopsInProgress && !getShopsHasError && getShopsCompleted) {
            console.log("fetching shop is done...");
            this.props.getShopsReset();
        }
        else if (!getShopsInProgress && getShopsHasError && getShopsCompleted) {
            console.log("fetching shop has error...");
            this.props.getShopsReset();
        }
    }

    render() {
        const { shopList } = this.props.clothes;

        return (
            <Container>
                <View style={styles.mapLayout}>
                    <MapView
                        style={styles.mapStyle}
                        region={this.state.region}
                        onRegionChangeComplete={(region) => this.setState({ region })}>
                        {shopList.map(item => (
                            <Marker
                                key={item.id}
                                coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.long) }}
                                title={item.name}
                            />
                        ))}
                    </MapView>
                </View>
                <View style={styles.listLayout}>
                    <FlatList
                        data={shopList}
                        keyExtractor={(item, index) => item.id + "-" + index}
                        renderItem={({ item, index }) => this.renderShopListItem(item, index)}
                        ListEmptyComponent={() => this.renderEmptyListItem()}
                    />
                </View>
            </Container>
        );
    }

    renderShopListItem(item, index) {
        return (

            <TouchableWithoutFeedback onPress={() => this.goto_shopDetail()}>
                <View style={styles.card}>

                    <View style={styles.roundedNameInitials}><Text style={{
                        color: "#fff",
                        fontSize: 19,
                        alignSelf: "center"
                    }}>{item.name.charAt(0).toUpperCase()}{item.name.charAt(0).toUpperCase()}</Text></View>

                    <Text style={styles.textname}>{item.name}</Text>


                </View>


            </TouchableWithoutFeedback>
        );
    }

    renderEmptyListItem() {
        return (
            <View>
                <Text>No item :(</Text>
            </View>
        );
    }

    goto_shopDetail() {
        /* this.props.navigator.showLightBox({
            screen: "hackaboomapp.Splash", // unique ID registered with Navigation.registerScreen
            style: {
                backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                backgroundColor: "#ff000080", // tint color for the background, you can specify alpha here (optional)
                tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
            },
            adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
        }); */
    }
}

function bindAction(dispatch) {
    return {
        tryGetShops: () => dispatch(tryGetShops()),
        getShopsReset: () => dispatch(getShopsReset())
    }
}

const mapStateToProps = state => ({
    clothes: state.clothes
});

export default connect(mapStateToProps, bindAction)(Clothes);
