import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 10,
    image: require('../assets/img1.jpeg'),
  },
  {
    id: '2',
    name: 'Product 2',
    price: 20,
    image: require('../assets/img2.jpeg'),
  },
  {
    id: '3',
    name: 'Product 3',
    price: 15,
    image: require('../assets/img3.jpeg'),
  },
  {
    id: '4',
    name: 'Product 4',
    price: 30,
    image: require('../assets/img1.jpeg'),
  },
  {
    id: '5',
    name: 'Product 2',
    price: 20,
    image: require('../assets/img2.jpeg'),
  },
  {
    id: '6',
    name: 'Product 3',
    price: 15,
    image: require('../assets/img3.jpeg'),
  },
  {
    id: '7',
    name: 'Product 2',
    price: 20,
    image: require('../assets/img2.jpeg'),
  },
  {
    id: '8',
    name: 'Product 3',
    price: 15,
    image: require('../assets/img3.jpeg'),
  },
];

const productCategories = [
  {id: '1', name: 'Category 1', products: products.slice(0, 3)},
  {id: '2', name: 'Category 2', products: products.slice(2, 6)},
  {id: '3', name: 'Category 3', products: products.slice(3, 8)},
];

const ProductListScreen = ({navigation, cart, setCart}) => {
  const addToCart = product => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      );
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
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

      {/* Categories & Products */}
      <FlatList
        data={productCategories}
        keyExtractor={category => category.id}
        renderItem={({item: category}) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <FlatList
              data={category.products}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={styles.productCard}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductDetail', {products: item})
                    }>
                    <Image source={item.image} style={styles.productImage} />
                  </TouchableOpacity>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => addToCart(item)}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
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
  categoryContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginRight: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    overflow: 'hidden',
    width: 160,
    marginBottom: 20, // Space from the bottom of the card
    padding: 10, // Added padding around the card
  },
  productImageContainer: {
    backgroundColor: '#f9f9f9', // Light background around the image
    borderRadius: 10,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 120, // Adjusted height for better aspect ratio
    resizeMode: 'contain', // Ensure the image doesn't stretch
    borderRadius: 10,
  },
  productInfo: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
  },
  addToCartButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 5,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});


export default ProductListScreen;
