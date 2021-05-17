import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dashboard, Place } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";
import { COLORS } from './constants';
import { useFonts } from 'expo-font';


const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    RobotoBlack: require('./assets/fonts/Roboto-Black.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={COLORS.black} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Dashboard'}
      >
        <Stack.Screen
          name="Dashboard"
          component={Tabs}
        />

        <Stack.Screen
          name="Place"
          component={Place}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;