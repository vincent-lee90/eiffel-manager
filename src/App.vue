

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <div class="text-white py-8 text-center text-xl">
        Eiffel管理
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @click="changePage">
        <a-menu-item key="team.reward">
          <span>团队奖励查询</span>
        </a-menu-item>
        <a-menu-item key="hashrate">
          <span>算力设置</span>
        </a-menu-item>
        <a-menu-item key="game.log">
          <span>游戏日志</span>
        </a-menu-item>
        <a-menu-item key="relation">
          <span>邀请查询</span>
        </a-menu-item>
        <a-menu-item key="team.members">
          <span>团队成员查询</span>
        </a-menu-item>
        <a-menu-item key="temp.amount">
          <span>流水查询</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="text-right px-8 text-sky-500">
          <ConnectWallet />
        </div>
      </a-layout-header>
      <a-layout-content class="p-8">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router"
const router = useRouter()
const selectedKeys = ref([])
const changePage = ({ key }: any) => {
  router.push({ name: key })
}
</script>
<style scoped></style>
