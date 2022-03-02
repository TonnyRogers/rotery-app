import React, {PropsWithChildren, useEffect, useState, useRef} from 'react';
import {
  Platform,
  Animated,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  EmitterSubscription,
} from 'react-native';
// import {useHeaderHeight} from '@react-navigation/elements';
import {useKeyboard} from '@react-native-community/hooks';

export function KeyboardShift(props: PropsWithChildren<{}>) {
  const {children} = props;
  //   const headerHeight = useHeaderHeight();
  const shift = useRef(new Animated.Value(0));
  const keyboard = useKeyboard();

  // On mount, add keyboard show and hide listeners
  // On unmount, remove them
  const [didShowListener, setDidShowListener] =
    useState<EmitterSubscription | null>();
  const [didHideListener, setDidHideListener] =
    useState<EmitterSubscription | null>();

  useEffect(() => {
    setDidShowListener(
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
    );
    setDidHideListener(
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    );
    return () => {
      if (didShowListener) {
        didShowListener.remove();
      }
      if (didHideListener) {
        didHideListener.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyboardDidShow = () => {
    const {height: windowHeight} = Dimensions.get('window');
    const keyboardHeight = keyboard.keyboardHeight;
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();

    currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(shift.current, {
        toValue: gap,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift.current, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Android: we need an animated view since the keyboard style can vary widely
  // And React Native's KeyboardAvoidingView isn't always reliable
  if (Platform.OS === 'android') {
    return (
      <Animated.View
        style={[styles.container, {transform: [{translateY: shift.current}]}]}>
        {children}
      </Animated.View>
    );
  }

  // iOS: React Native's KeyboardAvoidingView with header offset and
  // behavior 'padding' works fine on all ios devices (and keyboard types)
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-100}
      style={styles.container}
      behavior={'padding'}>
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
