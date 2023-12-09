<template>
    <div>
        <div>
            <a-input-search placeholder="查询地址" v-model:value="address" @search="getGameLogs"></a-input-search>
        </div>
    </div>
    <div>
        <div>
            <a-table :data-source="dataSource" :columns="columns"></a-table>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useGetGameLog } from "@/hooks/useManage";
import { ethers } from "ethers";
import { notification } from "ant-design-vue";
const address = ref("")
const dataSource = ref<any[]>([])
const columns = [
    {
        title: '参与卡牌ID',
        dataIndex: 'cardId',
        key: 'cardId',
    }, {
        title: '参与者',
        dataIndex: 'owner',
        key: 'owner',
    },
    {
        title: '参与卡牌价值',
        dataIndex: 'worth',
        key: 'worth',
    },
    {
        title: '奖励卡牌1ID',
        dataIndex: 'rewardCard1Id',
        key: 'rewardCard1Id',
    }, {
        title: '奖励卡牌2ID',
        dataIndex: 'rewardCard2Id',
        key: 'rewardCard2Id',
    }, {
        title: '奖励算力',
        dataIndex: 'rewardHashrate',
        key: 'rewardHashrate',
    }

]
const getGameLogs = async () => {
    if (!ethers.isAddress(address.value)) {
        return
    }
    const res = await useGetGameLog(address.value)
    if (res.isSuccessful) {
        const logs = res.data.logs
        dataSource.value = logs.map((log: any) => {
            log.worth = ethers.formatEther(log.worth)
            if (log.rewardHashrate) {
                log.rewardHashrate = ethers.formatEther(log.rewardHashrate)
            }
            return log
        })
    } else {
        notification.error({ message: res.message })
    }
}
</script>