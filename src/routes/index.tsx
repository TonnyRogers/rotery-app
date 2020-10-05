import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {navigationRef} from '../RootNavigation';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Favorites from '../screens/Favorites';
import Feed from '../screens/Feed';
import FeedItineraryDetails from '../screens/FeedItineraryDetails';
import Profile from '../screens/Profile';
import NewItinerary from '../screens/NewItinerary';
import MyItineraries from '../screens/MyItineraries';
import MyItineraryDetails from '../screens/MyItineraryDetails';
import NextItineraries from '../screens/NextItineraries';
import NextItineraryDetails from '../screens/NextItineraryDetails';
import EditItinerary from '../screens/EditItinerary';
import UserDetails from '../screens/UserDetails';
import SearchUsers from '../screens/SearchUsers';
import MyConnections from '../screens/MyConnections';
import SplashScreen from '../components/SplashScreen';

import {RootStateProps} from '../store/modules/rootReducer';
interface RoutesProps {
  (arg: {isSigned: boolean}): any;
}

function ConnectionNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        adaptive: true,
        activeTintColor: '#3dc77b',
        labelStyle: {
          fontFamily: 'Roboto',
        },
        labelPosition: 'beside-icon',
      }}>
      <Tab.Screen
        name="MyConnections"
        component={MyConnections}
        options={{
          title: 'Conexões',
          tabBarIcon: ({color, size}) => (
            <Icon name="link-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchUsers"
        component={SearchUsers}
        options={{
          title: 'Pesquisar',
          tabBarIcon: ({color, size}) => (
            <Icon name="magnify" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Routes = () => {
  const {signed, loading} = useSelector((state: RootStateProps) => state.auth);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={signed ? 'Feed' : 'Home'}>
        {signed ? (
          <>
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen
              name="FeedItineraryDetails"
              component={FeedItineraryDetails}
            />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="NewItinerary" component={NewItinerary} />
            <Stack.Screen name="MyItineraries" component={MyItineraries} />
            <Stack.Screen name="NextItineraries" component={NextItineraries} />
            <Stack.Screen
              name="NextItineraryDetails"
              component={NextItineraryDetails}
            />
            <Stack.Screen
              name="MyItineraryDetails"
              component={MyItineraryDetails}
            />
            <Stack.Screen name="EditItinerary" component={EditItinerary} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="Connections" component={ConnectionNavigator} />
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
