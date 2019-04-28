<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="toExit">
            <MenuItem name="Login">
                <Icon type="ios-paper"/>
                已登陆
            </MenuItem>
            <Submenu name="2" style="position: absolute;right: 0px">
                <template slot="title">
                    <Icon type="ios-stats"/>
                    访客：{{u_name}}
                </template>
                <MenuItem name="Login">注销</MenuItem>
            </Submenu>
        </Menu>
        <div style="margin-bottom: 100px">
            <Row>
                <Col style="background-color: antiquewhite" span="6">
                    <Menu :open-names="['1']" accordion width="auto" @on-select="topart">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper"/>
                                访客
                            </template>
                            <MenuItem name="show bloglist">查看博文</MenuItem>
                            <MenuItem name="edit personal">修改信息</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
                <Col span="18" id="rightcontent">
                    <div id="passage" style="margin-top: 10px">
                        <Select v-model="bloggerid" style="width:200px;margin-left: 0" @on-change="selectblogger"
                                placeholder="请选择需要查看的博主">
                            <Option v-for="item in bloggerinfo" :value="item.u_id">{{ item.u_name }}</Option>
                        </Select>
                        <Card :title=item.a_tit icon="ios-options" :padding="0" shadow
                              style="width: auto;text-align: left" v-for="item in article">
                            <CellGroup>
                                <Cell title="文章标签" v-if="item.a_kid == 1" extra="随笔"><b>文章标签</b></Cell>
                                <Cell title="文章标签" v-if="item.a_kid == 2" extra="小说"><b>文章标签</b></Cell>
                                <Cell title="文章标签" v-if="item.a_kid == 3" extra="技术"><b>文章标签</b></Cell>
                                <Cell title="正文"><b>正文</b></Cell>
                                <Cell style="background-color: beige">
                                    <div v-html="converter.makeHtml(item.a_content)"></div>
                                </Cell>
                                <Cell title="评论区"><b>评论区</b></Cell>
                                <Cell style="background-color: beige">
                                    <div :id=item.a_id>
                                        <Button v-on:click="getRemark(item.a_id)">显示评论</Button>
                                    </div>
                                </Cell>
                                <Cell title="正文"><b>更多操作</b></Cell>
                                <Cell style="background-color: beige">
                                    <Form :model="remarkitem" :label-width="auto">
                                        <FormItem label="评论：">
                                            <Input v-model="remarkitem.mark" placeholder="在此输入评论"></Input>
                                        </FormItem>
                                    </Form>
                                    <Button v-on:click='getRemark(item.a_id)'>刷新评论</Button>
                                    <Button v-on:click="addRemark(item.a_id)">发表评论</Button>
                                </Cell>
                            </CellGroup>
                            <hr>
                        </Card>
                    </div>
                    <div id="info" style="display: none">
                        <Form :model="editinfo" :label-width="80" style="margin-top: 10px">
                            <FormItem label="昵称">
                                <Input v-model="editinfo.u_name" placeholder="Enter something..."></Input>
                            </FormItem>
                            <FormItem label="密码">
                                <Input v-model="editinfo.u_pwd" placeholder="Enter something..."></Input>
                            </FormItem>
                            <FormItem label="性别" prop="usex">
                                <RadioGroup v-model="editinfo.u_sex">
                                    <Radio label="男">男</Radio>
                                    <Radio label="女">女</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="真实姓名">
                                <Input v-model="editinfo.u_rname" placeholder="Enter something..."></Input>
                            </FormItem>
                            <Button v-on:click="tijiaoxinxi">提交修改</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>

        <Tail style="position: fixed"></Tail>
    </div>
</template>

<script>
    import Tail from "./Tail";

    export default {
        name: "Vister",
        components: {Tail},
        data() {
            return {
                u_id: null,
                u_name: null,
                bloggerinfo: null,
                bloggerid: null,
                article: null,
                switchValue: false,
                'converter': null,
                remark: null,
                modal1: false,
                remarkitem: {
                    mark: null
                },
                editinfo: {
                    u_name: '',
                    u_pwd: '',
                    u_rid: '',
                    u_birth: '',
                    u_sex: '',
                    u_rname: ''
                },
            }
        },
        mounted: function () {
            this.getParams()
            this.init()
        },
        methods: {
            getParams() {
                let uid = this.$route.query.u_id
                let uname = this.$route.query.u_name
                this.u_id = uid
                this.u_name = uname
                this.axios.get("https://localhost:5001/api/Vister/bozhu").then(response => this.bloggerinfo = response.data)
            },
            tijiaoxinxi() {
                var url = 'https://localhost:5001/api/Sys/' + this.u_id
                this.axios.put(url,this.editinfo)
                location.reload()
            },
            toExit(name) {
                this.$router.push(name)
            },
            topart(name) {
                if (name == "show bloglist") {
                    // alert(1)
                    document.getElementById("passage").style.display = "inline"
                    document.getElementById("info").style.display = "none"
                } else if (name == "edit personal") {
                    alert(2)
                    document.getElementById("passage").style.display = "none"
                    document.getElementById("info").style.display = "inline"
                    var url = 'https://localhost:5001/api/Sys/' + this.u_id
                    this.axios.get(url).then(response => this.editinfo = response.data)
                }
            },
            selectblogger(name) {
                // alert(name)
                var url = "https://localhost:5001/api/Blogger/uid/" + name
                alert(url)
                this.axios.get(url).then(response => this.article = response.data)
            },
            async getRemark(a_id) {
                var url = "https://localhost:5001/api/Blogger/pl/" + a_id
                await this.axios.get(url).then(response => this.remark = response.data)
                // alert(this.remark[0].p_content)
                var tt = ''
                if (this.remark[0] == null) {
                    document.getElementById(a_id).innerHTML = '<div>当前暂无评论</div>'
                    return
                }
                for (var i in this.remark) {
                    tt = tt + '<hr><div>评论id:' + this.remark[i].p_uid + '</div><div>评论内容：' + this.remark[i].p_content + '</div><div>评论时间：' + this.remark[i].p_time + '</div><hr>'
                }
                document.getElementById(a_id).innerHTML = tt
            },
            async addRemark(a_id) {
                // alert(a_id)
                var json = {
                    "p_content": this.remarkitem.mark,
                    "p_uid": this.u_id,
                    "p_time": new Date()
                }
                // alert(json.p_aid+json.p_content+json.p_uid+json.p_time)
                var url = 'https://localhost:5001/api/Vister/blogid/' + a_id
                await this.axios.post(url, json)
            },
            init() {
                var showdown = require('showdown');
                var converter = new showdown.Converter();
                this.converter = converter;
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获0取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
        }
    }
</script>

<style scoped>

</style>