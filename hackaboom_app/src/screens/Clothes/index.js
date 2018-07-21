import React, { Component } from "react";
import {
    View, FlatList, Card, CardItem,
    TouchableOpacity
} from "react-native";
import {
    Container,
    Text, Icon, Right, Left, Body
} from 'native-base';

import { connect } from "react-redux";
import { tryGetShops, getShopsReset } from "../../redux/clothes/Actions";
import {Navigation} from 'react-native-navigation';

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

            <TouchableOpacity onPress={() => this.goto_shopDetail(item.id)}>
                <View style={styles.card}>

                    <View style={styles.roundedNameInitials}><Text style={{
                        color: "#fff",
                        fontSize: 19,
                        alignSelf: "center",
                         fontFamily: 'Poppins-Regular'
                    }}>{item.name.charAt(0).toUpperCase()}{item.name.charAt(0).toUpperCase()}</Text></View>

                    <Text style={styles.textname}>{item.name}</Text>


                </View>

            </TouchableOpacity>
        );
    }

    renderEmptyListItem() {
        return (
            <View>
                <Text>No item :(</Text>
            </View>
        );
    }

    goto_shopDetail(id) {
        this.props.navigator.push({
            screen: 'hackaboomapp.ShopDetail', // unique ID registered with Navigation.registerScreen
            animated: true, // does the push have transition animation or does it happen immediately (optional)
            animationType: 'slide-down', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
            navigatorStyle: { navBarHidden: true }, // override the navigator style for the pushed screen (optional),
            passProps: {shopId: id}
          });
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
