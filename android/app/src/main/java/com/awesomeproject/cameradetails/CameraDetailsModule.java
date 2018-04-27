package com.awesomeproject.cameradetails;

import android.app.Activity;
import android.content.Context;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.util.Range;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;

import java.util.Arrays;

public class CameraDetailsModule extends ReactContextBaseJavaModule {
    public CameraDetailsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName(){
        return "CameraDetails";
    }

    @ReactMethod
    public void getCameraDetails(String cameraId, Callback successCallback) throws CameraAccessException {
        final Activity activity = getCurrentActivity();
        CameraManager cm = (CameraManager) activity.getSystemService(Context.CAMERA_SERVICE);
        CameraCharacteristics cc = cm.getCameraCharacteristics(cameraId);
        String characs="";

        //LENS_FACING
        String direction="";
        switch(cc.get(CameraCharacteristics.LENS_FACING)) {
            case CameraCharacteristics.LENS_FACING_FRONT:
                direction="FRONT"; break;
            case CameraCharacteristics.LENS_FACING_BACK:
                direction="BACK"; break;
            case CameraCharacteristics.LENS_FACING_EXTERNAL:
                direction="EXTERNAL"; break;
        }
        characs+="LENS_FACING : " + direction + "\n";

        //SENSOR_INFO_PHYSICAL_SIZE
        characs+="SENSOR_INFO_PHYSICAL_SIZE | HEIGHT : " + cc.get(CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE).getHeight()+ "\n";
        characs+="SENSOR_INFO_PHYSICAL_SIZE | WIDTH : " + cc.get(CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE).getWidth()+ "\n";

        //SENSOR_INFO_PIXEL_ARRAY_SIZE
        characs+="SENSOR_INFO_PHYSICAL_SIZE | HEIGHT : " + cc.get(CameraCharacteristics.SENSOR_INFO_PIXEL_ARRAY_SIZE).getHeight()+ "\n";
        characs+="SENSOR_INFO_PHYSICAL_SIZE | WIDTH : " + cc.get(CameraCharacteristics.SENSOR_INFO_PIXEL_ARRAY_SIZE).getWidth()+ "\n";

        //SENSOR_INFO_PIXEL_ARRAY_SIZE
        characs+="PIXEL SIZE | HEIGHT : " + cc.get(CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE).getHeight()/cc.get(CameraCharacteristics.SENSOR_INFO_PIXEL_ARRAY_SIZE).getHeight()*1000+ "μm\n";
        characs+="PIXEL SIZE | WIDTH : " + cc.get(CameraCharacteristics.SENSOR_INFO_PHYSICAL_SIZE).getWidth()/cc.get(CameraCharacteristics.SENSOR_INFO_PIXEL_ARRAY_SIZE).getWidth()*1000+ "μm\n";

        //REQUEST_AVAILABLE_CAPABILITIES
        try {
            characs += "REQUEST_AVAILABLE_CAPABILITIES | RAW : " + cc.get(CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES)[CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES_RAW] + "\n";
        }
        catch(Exception e){
            characs += "REQUEST_AVAILABLE_CAPABILITIES | RAW : NOT AVAILABLE\n";
        }

        Range<Integer>[] YOLOFDP = cc.get(CameraCharacteristics.CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES);
        characs+= "CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES : " + Arrays.toString(YOLOFDP)+"\n";
        //characs+= "CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES | LOWER : " + cc.get(CameraCharacteristics.CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES).getLower() +"\n";
        //characs+= "CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES | UPPER : " + cc.get(CameraCharacteristics.CONTROL_AE_AVAILABLE_TARGET_FPS_RANGES) +"\n";
        successCallback.invoke(characs);
    }

    @ReactMethod
    public void getCameras (Callback successCallback) throws CameraAccessException {
        final Activity activity = getCurrentActivity();
        CameraManager cm = (CameraManager) activity.getSystemService(Context.CAMERA_SERVICE);
        String[] details = cm.getCameraIdList();
        String result="";
        for(String s : details){
            result+=s+" | ";
        }
        successCallback.invoke(result);
    }
}