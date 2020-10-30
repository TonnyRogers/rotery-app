import React from 'react';

export const navigationRef = React.createRef() as any;

export function navigate(name: string, params: any = {}) {
  navigationRef.current?.navigate(name, params);
}

// let navigator;

// const setTopLevelNavigator = (navigatorRef) => {
//   navigator = navigatorRef;
// };

// const navigate = (routeName, params) => {
//   navigator.dispatch(
//     NavigationActions.navigate({
//       routeName,
//       params,
//     }),
//   );
// };
