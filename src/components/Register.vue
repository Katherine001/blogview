<!--注册界面-->
<template>
    <div>
        <Head/>
        <div id="div_content">
            <p>欢迎来到注册页面</p>
            <Form :model="userItem" :label-width="80">
                <FormItem label="昵称">
                    <Input v-model="userItem.u_name" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="userItem.u_pwd" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="角色">
                    <Select v-model="userItem.u_rid">
                        <Option value="1001">超级管理员</Option>
                        <Option value="1002">博主</Option>
                        <Option value="1003">访客</Option>
                    </Select>
                </FormItem>
                <FormItem label="生日">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="Select date" v-model="userItem.u_birth"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别" prop="usex">
                    <RadioGroup v-model="userItem.u_sex">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="真实姓名">
                    <Input v-model="userItem.u_rname" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button v-on:click="add">提交信息</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import Head from "./Head";
    export default {
        name: "Register",
        components: {Head},
        data() {
            return {
                value: "",
                userItem: {
                    u_id: '',
                    u_name: '',
                    u_pwd: '',
                    u_rid: '',
                    u_birth: '',
                    u_sex: '男',
                    u_rname: '',
                    rootname:'',
                    rootpwd:''
                }
            }
        },
        methods: {
            add() {
                var url = 'https://localhost:5001/api/Sys';
                alert(url)
                this.axios.post(url, {
                    "u_name": this.userItem.u_name,
                    "u_pwd": this.userItem.u_pwd,
                    "u_rid": this.userItem.u_rid,
                    "u_birth": this.userItem.u_birth,
                    "u_sex": this.userItem.u_sex,
                    "u_rname": this.userItem.u_rname
                })
                alert("添加成功！")
            }
        }

    }
</script>

<style scoped>
    #div_content {
        width: 500px;
        height:430px;
        margin: auto;
        background-color: #fff6f9;
        margin-top: 30px;
        border: 1px solid silver;
    }
    p {
        font-size: 25px;
    }
    #div_in {
        margin-top: 10px;
    }
    #div_cho {
        margin-top: 10px;
    }
    #div_btn {
        margin-top: 10px;
    }
</style>
