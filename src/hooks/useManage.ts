import axios from "@/axios/index"
import Urls from "@/presets/urls"
interface ApiResponse {
    isSuccessful: boolean
    data: any
    message: any
}
export const useQueryTeamReward = async (pageIndex: number, pageSize: number): Promise<ApiResponse> => {
    const res = await axios.get(Urls.teamRewards, { params: { pageIndex, pageSize } })
    return (res as unknown as ApiResponse)
}
export const useSetHashrate = async (address: string, hashrate: string) => {
    const res = await axios.post(Urls.setHashrate, { address, hashrate })
    return (res as unknown as ApiResponse)
}
export const useGetGameLog = async (address: string) => {
    const res = await axios.get(Urls.gameLogs, { params: { address } })
    return (res as unknown as ApiResponse)
}
export const useGetStatistics = async (address: string) => {
    const res = await axios.get(Urls.statistics, { params: { address } })
    return (res as unknown as ApiResponse)
}
export const useGetRelation = async (address: string) => {
    const res = await axios.get(Urls.relation, { params: { address } })
    return (res as unknown as ApiResponse)
}
export const useGetTeam = async (address: string) => {
    const res = await axios.get(Urls.team, { params: { address } })
    return (res as unknown as ApiResponse)
}