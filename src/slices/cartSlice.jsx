import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((e) => e._id === action.payload._id)

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`${state.cartItems[itemIndex].name} quantity has increased by ${state.cartItems[itemIndex].cartQuantity}`)
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} has added to cart`)
            }


            localStorage.setItem("cart", JSON.stringify(state.cartItems))


        },

        removeProduct: (state, action) => {
            const item = state.cartItems.filter((e) => e._id !== action.payload._id)


            state.cartItems = item;
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} has removed from cart`)


        },
        removerCart: (state) => {
            state.cartItems = []
            localStorage.removeItem("cart")
            toast.error(`Cart has been cleared`)

        },




        decrease: (state, action) => {
            const itemIndex = state.cartItems.findIndex((e) => e._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
                toast.info(`${action.payload.name} quantity has decreased`)

            }else{
            
                const item = state.cartItems.filter((e) => e._id !== action.payload._id)
                state.cartItems = item;
                toast.error(`${action.payload.name} has removed from cart`)
            }
            
            
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
        },





        increase: (state, action) => {
            const itemIndex = state.cartItems.findIndex((e) => e._id === action.payload._id)

            if (state.cartItems[itemIndex].cartQuantity >= 1) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`${action.payload.name} quantity has decreased`)

            }
            localStorage.setItem("cart", JSON.stringify(state.cartItems))

        },

        getTotal:(state,action)=>{


            let {total} = state.cartItems.reduce((cartTotal,cartItem)=>{
const {price,cartQuantity} = cartItem;
const allTotal = price * cartQuantity

cartTotal.total += allTotal

return cartTotal

            },{
                total :0
            })
        
        

state.cartTotalAmount = total

        }


    }
})

export const { addToCart, removerCart, removeProduct , decrease , increase,getTotal} = cartSlice.actions

export default cartSlice.reducer