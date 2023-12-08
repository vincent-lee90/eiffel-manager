import { createRouter, createWebHashHistory } from "vue-router"
import TeamReward from "@/pages/TeamReward.vue"
import Hashrate from "@/pages/Hashrate.vue"
import GameLog from "@/pages/GameLog.vue"
const routes = [
    {
        path: "/", redirect: { name: 'team.reward' }
    }, {
        path: "/teamReward", component: TeamReward, name: "team.reward"
    }, {
        path: "/gameLog", component: GameLog, name: "game.log"
    }, {
        path: "/hashrate", component: Hashrate, name: "hashrate"
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})