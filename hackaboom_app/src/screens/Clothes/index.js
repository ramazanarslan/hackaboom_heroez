import React, { Component } from "react";
import {
    View, FlatList
} from "react-native";
import {
    Container,
    Text
} from 'native-base';

import { connect } from "react-redux";
import { tryGetShops, getShopsReset } from "../../redux/clothes/Actions";

import MapView from 'react-native-maps';

import styles from "./styles";

class Clothes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }
    }

    componentDidMount() {
        /* const { shopList } = this.props.clothes;
        if(shopList.length <= 0)
            this.props.tryGetShops(); */
    }

    componentDidUpdate() {
        const {
            getShopsInProgress, getShopsHasError, getShopsCompleted 
        } = this.props.clothes;

        if(!getShopsInProgress && !getShopsHasError && getShopsCompleted){
            console.log("fetching shop is done...");
            this.props.getShopsReset();
        }
        else if(!getShopsInProgress && getShopsHasError && getShopsCompleted){
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
                        onRegionChangeComplete={(region) => this.setState({ region })}
                    />
                </View>
                <View style={styles.listLayout}>
                    <FlatList
                        data={shopList}
                        keyExtractor={(item, index) => item.name + "-" + index}
                        renderItem={({ item, index }) => this.renderShopListItem(item, index)}
                        ListEmptyComponent={() => this.renderEmptyListItem()}
                    />
                </View>
            </Container>
        );
    }
    
    renderShopListItem(item, index) {
        return (
            <View>
                <Text>{item.name}</Text>
            </View>
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
        tryGetShops: () => dispatch(tryGetShops()),
        getShopsReset: () => dispatch(getShopsReset())
    }
}

const mapStateToProps = state => ({
    clothes: state.clothes
});

export default connect(mapStateToProps, bindAction)(Clothes);