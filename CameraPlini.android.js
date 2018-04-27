import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';

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

import CameraDetails from './native-camera-details'

type
Props = {};
const actualPlatform = Platform.OS;

class CameraPliniAndroid extends Component {

    constructor(){
        super();
        this.state={name:"Yolo", cameraId:{}, cameraDetails:""}
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
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={true}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 10}}> SNAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.startRecord.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 10}}> Film </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.stopRecord.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 10}}> Stop Film </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.getCharacs.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 10}}> Get characs </Text>
                    </TouchableOpacity>
                </View>
            </View>
            /*
                        <View>
                            <Text>
                                We will set the navigation bar color! {this.state.name}
                            </Text>
                            <Text>
                                cameras id: {JSON.stringify(this.state.cameraId)}
                            </Text>
                            <Text>
                                {this.state.cameraDetails}
                            </Text>
                        </View>
            */

        );
    }

    getCharacs = async function () {
        if (this.camera) {
            let characs = await this.camera.getSupportedRatiosAsync();
            ToastAndroid.show(JSON.stringify(characs), ToastAndroid.SHORT);
        }
    }

    takePicture = async function () {
        if (this.camera) {
            const options = {quality: 1, base64: true};
            const data = await this.camera.takePictureAsync(options)
            CameraRoll.saveToCameraRoll(data.uri)
            console.log(data.uri);
        }
    };

    startRecord = async function () {
        if (this.camera) {
            const options = {quality: RNCamera.Constants.VideoQuality["1080p"], mute: true, ratio: "3:2"}
            const data = await this.camera.recordAsync(options)
            CameraRoll.saveToCameraRoll(data.uri)
            console.log(data.uri);
        }
    };

    stopRecord = async function () {
        if (this.camera) {
            this.camera.stopRecording()
        }
    };
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

export const CameraPlini = new CameraPliniAndroid();