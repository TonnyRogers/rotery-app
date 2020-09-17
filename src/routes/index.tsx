import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';

interface RoutesProps {
  (arg: {isSigned: boolean}): any;
}

const Routes = () => {
  const {signed} = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={signed ? 'Dashboard' : 'Home'}>
        {signed ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
