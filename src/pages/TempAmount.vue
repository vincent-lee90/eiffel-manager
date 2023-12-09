<template>
    <div>
        <div>
            <div class="mb-4">地址流水查询</div>
            <a-input-search v-model:value="address" @search="onSearch" placeholder="地址"></a-input-search>
        </div>

        <a-table :columns="columns" :data-source="data" :loading="loading">

        </a-table>
    </div>
</template>
<script setup lang="ts">
import { useGetStatistics } from "@/hooks/useManage";
import { ethers } from "ethers";
import { ref } from "vue"
const address = ref<any>("")
const data = ref<any[]>([])
const loading = ref(false)
const columns = [{
    title: '地址',
    dataIndex: 'address',
    key: 'address',
},
{
    title: '今日流水',
    dataIndex: 'amount',
    key: 'amount',
}, {
    title: '总流水',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
}]
const onSearch = async () => {
    try {
        loading.value = true
        if (ethers.isAddress(address.value)) {
            const res = await useGetStatistics(address.value)
            if (res.isSuccessful) {
                if (res.data.statistics) {
                    res.data.statistics.amount = ethers.formatEther(res.data.statistics.amount)
                    res.data.statistics.totalAmount = ethers.formatEther(res.data.statistics.totalAmount)
                }
                data.value = [res.data.statistics]
            }
        }
        loading.value = false
    } catch (e) {
        console.log(e)
        loading.value = false
    }

}
</script>