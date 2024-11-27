import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

const CartScreen = ({cart, setCart}) => {
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart
      .map(item =>
        item.id === productId
          ? {...item, quantity: Math.max(0, parseInt(quantity) || 0)}
          : item,
      )
      .filter(item => item.quantity > 0); // Remove items with quantity 0

    setCart(updatedCart);
  };

  const handleBuy = () => {
    Alert.alert('Success', 'Your order has been placed successfully!');
  };

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="number-pad"
                    value={String(item.quantity)}
                    onChangeText={text => updateQuantity(item.id, text)}
                  />
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.totalPrice}>
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty!</Text>
      )}

      {cart.length > 0 && (
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuy}>
          <Text style={styles.buyNowButtonText}>BUY NOW</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#f9f9f9',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    marginHorizontal: 10,
    fontSize: 12,
    color:'black',
    
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    color: '#666',
  },
  buyNowButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buyNowButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
