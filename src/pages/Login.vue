<template>
    <div class="mt-[30%] mx-auto w-[400px]">
        <div class="mb-16">
            <a-input placeholder="用户名" v-model:value="user"></a-input>
        </div>
        <div class="mb-16">
            <a-input placeholder="密码" type="password" v-model:value="password"></a-input>
        </div>
        <div>
            <a-button type="primary" @click="login">登录</a-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router"
import { ref } from "vue"
import { useLogin } from "@/hooks/useManage"
import { notification } from "ant-design-vue";
const router = useRouter()
const user = ref("")
const password = ref("")
const login = async () => {
    const res = await useLogin(user.value, password.value)
    if (res.isSuccessful) {
        router.push({ name: "team.reward" })
    } else {
        notification.error({ message: "用户名密码错误" })
    }

}
</script>