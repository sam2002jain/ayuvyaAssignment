import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useCart} from '../context/cartContext';
import CartSVG from '../assets/cartIcon.svg'; // Replace this SVG with your custom one

const CartIcon = ({navigation}) => {
  const {state} = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.container}>
      <CartSVG width={24} height={24} />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {marginRight: 15},
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {color: 'white', fontSize: 12},
});

export default CartIcon;
