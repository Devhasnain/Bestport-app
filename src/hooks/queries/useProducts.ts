import { ProductsListParams } from "@/types/Product.types";
import { productService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/api";

import { useDebounce } from "../useDebounce";


export const useProducts = (params: ProductsListParams) => {
    const debouncedSearch = useDebounce(params?.search, 400);

    return useQuery({
        queryKey: QUERY_KEYS.PRODUCTS_LIST(params),
        queryFn: () => productService.getList({
            page:params.page,
            limit:params.limit,
            ...(debouncedSearch ? { search: debouncedSearch } : {})
        })
    })
}

export const useProductById=(id:string)=>{
    return useQuery({
        queryKey:QUERY_KEYS.PRODUCTS_DETAIL(id),
        queryFn:()=>productService.getById(id)
    })
}