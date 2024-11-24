import { Result } from "@/models/result";
import { api } from "./api";
import { Duel } from "@/models/duel";


export async function GetDuel(){
    const response = await api.get<Duel>("/duels")
    return response
}

export async function SendResults(resultRequest: Result){
    const response = await api.post("/results", resultRequest)
    return response
}