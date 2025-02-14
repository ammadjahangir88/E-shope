import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,



}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    SET_ACTIVE_USER(state,action){
        console.log(action.payload)
        const {email,userName,userID}= action.payload
        state.isLoggedIn =true;
        state.email=email;
        state.userName=userName;
        state.userID=userID;
    },
    REMOVE_ACTIVE_USER(state,action){

        state.isLoggedIn =false;
        state.email=null;
        state.userName=null;
        state.userID= null;

    }
  }
});

export const {SET_ACTIVE_USER,REMOVE_ACTIVE_USER} = AuthSlice.actions

export const selectIsLoggedIN =(state)=> state.auth.isLoggedIn
export const selectEmail =(state)=> state.auth.email
export const selectUserName =(state)=> state.auth.userName
export const selectUserID =(state)=> state.auth.userID

export default AuthSlice.reducer