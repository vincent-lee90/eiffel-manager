import { createRouter, createWebHashHistory } from "vue-router"
import TeamReward from "@/pages/TeamReward.vue"
import Hashrate from "@/pages/Hashrate.vue"
import GameLog from "@/pages/GameLog.vue"
import Relation from "@/pages/Relations.vue"
import TeamMembers from "./pages/TeamMembers.vue"
import TempAmount from "./pages/TempAmount.vue"
import Login from "./pages/Login.vue"
const routes = [
    {
        path: "/", redirect: { name: 'login' }
    }, {
        path: "/login", component: Login, name: "login"
    }, {
        path: "/teamReward", component: TeamReward, name: "team.reward"
    }, {
        path: "/gameLog", component: GameLog, name: "game.log"
    }, {
        path: "/hashrate", component: Hashrate, name: "hashrate"
    }, {
        path: "/relation", component: Relation, name: "relation"
    }, {
        path: "/teamMembers", component: TeamMembers, name: "team.members"
    }, {
        path: "/tempAmount", component: TempAmount, name: "temp.amount"
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})