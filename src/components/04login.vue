<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input v-model.trim="name" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input v-model.trim="password" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" @click="login" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"login",
    data:function(){
       return {
           name:"admin",
           password:"123"
       }
    },
    methods:{
        
        login(){
            // 提交用户名密码 获取登陆结果
            this.$axios.post("site/account/login",{
                user_name:this.name,
                password:this.password
            }).then(response=>{
                if(response.data.status==0){
                    // 改变页面登录状态
                    this.$store.commit("changeloginstatus",true)
                    // 跳转至进来的页面（之前的）
                    this.$router.push(this.$store.state.fromPath)
                    
                    this.$Message.success("登录成功！")
                }
             })
        }
    }
}
</script>

<style>

</style>
