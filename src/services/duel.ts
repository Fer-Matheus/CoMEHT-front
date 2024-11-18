import { Result } from "@/models/result";
import { api } from "./api";
import { Duel } from "@/models/duel";

type DuelResponse = {
    duel: Duel
};

export async function GetDuel(){
    const response = await api.get<Duel>("/duels")
    return response.data
}

export async function SendResults(resultRequest: Result){
    const response = await api.post("/results", resultRequest)
    return response
}