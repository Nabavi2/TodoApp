import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import EditScreen from '../screens/EditScreen';
import AddNewDataScreen from '../screens/AddNewdataScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

//Stack Navigator for navigate to other page
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
      <Stack.Screen name="AddNewDataScreen" component={AddNewDataScreen} />
    </Stack.Navigator>
  );
};

//Bottom Tab navigator for navigate to other home from page bottom
