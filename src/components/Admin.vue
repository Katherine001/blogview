<!--后台管理页面-->
<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="toExit" >
            <MenuItem name="Login">
                <Icon type="ios-paper"/>
                已登陆
            </MenuItem>
            <Submenu name="2" style="position: absolute;right: 0px">
                <template slot="title">
                    <Icon type="ios-stats"/>
                    管理员：{{u_name}}
                </template>
                <MenuItem name="Login">注销</MenuItem>
            </Submenu>
        </Menu>
        <Row>
            <Col span="6">

                <Menu style="width: auto">
                    <MenuItem name="1-1">
                        <Button type="base" @click="addinfo = true" long>添加用户</Button>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Button type="base" @click="delinfo = true" long>删除用户</Button>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Button type="base" @click="changeinfo = true" long>编辑用户</Button>
                    </MenuItem>
                </Menu>

            </Col>
            <Col span="18">
                <div style="" id="right">
                    <Card style="width:350px;display: inline-block;margin-left: 10px;margin-top: 10px;margin-bottom: 70px"
                          v-for="uf in userinfo">
                        <p slot="title">
                            <Icon type="ios-film-outline"></Icon>
                            用户信息
                        </p>
                        <ul>
                            <li>
                                <Row>
                                    <Col span="12" style="text-align: left;">编号：</Col>
                                    <Col span="12" style="text-align: left;">{{uf.u_id}}</Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col span="12" style="text-align: left;">用户名：</Col>
                                    <Col span="12" style="text-align: left;">{{uf.u_name}}</Col>
                                </Row>
                            <li>
                                <Row>
                                    <Col span="12" style="text-align: left;">密码：</Col>
                                    <Col span="12" style="text-align: left;">{{uf.u_pwd}}</Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col span="12" style="text-align: left;">角色：</Col>
                                    <Col span="12" style="text-align: left;">
                                        <p v-if="uf.u_rid == 1001">
                                            管理员
                                        </p>
                                        <p v-if="uf.u_rid == 1002">
                                            博主
                                        </p>
                                        <p v-if="uf.u_rid == 1003">
                                            访客
                                        </p>
                                    </Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col span="12" style="text-align: left;">生日：</Col>
                                    <Col span="12" style="text-align: left;">{{uf.u_birth}}</Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col span="12" style="text-align: left;">性别：</Col>
                                    <Col span="12" style="text-align: left;">{{uf.u_sex}}</Col>
                                </Row>
                            </li>
                            <li>
                                <Row>
                                    <Col span="12" style="text-align: left;">真实姓名：</Col>
                                    <Col span="12" style="text-align: left;">{{uf.u_rname}}</Col>
                                </Row>
                            </li>
                        </ul>
                    </Card>
                </div>
            </Col>
        </Row>
        <!--编辑用户-->
        <Modal
                v-model="changeinfo"
                title="信息修改页面"
                @on-ok="ok1"
                @on-cancel="cancel">
            <Form :model="userItem" :label-width="80">
                <FormItem label="编号">
                    <Input v-model="userItem.u_id" type="number" placeholder="Enter something..."></Input>
                </FormItem>
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
            </Form>
        </Modal>
        <!--添加用户-->
        <Modal
                v-model="addinfo"
                title="用户添加页面"
                @on-ok="ok2"
                @on-cancel="cancel">
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
            </Form>
        </Modal>
        <!--删除用户-->
        <Modal
                v-model="delinfo"
                title="用户删除页面"
                @on-ok="ok3"
                @on-cancel="cancel">
            <Form :model="userItem" :label-width="80">
                <FormItem label="用户id">
                    <Input v-model="userItem.u_id" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="管理员账号">
                    <Input v-model="userItem.rootname" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem label="管理员密码">
                    <Input v-model="userItem.rootpwd" placeholder="Enter something..."></Input>
                </FormItem>

            </Form>
        </Modal>
        <Tail style="position: fixed"></Tail>
    </div>
</template>

<script>
    import Tail from "./Tail";

    export default {
        name: "Admin",
        components: {Tail},
        data() {
            return {
                u_id: null,
                u_name: null,
                userinfo: null,
                changeinfo: false,
                addinfo:false,
                delinfo:false,
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
        mounted: function () {
            this.getParams()
            this.getAllUser()
        },
        methods: {
            getParams() {
                let uid = this.$route.query.u_id
                let uname = this.$route.query.u_name
                this.u_id = uid
                this.u_name = uname
            },
            toExit(name) {
                this.$router.push(name)
            },
            getAllUser() {
                this.axios.get('https://localhost:5001/api/Sys').then(response => (this.userinfo = response.data))
            },
            ok1() {
                alert("你关闭了模态")
                var url = 'https://localhost:5001/api/Sys/' + this.userItem.u_id;
                alert(url)
                this.axios.put(url, {
                    "u_id": this.userItem.u_id,
                    "u_name": this.userItem.u_name,
                    "u_pwd": this.userItem.u_pwd,
                    "u_rid": this.userItem.u_rid,
                    "u_birth": this.userItem.u_birth,
                    "u_sex": this.userItem.u_sex,
                    "u_rname": this.userItem.u_rname
                })
                alert("修改成功！")
                location.reload()
            },
            ok2() {
                alert("你关闭了模态")
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
                location.reload()
            },
            ok3() {
                alert("你关闭了模态")
                var url = 'https://localhost:5001/api/Sys/' + this.userItem.u_id;
                alert(url)
                if(this.userItem.rootname == "root" && this.userItem.rootpwd == "root") {
                    this.axios.delete(url)
                    alert("用户"+this.userItem.u_id+"删除成功！")
                    location.reload()
                } else {
                    alert("请提供正确的管理员验证！")
                }
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
    }

    #right {
        padding-top: 10px
    }

</style>