import { api } from "./api";

type LoginRequest = {
    username: String
    password: String
};

type LoginResponse = {
    token: String
};

export async function Login(params: LoginRequest){
    const response = await api.post<LoginResponse>("/login", params)
    return response.data.token
}

