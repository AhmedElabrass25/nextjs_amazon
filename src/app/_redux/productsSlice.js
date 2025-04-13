"use client";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  allProducts: [],
  cart: [],
  favoriteProducts: [],
  selectProduct: {},
  isLoading: false,
  isError: null,
};
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios(
        "https://fakestoreapiserver.reactbd.com/tech"
      );
      console.log(data);
      localStorage.setItem("amazonProducts", JSON.stringify(data));
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Failed to fetch products";
      });
  },
  reducers: {
    getProductDetails: (state, action) => {
      const id = action.payload;
      state.selectProduct = state.allProducts.find(
        (product) => product._id == id
      );
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify(state.selectProduct)
      );
    },
    setProductToCart: (state, action) => {
      const id = action.payload;

      const isFavorite = state.favoriteProducts.some((pro) => pro._id === id);
      if (isFavorite) {
        state.favoriteProducts = state.favoriteProducts.filter(
          (item) => item._id !== id
        );
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(state.favoriteProducts)
        );
      }

      const product = state.allProducts.find((product) => product._id == id);
      const alreadyInCart = state.cart.some((item) => item._id === id);
      if (product && !alreadyInCart) {
        const productWithQty = { ...product, quantity: 1 };
        state.cart = [...state.cart, productWithQty];
        localStorage.setItem("amazonCart", JSON.stringify(state.cart));
      }
    },
    increaseProductQuantity: (state, action) => {
      let theProduct = action.payload;
      let specificProduct = state.cart.findIndex(
        (pro) => pro._id === theProduct._id
      );
      state.cart[specificProduct].quantity += 1;
      localStorage.setItem("amazonCart", JSON.stringify(state.cart));
    },
    decreaseProductQuantity: (state, action) => {
      let theProduct = action.payload;
      let specificProduct = state.cart.findIndex(
        (pro) => pro._id === theProduct._id
      );
      if (specificProduct !== -1) {
        if (state.cart[specificProduct].quantity > 1) {
          state.cart[specificProduct].quantity -= 1;
        } else {
          state.cart = state.cart.filter((pro) => pro._id !== theProduct._id);
        }
        localStorage.setItem("amazonCart", JSON.stringify(state.cart));
      }
    },
    removeProductCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((pro) => pro._id !== productId);
      localStorage.setItem("amazonCart", JSON.stringify(state.cart));
    },
    setFavoriteProduct: (state, action) => {
      const id = action.payload;
      const product = state.allProducts.find((product) => product._id === id);
      const isFavorite = state.favoriteProducts.some((item) => item._id === id);
      if (isFavorite) {
        state.favoriteProducts = state.favoriteProducts.filter(
          (item) => item._id !== id
        );
        state.favoriteProducts = [...state.favoriteProducts];
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(state.favoriteProducts)
        );
        toast.error("Product deleted from favorite");
      } else {
        state.favoriteProducts = [...state.favoriteProducts, product];
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(state.favoriteProducts)
        );
        toast.success("Product added to favorite");
      }
    },
    removeFromFavorite: (state, action) => {
      const id = action.payload;
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product._id !== id
      );
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(state.favoriteProducts)
      );
    },
    getInitialData: (state) => {
      const allProducts = localStorage.getItem("amazonProducts");
      const selectedProduct = localStorage.getItem("selectedProduct");
      const storedCart = localStorage.getItem("amazonCart");
      const favotiteProducts = localStorage.getItem("favoriteProducts");
      state.cart = storedCart ? JSON.parse(storedCart) : [];
      state.favoriteProducts = favotiteProducts
        ? JSON.parse(favotiteProducts)
        : [];
      state.allProducts = allProducts ? JSON.parse(allProducts) : [];
      state.selectProduct = selectedProduct ? JSON.parse(selectedProduct) : [];
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("amazonCart", JSON.stringify([])); // لو بتخزن في localStorage
    },
    // =================================
  },
});
export const productsReducer = productsSlice.reducer;
export const {
  getProductDetails,
  setProductToCart,
  getInitialData,
  setFavoriteProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductCart,
  removeFromFavorite,
  clearCart,
} = productsSlice.actions;
