export const theme = {
  colors: {
    white: '#FFF',
    appBackground: '#f9f9f9',
    appBackgroundDarker: '#ebebeb',
    green: '#3dc77b',
    greenTransparent: 'rgba(61, 199, 123, 0.2)',
    blue: '#4885fd',
    blueTransparent: 'rgba(72, 133, 253, 0.2)',
    blueDark: '#3e44c7',
    red: '#f57373',
    orange: '#f5ca73',
    yellow: '#f5df73',
    disabled: '#ECECEC',
    primaryText: '#262626',
    secondaryText: '#7a7a7a',
    disabledText: '#BEBEBE',
    darketText: '#0D0D0D',
    borderBottom: '#cfcfcf',
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
  | 'orange'
  | 'yellow'
  | 'disabled'
  | 'primaryText'
  | 'secondaryText'
  | 'disabledText'
  | 'darketText'
  | 'borderBottom';
