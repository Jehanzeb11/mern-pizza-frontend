import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, uri } from "./api";
import { toast } from "react-toastify";

const initialState = {
    ordersList: [],
    loading: false
}


export const getOrders = createAsyncThunk("get/Orders", async () => {
    try {
        const { data } = await axios.get(`${uri}/new/orders`, setHeaders())
        return data
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data.message)
    }
})






export const editOrders = createAsyncThunk("edit/Orders", async (values, { getState }) => {
    const state = getState()

    let currentOrder = state.order.ordersList.filter((order) => order._id === values.id)

    const newOrder = {
        ...currentOrder[0],
        delivery_status: values.delivery_status
    }


    try {
        const { data } = await axios.put(`${uri}/order/${values.id}`, newOrder, setHeaders())

        console.log(data)
        console.log(values)

        return data
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data.message)
    }
})


const orderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: {
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getOrders.fulfilled]: (state, action) => {
            state.loading = false
            state.ordersList = action.payload
        },
        [getOrders.rejected]: (state) => {
            state.loading = false
            state.error = true
        },



        // edit order 




        [editOrders.pending]: (state) => {
            state.loading = true
        },
        [editOrders.fulfilled]: (state, action) => {
            state.loading = false
            const updatedOrders = state.ordersList.map((order) => {
              return  order._id === action.payload._id ? action.payload : order
            })

            state.ordersList = updatedOrders
        },
        [editOrders.rejected]: (state) => {
            state.loading = false
            state.error = true
        },


    }
})

export default orderSlice.reducer