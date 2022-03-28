import {Vibration} from 'react-native';

export function useVibration() {
  function click() {
    return Vibration.vibrate([0, 50]);
  }

  function alternated() {
    return Vibration.vibrate([0, 100, 100, 100]);
  }

  return {click, alternated};
}
