<template>
    <div>
        <div>
            <div class="mb-4">团队顶级地址</div>
            <a-input-search v-model:value="address" @search="search" placeholder="地址"></a-input-search>
        </div>
        <a-table :data-source="data" :columns="columns" :loading="loading">
        </a-table>
    </div>
</template>
<script setup lang="ts">
import { useGetTeam } from "@/hooks/useManage";
import { ethers } from "ethers";
import { ref } from "vue"
const address = ref("")
const data = ref<any[]>([])
const loading = ref(false)
const columns = ref<any[]>([{
    title: '地址',
    dataIndex: 'address',
    key: 'address',
},
{
    title: '所属团队',
    dataIndex: 'top',
    key: 'top',
}
])
const search = async () => {
    try {
        loading.value = true
        if (ethers.isAddress(address.value)) {
            const res = await useGetTeam(address.value)
            if (res.isSuccessful) {
                data.value = res.data.members
            }
        }
        loading.value = false
    } catch (e) {
        console.log(e)
        loading.value = false
    }

}
</script>
