import React, { Component } from "react";
import {
    View, FlatList
} from "react-native";

import {
    Container,
    Content,
    Button,
    Text
} from 'native-base';

import { connect } from "react-redux";

class ShopDetail extends Component {
    static navigatorStyle = {
        navBarHidden: true,
    };

    render() {
        const { shopId } = this.props;
        const clothList = this.props.clothes.shopeList[shopId];

        return (
            <Container>
                <Content>
                    <FlatList
                        data={clothList}
                        keyExtractor={(item, index) => item.id + "-" + index}
                        renderItem={({ item, index }) => this.renderShopListItem(item, index)}
                        ListEmptyComponent={() => this.renderEmptyListItem()}
                    />
                </Content>
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
    }
}

const mapStateToProps = state => ({
    clothes: state.clothes
});

export default connect(mapStateToProps, bindAction)(ShopDetail);
