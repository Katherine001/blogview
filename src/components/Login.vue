<!--注册页面-->
<template>
    <div>
        <Head/>
        <LoginForm/>
        <Tail/>
    </div>
</template>

<script>
    import Head from "@/components/Head";
    import LoginForm from "@/components/LoginForm";
    import Tail from "@/components/Tail";
    export default {
        name: "Login",
        components: {Tail, LoginForm, Head}
    }
</script>

<style scoped>

</style>
