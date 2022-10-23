import axios from "axios";

const apiConfig = axios.create({
    baseURL: "http://localhost:3500"
})

export const getTodos = async () => {
    const response = await apiConfig.get("/todos")
    return response.data;
}

export const addTodos = async (todo) => {
    const response = await apiConfig.post("/todos", todo)
    return response.data;
}

export const updateTodos = async (todo) => {
    const response = await apiConfig.patch(`/todos/${todo.id}`, todo)
    return response.data;
}

export const deleteTodos = async ({id}) => {
    const response = await apiConfig.delete(`/todos/${id}`, id)
    return response.data;
} 