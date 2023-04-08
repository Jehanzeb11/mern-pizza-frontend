import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { uri, setHeaders } from "./api";

const initialState = {
    items: [],
    loading: false,
    error: false
}


export const getProducts = createAsyncThunk("get/products", async () => {
    try {
        const { data } = await axios.get(`${uri}/products`)

        return data
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data.message)
    }
})





export const deleteProduct = createAsyncThunk("delete/product", async (id) => {
    try {
        const { data } = await axios.delete(`${uri}/products/${id}`,setHeaders())
toast.error("Product Deleted Successfully")
        return data
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data.message)
    }
})






export const createProducts = createAsyncThunk("create/products", async (values) => {
    try {
        const { data } = await axios.post(`${uri}/products`, values, setHeaders())

        if (data) {
            toast.success("Product Successfully created")
        }
        console.log(data)
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data.message)
        toast.error(error.response?.data)
    }
})





export const editProducts = createAsyncThunk("edit/products", async (values) => {
    try {
        const { data } = await axios.put(`${uri}/products/${values.product._id}`, values, setHeaders())

        if (data) {
            toast.info("Product Edited")
        }
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data.message)
        toast.error(error.response?.data)
    }
})



const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.loading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.items = action.payload
        },
        [getProducts.rejected]: (state, action) => {
            state.loading = false
            state.error = true
        },





        // create products


        [createProducts.pending]: (state, action) => {
            state.loading = true
        },
        [createProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.items.push(action.payload)
            location.reload()
        },
        [createProducts.rejected]: (state, action) => {
            state.loading = false
            state.error = true
        },






            // delete products


            [deleteProduct.pending]: (state) => {
                state.loading = true
            },
            [deleteProduct.fulfilled]: (state, action) => {
                state.loading = false
                
                const newList = state.items.filter((e)=> e._id !== action.payload._id)
                state.items = newList
                
            },
            [deleteProduct.rejected]: (state) => {
                state.loading = false
                state.error = true
            },









            
            // edit products


            [editProducts.pending]: (state) => {
                state.loading = true
            },
            [editProducts.fulfilled]: (state, action) => {
                state.loading = false
const updatedProduct = state.items?.map((product)=>(
  product._id === action.payload._id ? action.payload : product
))
state.items = updatedProduct    
            },
            [editProducts.rejected]: (state) => {
                state.loading = false
                state.error = true
            },



    }
})


export default productSlice.reducer