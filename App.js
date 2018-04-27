import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import CameraDetails from './native-camera-details'

import {
    Platform,
    StyleSheet,
    Text,
    AppRegistry,
    Dimensions,
    TouchableOpacity,
    View,
    CameraRoll,
    ToastAndroid
} from 'react-native';

export default class App extends Component {
    constructor(){
        super();
        this.state={cameraId:{}, cameraDetails:""}
    }

    componentWillMount() {
        CameraDetails.getCameras((msg) => {
            this.setState({cameraId:msg})
        })
        CameraDetails.getCameraDetails("0", (msg) => {
            this.setState({cameraDetails:msg})
        })
    }
    render() {
        return (
            <View>
                <Text>
                    cameras id: {JSON.stringify(this.state.cameraId)}
                </Text>
                <Text>
                    {this.state.cameraDetails}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }
});
