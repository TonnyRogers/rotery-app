import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import NewItinerary from '../screens/NewItinerary';
import Itineraries from '../screens/Itineraries';
import ItineraryDetails from '../screens/ItineraryDetails';
import SplashScreen from '../components/SplashScreen';

interface RoutesProps {
  (arg: {isSigned: boolean}): any;
}

const Routes = () => {
  const {signed, loading} = useSelector((state) => state.auth);

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
            <Stack.Screen name="NewItinerary" component={NewItinerary} />
            <Stack.Screen name="Itineraries" component={Itineraries} />
            <Stack.Screen
              name="ItineraryDetails"
              component={ItineraryDetails}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
      <SplashScreen visible={loading} />
    </NavigationContainer>
  );
};

export default Routes;
