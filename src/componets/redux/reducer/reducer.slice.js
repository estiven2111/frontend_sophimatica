import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    actividades: [],
}

export const actividadesSlice = createSlice({
    name:'actividades',
    initialState,
    reducers: {
        getactividad(state,action){
            return{
                ...state,
                actividades:action.payload
            }
        }
    }
})

export const actividad = () =>{
    return async (dispatch) =>{
        const datos = (await axios.get(`http://localhost:3002/property`)).data;
        await dispatch(getactividad(datos))
    }
}

export const {getactividad} = actividadesSlice.actions
export default actividadesSlice.reducer