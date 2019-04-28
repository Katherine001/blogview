<!--登录界面-->
<template>
    <div>
        <div id="div_title">博客管理平台登录</div>
        <div id="div_loginform">
            <div id="form_left">
                <div class="tet">
                    <p>用户名：</p>
                </div>
                <div class="tet">
                    <p>密&nbsp;&nbsp;&nbsp;&nbsp;码：</p>
                </div>
            </div>
            <div id="form_right">
                <Input size="large" v-model="username" type="text" placeholder="请输入用户名" style="width: auto"/>
                <Input size="large" v-model="userpwd" type="password" placeholder="请输入密码" style="width: auto"/>
            </div>
            <div id="form_btn" style="margin-top: 10px">
                <Button v-on:click="Verify">登陆</Button>
                <Button style="margin-left: 20px" v-on:click="jumpTo" >注册</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import Register from "./Register";
    import Bloger from "./Bloger";

    export default {
        data() {
            return {
                info: null,
                username: '',
                userpwd: ''
            }
        },
        mounted: function () {
            this.getIn()
        },
        methods: {
            getIn() {
                this.axios.get('https://localhost:5001/api/Sys').then(response => (this.info = response.data))
            },
            Verify() {
                for(var i = 0;i < this.info.length;i++) {
                    if (this.info[i].u_name == this.username && this.info[i].u_pwd == this.userpwd) {
                        alert(" login success !");
                        if(this.info[i].u_rid == 1002) {
                            this.$router.push({
                                path:'/bloger',
                                name:'Bloger',
                                query: {
                                    u_id:this.info[i].u_id,
                                    u_name:this.info[i].u_name
                                }
                            })
                        }  else if(this.info[i].u_rid == 1003) {
                            this.$router.push({
                                path:'/vister',
                                name:'Vister',
                                query:{
                                    u_id:this.info[i].u_id,
                                    u_name:this.info[i].u_name
                                }
                            })
                        } else if(this.info[i].u_rid == 1001) {
                            this.$router.push({
                                path:'/admin',
                                name:'Admin',
                                query:{
                                    u_id:this.info[i].u_id,
                                    u_name:this.info[i].u_name
                                }
                            })
                        }
                        return;
                    } else {
                        continue;
                    }
                }
                alert("login failed")
            },
            jumpTo() {
                this.$router.push(Register);
            }
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    #div_title {
        font-size: 50px;
        margin-top: 65px;
        color: #58bcbc;
    }

    #div_loginform {
        position: relative;
        top: 40px;
        /*background-color: chocolate;*/
        margin: auto;
        width: 300px;
        height: 150px;

    }
    #form_left {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 70px;
        margin-top: 0;
        /*background-color: antiquewhite;*/
    }
    #form_left .tet{
        font-size: 20px;
    }
    #form_right {
        width: 200px;
        height: 70px;
        /*background-color: #37fac1;*/
        display: inline-block;
        position: relative;
        margin-top: 0;
    }
    #form_choice {
        width: 300px;
        height: 50px;
        /*background-color: aquamarine;*/
        position: relative;
        padding-top: 15px;
    }
    #form_btn {
        width: 300px;
        height: 50px;
        /*background-color: chartreuse;*/
        position: relative;
    }
</style>
