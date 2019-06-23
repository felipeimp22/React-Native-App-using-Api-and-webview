import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import api from "../services/api";

export default class Main extends Component {
  static navigationOptions = {
    title: "Task Manager"
  };
  state = {
    productInfo: {},
    docs: [],
    page: 1
  };
  componentDidMount() {
    this.loadProducts();
  }
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...producInfo } = response.data;
    this.setState({ docs: [...this.state.docs, ...docs], producInfo, page });
  };
  loadNext = () => {
    const { page, producInfo } = this.state;
    if (page === producInfo.pages) return;
    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}> {item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate("Product", { product: item });
        }}
      >
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadNext}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  list: {
    padding: 20
  },
  productContainer: {
    backgroundColor: "#f7f4f4",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#e5dede",
    borderRadius: 15,
    padding: 15
  },
  productTitle: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 20
  },
  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 22
  },
  productButton: {
    borderWidth: 2,
    borderRadius: 40,
    height: 40,
    padding: 8,
    borderColor: "#DA552F",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  productButtonText: {
    fontSize: 17,
    color: "#DA552F",
    fontWeight: "bold"
  }
});
