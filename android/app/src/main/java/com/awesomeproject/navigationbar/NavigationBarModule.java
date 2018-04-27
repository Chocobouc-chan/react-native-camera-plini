package com.awesomeproject.navigationbar;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactMethod;
import android.app.Activity;
import android.view.Window;
import android.graphics.Color;

public class NavigationBarModule extends ReactContextBaseJavaModule {
    public NavigationBarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName(){
        return "NavigationBar";
    }

    @ReactMethod
    public void setColor(final String color, Callback successCallback) {
        final Activity activity = getCurrentActivity();
        final int colorInt = Color.parseColor(color);
        activity.getWindow().setNavigationBarColor(colorInt);
        successCallback.invoke("TOTO");
    }
}
