<!--顶部导航菜单-->
<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="tologin">
        <MenuItem name="Login">
        <Icon type="ios-paper" />
        登陆
    </MenuItem>
        <Submenu name="2" style="position: absolute;right: 0px">
            <template slot="title">
                <Icon type="ios-stats" />
                更多选项（未登录）
            </template>
        </Submenu>
    </Menu>
</template>

<script>
    export default {
        name: "Head",
        methods: {
            tologin(name) {
                this.$router.push(name);
            }
        }
    }
</script>

<style scoped>

</style>
