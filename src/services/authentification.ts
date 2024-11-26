import { api } from "./api";

type LoginRequest = {
    username: String
    password: String
};

type LoginResponse = {
    token: String
};

export async function LoginUser(params: LoginRequest){
    const response = await api.post<LoginResponse>("/login", params)
    return response.data.token
}

export async function Register(params: LoginRequest){
    const response = await api.post("/register", params)
    return response.data.token
}

