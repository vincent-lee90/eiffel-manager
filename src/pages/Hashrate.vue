<template>
    <div>
        <div>
            <div class="mb-4">
                <div class="mb-2">地址</div>
                <a-input placeholder="地址" v-model:value="address"></a-input>
            </div>
            <div class="mb-4">
                <div class="mb-2">算力设置(1代表1U)</div>
                <a-input placeholder="算力" v-model:value="hashrate"></a-input>
            </div>
            <div>
                <a-button type="primary" @click="confirm">确定</a-button>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { useSetHashrate } from "@/hooks/useManage";
import { notification } from "ant-design-vue";
import { ethers } from "ethers";
import { ref } from "vue"
const address = ref("")
const hashrate = ref("")
const confirm = async () => {
    if (ethers.isAddress(address.value)) {
        const hashrateUint = ethers.parseEther(hashrate.value).toString()
        const res = await useSetHashrate(address.value, hashrateUint)
        if (res.isSuccessful) {
            notification.success({ message: "成功" })
        } else {
            notification.error({ message: res.message })
        }
    } else {
        console.log("地址不正确")
    }

}
</script>