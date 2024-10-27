import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const splitApi=createApi({
    reducerPath: 'splitApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/todos/' }),
    endpoints:()=>({})
})

export default splitApi