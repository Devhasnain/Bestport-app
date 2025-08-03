import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/index';


type InitialStateType = {
    products: any[] | [];
}

const initialState: InitialStateType = {
    products: []
};
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action?.payload;
        }
    },
});

export const {
    setProducts
} = productsSlice?.actions;

export const getProducts = (state: RootState) => state?.products?.products;

export default productsSlice.reducer;
