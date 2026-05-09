import { ProductsListParams } from "../types";
import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosService";


export const productService = {
    getList:async (params:ProductsListParams)=>{
        const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.LIST(params))
        return response.data
    },
    getById:async (id:string)=>{
        const response = await axiosInstance.get(API_ENDPOINTS.PRODUCTS.GET(id))
        return response.data
    }
}