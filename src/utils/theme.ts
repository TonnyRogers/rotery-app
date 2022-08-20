export const theme = {
  colors: {
    white: '#FFF',
    appBackground: '#f7f7f7',
    appBackgroundDarker: '#ebebeb',
    green: '#3dc77b',
    greenTransparent: 'rgba(61, 199, 123, 0.2)',
    blue: '#4885fd',
    blueTransparent: 'rgba(72, 133, 253, 0.2)',
    blueDark: '#3e44c7',
    red: '#f57373',
    redTransparent: 'rgba(245, 115, 115, 0.2)',
    orange: '#f5ca73',
    orangeTransparent: 'rgba(245, 202, 115, 0.2)',
    yellow: '#f5df73',
    yellowTransparent: 'rgba(245, 223, 115, 0.2)',
    disabled: '#ECECEC',
    primaryText: '#262626',
    secondaryText: '#7a7a7a',
    disabledText: '#BEBEBE',
    darketText: '#0D0D0D',
    borderBottom: '#cfcfcf',
    transparent: 'transparent',
  },
  textSize: {},
  textWeight: {
    bold: 'font-weight: 700;',
    regular: 'font-weight: 600;',
    light: '',
  },
};

export type ColorsType =
  | 'white'
  | 'appBackground'
  | 'appBackgroundDarker'
  | 'green'
  | 'greenTransparent'
  | 'blue'
  | 'blueTransparent'
  | 'blueDark'
  | 'red'
  | 'redTransparent'
  | 'orange'
  | 'orangeTransparent'
  | 'yellow'
  | 'yellowTransparent'
  | 'disabled'
  | 'primaryText'
  | 'secondaryText'
  | 'disabledText'
  | 'darketText'
  | 'transparent'
  | 'borderBottom';
