import {createSlice} from '@reduxjs/toolkit'


const initialState =
{
  user:null,
  token:null
}


export const slice = createSlice(
  {
    name:"verify",
    initialState,
    reducers:{
      setLogin:(state,action)=>{
        state.user = action.payload.user;
        state.token=action.payload.token
      },
      setLogout:(state,action)=>{
        state.user=null;
        state.token=null
      }
    }
  }
)
export const {setLogin,setLogout} = slice.actions;
export default slice.reducer;