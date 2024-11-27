import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, Header} from '@react-navigation/stack';

import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" options={{headerShown: false}}>
          {props => (
            <ProductListScreen {...props} cart={cart} setCart={setCart} />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProductDetail" options={{headerShown: false}}>
          {props => (
            <ProductDetailScreen {...props} cart={cart} setCart={setCart} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart" options={{headerShown: false}}>
          {props => <CartScreen {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
