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

import { connect } from "react-redux";

class SignIn extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Button>
                        <Text>Click Me!</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {

    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, bindAction)(SignIn);