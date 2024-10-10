import { Match } from "@/models/match"
import { api } from "./api"
type MatchProps = {
    match: Match
}

export async function GetMatch(){
    const response = await api.get<MatchProps>("/match")
    return response.data.match
} 
export async function GetMatchUsingDiffId(id: string){
    const response = await api.get<MatchProps>(`/match/${id}`)
    return response.data.match
} 