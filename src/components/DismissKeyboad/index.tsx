import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

const DismissKeyboad = ({children}: {children: any}) => {
  return (
    <TouchableWithoutFeedback onPressOut={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboad;
