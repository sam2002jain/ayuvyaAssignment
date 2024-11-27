import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ProductDetailScreen = ({route, cart, setCart, navigation}) => {
  const {products} = route.params;

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === products.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === products.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      );
    } else {
      setCart([...cart, {...products, quantity: 1}]);
    }
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Ayuvya Ayurveda</Text>
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../assets/shopping-cart.png')}
            style={styles.cartIcon}
          />
          {cartQuantity > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartQuantity}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.productCard}>
        <View style={styles.productImageContainer}>
          <Image source={products.image} style={styles.productImage} />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.title}>{products.name}</Text>
          <Text style={styles.price}>${products.price}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  cartContainer: {
    position: 'relative',
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  cartBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    margin: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  productImageContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  productInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4CAF50',
  },
  addToCartButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FF6F61', // Updated solid color
    marginHorizontal: 50,
    marginTop: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
