<template>
    <div class="mb-16">

    </div>
    <a-table :data-source="data" :columns="columns" :loading="loading">
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex == 'operation' && record.status == '0'">
                <a-button @click="openAirdrop(record.cardId)">空投</a-button>
            </template>
            <template v-if="column.dataIndex == 'status'">
                <span v-if="record.status == '0'">未铸造</span>
                <span v-else-if="record.status == '1'">铸造中</span>
                <span v-else>已铸造</span>
            </template>
            <template v-if="column.dataIndex == 'worth'">
                <span>{{ ethers.formatEther(record.worth) }}</span>
            </template>
            <template v-if="column.dataIndex == 'mayMintTime'">
                <span>{{ new Date(record.mayMintTime).toLocaleString() }}</span>
            </template>
        </template>
    </a-table>
    <a-modal v-model:open="isShowAirdrop" @ok="manualMint">
        <div>空投地址</div>
        <div><a-input v-model:value="airdropAddress"></a-input></div>
    </a-modal>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useGetMintList, useManualMint } from "@/hooks/useManage"
import { ethers } from "ethers"
import { notification } from "ant-design-vue";
const data = ref<any[]>([])
const loading = ref(false)
const columns = [
    {
        title: '卡牌ID',
        dataIndex: 'cardId',
        key: 'cardId',
    }, {
        title: '图片',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
    },
    {
        title: '当前铸造时间',
        dataIndex: 'mayMintTime',
        key: 'mayMintTime',
    },
    {
        title: '当前铸造者',
        dataIndex: 'mayOwner',
        key: 'mayOwner',
    }, {
        title: '价值',
        dataIndex: 'worth',
        key: 'worth',
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation'
    }

]
const getMintList = async () => {
    try {
        loading.value = true
        const res = await useGetMintList()
        if (res.isSuccessful) {
            data.value = res.data.originalCards
        } else {
            notification.error({ message: res.message })
        }
        loading.value = false
    } catch (e) {
        console.log(e)
        loading.value = false
    }
}
const airdropAddress = ref('')
const selectCardId = ref('')
const isShowAirdrop = ref(false)
const openAirdrop = (cardId: any) => {
    selectCardId.value = cardId
    isShowAirdrop.value = true
}
const manualMint = async () => {
    if (ethers.isAddress(airdropAddress.value)) {
        try {
            const res = await useManualMint(airdropAddress.value, selectCardId.value)
            if (res.isSuccessful) {
                notification.success({ message: "空投成功" })
            } else {
                notification.error({ message: res.message })
            }
            isShowAirdrop.value = false
            selectCardId.value = ""
            airdropAddress.value = ""
        } catch (e) {
            isShowAirdrop.value = false
            selectCardId.value = ""
            airdropAddress.value = ""
            console.log(e)
            notification.error({ message: "空投失败" })
        }

    }

}
onMounted(() => {
    getMintList()
}) 
</script>