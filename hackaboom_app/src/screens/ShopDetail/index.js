import React, {Component} from "react";
import {
    View, FlatList,Image
} from "react-native";

import {
    Container,
    Content,
    Button,
    Text,Card,CardItem,Right,Left,Body,Thumbnail,Icon
} from 'native-base';

import {connect} from "react-redux";

import styles from './styles';

class ShopDetail extends Component
    {

    render()
        {
        console.log(this.props);
        const {shopId,shopName} = this.props;
        console.log('ramazan');
        console.log(this.props.clothes.shopList[shopId]);
        const clothList = this.props.clothes.shopList[shopId].clothes;

        return (
            <Container>
                <Content>
                    <FlatList
                        data={clothList}
                        keyExtractor={(item, index) => item.id + "-" + index}
                        renderItem={({item, index}) => this.renderShopListItem(item, index)}
                        ListEmptyComponent={() => this.renderEmptyListItem()}
                    />
                </Content>
            </Container>
        );
        }

    renderShopListItem(item, index)
        {
        const str = item.image.toString();
        const imageURI = {uri: str};



        const {shopName} = this.props;

        return (
            <View>
                <Card>
                    <CardItem>
                        <Left>
                            <View style={styles.roundedNameInitials}><Text style={{
                                color: "#fff",
                                fontSize: 19,
                                alignSelf: "center",
                                fontFamily: 'Poppins-Regular'
                            }}>{shopName.charAt(0).toUpperCase()}{shopName.charAt(0).toUpperCase()}</Text></View>
                            <Body>
                            <Text>{item.title}</Text>
                            <Text note>{shopName}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <Image source={imageURI} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text style={{fontSize:10}}>12 Likes</Text>
                            </Button>
                        </Left>
                        <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text style={{fontSize:10}}>4 Comments</Text>
                        </Button>
                        </Body>
                        <Right>
                            <Text style={{fontSize:10}}>11h ago</Text>
                        </Right>
                    </CardItem>
                </Card>





            </View>
        );
        }

    renderEmptyListItem()
        {
        return (
            <View>
                <Text>No item :(</Text>
            </View>
        );
        }
    }

function bindAction(dispatch)
    {
    return {}
    }

const mapStateToProps = state => ({
    clothes: state.clothes
});

export default connect(mapStateToProps, bindAction)(ShopDetail);
