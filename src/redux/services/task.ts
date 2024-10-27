import splitApi from "./api";

const taskApi=splitApi.injectEndpoints({
    endpoints:builder=>({
        getAllTasks:builder.query({
            query:()=>'/'
            
        }),
        addTask:builder.mutation({
            query(data){
                return{
                    url:"add",
                    method:"POST",
                    body:data
                }
            }
        }),
        editTask:builder.mutation({
            query({id,data}){
                return{
                    url:`${id}`,
                    method:"PUT",
                    body:data
                }
            }
        }),
        deleteTask:builder.mutation({
            query({id}){
                return{
                    url:`${id}`,
                    method:"DELETE"
                }
            }
        })
    })
})

export const {
    useGetAllTasksQuery,
    useAddTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
}=taskApi