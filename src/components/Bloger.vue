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
                    博主：{{u_name}}
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
                                博文管理
                            </template>
                            <MenuItem name="show bloglist">查看博文</MenuItem>
                            <MenuItem name="add blog">添加博文</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people"/>
                                个人信息
                            </template>
                            <MenuItem name="change info">修改信息</MenuItem>
                        </Submenu>
                    </Menu>
                </Col>
                <Col span="18" id="rightcontent">
                    <div id="bloglist" style="display: inline">
                        <Collapse>
                            <Panel v-for="bg in blogger">
                                文章标题：{{bg.a_tit}}
                                <div slot="content" style="text-align: left" id="blogneirong">
                                    <div v-html="converter.makeHtml(bg.a_content)"></div>
                                    <b>评论区</b>
                                    <div :id=bg.a_id>
                                        点击下方<b>刷新评论</b>按钮显示评论
                                    </div>
                                    <Button v-on:click="editblog(bg.a_id)">修改文章</Button>
                                    <Button v-on:click="delblog(bg.a_id)">删除文章</Button>
                                    <Button v-on:click="getRemark(bg.a_id)">刷新评论</Button>
                                </div>
                            </Panel>
                        </Collapse>
                    </div>
                    <div id="add" style="display: none">
                        <Form :model="formItem" :label-width="80">
                            <FormItem label="文章标题">
                                <Input v-model="formItem.input" placeholder="请输入标题"></Input>
                            </FormItem>
                            <FormItem label="文章标签">
                                <Select v-model="formItem.select">
                                    <Option v-for="tg in btag" :value="tg.k_id">
                                        {{tg.k_name}}
                                    </Option>
                                </Select>
                            </FormItem>
                            <Row>
                                <Col span="12">
                                    <FormItem label="输入正文">
                                        <Input v-model='content' type="textarea" placeholder="支持markdown语法"
                                               autosize="{minRows: 12,maxRows: 15}"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <div id="show-content" style="text-align: left">
                                        文章预览区域
                                    </div>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" v-on:click="tijiao">提交文章</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div id="info" style="display: none">
                        <Form :model="editinfo" :label-width="80">
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
        <Modal
                v-model="modal1"
                title="Title"
                :loading="loading"
                @on-ok="asyncOK">
            <Form :model="editItem" :label-width="80">
                <FormItem label="文章标题">
                    <Input v-model="editItem.input" placeholder="请输入标题"></Input>
                </FormItem>
                <FormItem label="文章标签">
                    <Select v-model="editItem.select">
                        <Option v-for="tg in btag" :value="tg.k_id">
                            {{tg.k_name}}
                        </Option>
                    </Select>
                </FormItem>
                <Row>
                    <FormItem label="输入正文">
                        <Input v-model='editItem.content' type="textarea" placeholder="支持markdown语法"
                               autosize="{minRows: 12,maxRows: 15}"/>
                    </FormItem>
                </Row>
                <FormItem>
                    <Button type="primary" v-on:click="tijiaoxiugai(editItem.blogid)">提交修改</Button>
                </FormItem>
            </Form>
        </Modal>
        <Tail style="position: fixed"></Tail>
    </div>
</template>

<script>
    import Tail from "./Tail";
    export default {
        name: "Bloger",
        components: {Tail},
        data() {
            return {
                modal1: false,
                u_id: null,//博主的id
                u_name: null,//博主的名字
                blogger: null,//文章信息
                remark: null,//评论信息
                'content': '',
                'converter': null,
                formItem: {
                    input: '',
                    select: '',
                    content: ''
                },
                editItem: {
                    input: '',
                    select: '',
                    content: '',
                    blogid:'',
                    zuozhe:''
                },
                editinfo:{
                    u_name:'',
                    u_pwd:'',
                    u_rid:'',
                    u_birth:'',
                    u_sex:'',
                    u_rname:''
                },
                blogitem: null,//单个文章
                btag: null,
            }
        },
        mounted: function () {
            this.getParams()
            this.getAllBlogs()
            this.init()
        },
        methods: {
            getParams() {
                let uid = this.$route.query.u_id
                let uname = this.$route.query.u_name
                this.u_id = uid
                this.u_name = uname;
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
            toExit(name) {
                this.$router.push(name)
            },
            topart(name) {
                if (name == "show bloglist") {
                    document.getElementById("bloglist").style.display = "inline"
                    document.getElementById("add").style.display = "none"
                    document.getElementById("info").style.display = "none"
                } else if (name == "add blog") {
                    document.getElementById("bloglist").style.display = "none"
                    document.getElementById("add").style.display = "inline"
                    document.getElementById("info").style.display = "none"
                } else if (name == "change info") {
                    document.getElementById("bloglist").style.display = "none"
                    document.getElementById("add").style.display = "none"
                    document.getElementById("info").style.display = "inline"
                    // alert(333)
                    var url = 'https://localhost:5001/api/Sys/' + this.u_id
                    // alert(url)
                    this.axios.get(url).then(response => this.editinfo = response.data)
                }
            },
            tijiao() {
                var url = 'https://localhost:5001/api/Blogger/uid/' + this.u_id
                var json = {
                    "a_kid": this.formItem.select,
                    "a_tit": this.formItem.input,
                    "a_content": this.content
                }
                alert(json.a_kid + "," + json.a_tit + "," + json.a_content)
                this.axios.post(url, json)
                alert("添加成功")
                location.reload()
            },
            tijiaoxinxi() {
                var url = 'https://localhost:5001/api/Sys/' + this.u_id
                this.axios.put(url,this.editinfo)
                location.reload()
            },
            async tijiaoxiugai(i) {
                var geturl = 'https://localhost:5001/api/Blogger/' + i;
                var json = {
                    "a_id":this.editItem.blogid,
                    "a_kid": this.editItem.select,
                    "a_tit": this.editItem.input,
                    "a_content": this.editItem.content,
                    "a_uid": this.editItem.zuozhe
                }
                await this.axios.put(geturl,json)
                alert('修改成功')
                location.reload()
            },
            getAllBlogs() {
                this.axios.get('https://localhost:5001/api/Blogger/uid/' + this.u_id).then(response => (this.blogger = response.data))
                this.axios.get('https://localhost:5001/api/Article').then(response => (this.btag = response.data))
            },
            init() {
                var showdown = require('showdown');
                var converter = new showdown.Converter();
                this.converter = converter;
            },
            contentChanged() {
                var html = this.converter.makeHtml(this.content);
                document.getElementById('show-content').innerHTML = html;
            },
            async editblog(i) {
                var geturl = 'https://localhost:5001/api/Blogger/' + i;
                await this.axios.get(geturl).then(response => this.blogitem = response.data)
                this.editItem.content = this.blogitem.a_content
                this.editItem.input = this.blogitem.a_tit
                this.editItem.blogid = this.blogitem.a_id
                this.editItem.zuozhe = this.blogitem.a_uid
                this.modal1 = true
            },
            async delblog(i) {
                var url = 'https://localhost:5001/api/Blogger/' + i;
                await this.axios.delete(url)
                location.reload()
            }
        },
        watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams',
            'content': 'contentChanged'
        }
    }
</script>

<style scoped>

    #show-content {
        padding: 25px;
        border: antiquewhite 1px solid;
    }


</style>