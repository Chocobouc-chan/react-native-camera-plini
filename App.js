
import React, {Component} from 'react';
import {RNCamera} from 'react-native-camera';
import {render} from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

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

import {CameraPlini} from './CameraPlini.android'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={CameraPlini}/>
                </div>
            </Router>
        );
    }
}
