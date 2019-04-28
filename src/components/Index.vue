<!--欢迎页-->
<!--状态：完成-->
<template>
    <div>
        <Head></Head>
        <Row>
            <Col span="12" id="left">
                <p style="font-size: 30px;margin-top: 100px">
                    欢迎各位来到博客之家
                </p>
                <p style="font-size: 30px;padding-top: 50px">
                    这里是一个交流技术的地方
                </p>
                <p style="font-size: 30px;padding-top:50px">
                    这边有许多好玩的人，好玩的事情
                </p>
                <p style="font-size: 30px;padding-top:50px;margin-bottom: 170px">
                    那么现在就<a v-on:click="start">开始</a>吧
                </p>
            </Col>
            <Col span="12" id="right">
            <div id="left_line" style="margin-top: 500px;font-size: 20px;color: bisque">
                制作者：陆嘉能
                <br>
                学校：南京师范大学泰州学院
                <br>
                班级：信1501
            </div>
            </Col>
        </Row>
        <Tail></Tail>
    </div>
</template>

<script>
    import Head from "./Head";
    import Login from "./Login";
    import Tail from "./Tail";
    // import Register from "./Register";
    export default {
        name: "Index",
        components: {Tail, Head},
        methods: {
            start() {
                this.$router.push(Login);
            }
        }
    }
</script>

<style scoped>

    #left {
        background-color: #e6faf5;
    }
    #right {
        background: url("../static/img/01.jpg") no-repeat center;
        height: 600px;

    }

</style>