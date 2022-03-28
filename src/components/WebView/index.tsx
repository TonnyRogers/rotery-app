/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {WebView as RNWebView, WebViewMessageEvent} from 'react-native-webview';
import BottomSheet from '../BottomSheet';
import {Platform} from 'react-native';

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
  const source: any = {};

  if (url) {
    source.uri = url;
  }

  if (injectHtml) {
    source.html = injectHtml;
  }

  return (
    <BottomSheet
      title={title || ''}
      visible={visible}
      onRequestClose={onRequestClose}>
      <RNWebView
        source={source}
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
        injectedJavaScript={injectScript}
        onMessage={(event) => onMessageCallback && onMessageCallback(event)}
      />
    </BottomSheet>
  );
};

export default WebView;
