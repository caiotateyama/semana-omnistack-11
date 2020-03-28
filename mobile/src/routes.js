import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';


const AppStack = createStackNavigator();

import Products from './pages/Products'
import Detail from './pages/Detail'

export default function Routes() {
    return (
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Products" component={Products} />
                <AppStack.Screen name="Detail" component={Detail} />     
            </AppStack.Navigator>

        </NavigationContainer>
    );
}