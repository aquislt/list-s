import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/home';
import AddItemScreen from './screens/additem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'Aqui List [S]', headerTitleStyle: { fontFamily: 'CustomFont' } }} 
            />
            <Stack.Screen 
              name="AddItem" 
              component={AddItemScreen} 
              options={{ title: 'Adicionar Item', headerTitleStyle: { fontFamily: 'CustomFont' } }} 
            />
          </>
    </NavigationContainer>
  );
}