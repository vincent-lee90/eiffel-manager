<template>
    <div>
        <div class="mb-4">地址</div>
        <a-input-search v-model:value="address" @search="search" placeholder="输入地址"></a-input-search>
    </div>
    <div class="mt-16">
        <div v-if="!!address">
            <a-spin :spinning="loading">
                <div class="mb-4">邀请人：<span>{{ memberInfo.inviter }}</span></div>
                <div class="mb-4">已邀请：<span>{{ memberInfo.invitees }}</span></div>
                <div class="mb-4">算力:<span>{{ memberInfo.hashrate }}</span></div>
            </a-spin>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useGetRelation } from "@/hooks/useManage";
import { ethers } from "ethers";
import { ref } from "vue"
const address = ref("")
const memberInfo = ref<any>({
    inviter: "",
    invitees: "",
    hashrate: ""
})
const loading = ref(false)
const search = async () => {
    if (ethers.isAddress(address.value)) {
        loading.value = true
        const res = await useGetRelation(address.value)
        if (res.isSuccessful) {
            memberInfo.value = res.data.memberInfo
        }
        loading.value = false
    }
}
</script>