/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {WebView as RNWebView, WebViewMessageEvent} from 'react-native-webview';
import BottomSheet from '../BottomSheet';
import {Platform} from 'react-native';
import SplashScreen from '../SplashScreen';

interface WebViewProps {
  url?: string;
  visible: boolean;
  onRequestClose: () => void;
  onMessageCallback?: (event: WebViewMessageEvent) => void;
  /**
   * to inject javascript script the string needs
   * to return 'true;' in the end
   * @param injectScript
   */
  injectScript?: string;
  injectHtml?: string;
  title?: string;
}

const WebView = ({
  url,
  visible,
  injectScript,
  injectHtml,
  title,
  onRequestClose,
  onMessageCallback,
}: WebViewProps) => {
  return (
    <BottomSheet
      title={title || ''}
      visible={visible}
      onRequestClose={onRequestClose}>
      <RNWebView
        source={{uri: url || '', html: injectHtml || ''}}
        renderToHardwareTextureAndroid={Platform.OS === 'android'}
        style={{display: 'flex', flex: 1}}
        mixedContentMode="compatibility"
        contentMode="mobile"
        scrollEnabled
        pullToRefreshEnabled
        limitsNavigationsToAppBoundDomains
        javaScriptEnabled
        androidLayerType="hardware"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        accessible
        cacheEnabled
        injectedJavaScript={injectScript || ''}
        onMessage={(event) => onMessageCallback && onMessageCallback(event)}
        onLoad={() => <SplashScreen visible={true} />}
        onLoadStart={() => <SplashScreen visible={true} />}
      />
    </BottomSheet>
  );
};

export default WebView;
