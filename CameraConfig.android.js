import {RNCamera} from 'react-native-camera';

export const ConfigVideo = {
    quality: RNCamera.Constants.VideoQuality["1080p"],
    mute: true,
}
export const ConfigPicture = {
    quality: 1
}

export const type = RNCamera.Constants.Type.back
export const autoFocus = true
export const flashMode = RNCamera.Constants.FlashMode.off
export const ratio = "1:1"
export const permissionDialogTitle = "Permission to use camera"
export const permissionDialogMessage = "We need your permission to use your camera phone"