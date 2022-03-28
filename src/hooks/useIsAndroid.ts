import {Platform} from 'react-native';

export const useIsAndroid = () => {
  const isAndroid = Platform.OS === 'android';
  const isIOs = Platform.OS === 'ios';
  const platformName = Platform.OS;

  return {isAndroid, isIOs, platformName};
};
