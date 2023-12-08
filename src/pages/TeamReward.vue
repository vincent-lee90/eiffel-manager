<template>
    <div>
<!--         <div>
            <a-input-search placeholder="团队奖励查询"></a-input-search>
        </div> -->
        <div>
            <div>
                <a-table :dataSource="dataSource" :columns="columns"></a-table>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useQueryTeamReward } from "@/hooks/useManage"
import { ethers } from "ethers";
import { ref, onMounted } from "vue"
const columns = [
    {
        title: '所属团队',
        dataIndex: 'top',
        key: 'top',
    },
    {
        title: '今日开公司奖励',
        dataIndex: 'coRewardAmount',
        key: 'coRewardAmount',
    },
    {
        title: '今日商群奖励',
        dataIndex: 'groupRewardAmount',
        key: 'groupRewardAmount',
    },
    {
        title: '今日开公司（燃烧）',
        key: 'burnedCoRewardAmountToday',
        dataIndex: 'burnedCoRewardAmountToday',
    },
    {
        title: '总开公司（燃烧）',
        key: 'burnedCoRewardAmountTotal',
        dataIndex: 'burnedCoRewardAmountTotal'
    },
    {
        title: '今日商群（燃烧）',
        key: 'burnedGroupRewardAmountToday',
        dataIndex: 'burnedGroupRewardAmountToday',
    },
    {
        title: '总商群（燃烧）',
        key: 'burnedGroupRewardAmountTotal',
        dataIndex: 'burnedGroupRewardAmountTotal',
    },
];
const dataSource = ref([])
const getTeamReward = async () => {
    const res = await useQueryTeamReward(1, 50)
    if (res.isSuccessful) {
        const teamReward = res.data.team
        dataSource.value = teamReward.map((reward: any) => {
            reward.coRewardAmount = ethers.formatEther(reward.coRewardAmount)
            reward.groupRewardAmount=ethers.formatEther(reward.groupRewardAmount)
            reward.burnedCoRewardAmountToday=ethers.formatEther(reward.burnedCoRewardAmountToday)
            reward.burnedCoRewardAmountTotal=ethers.formatEther(reward.burnedCoRewardAmountTotal)
            reward.burnedGroupRewardAmountToday=ethers.formatEther(reward.burnedGroupRewardAmountToday)
            reward.burnedGroupRewardAmountTotal=ethers.formatEther(reward.burnedGroupRewardAmountTotal)
            return reward
        })
    }
}
onMounted(() => {
    getTeamReward()
})
</script>