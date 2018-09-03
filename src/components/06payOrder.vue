<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link> &gt;
                <router-link :to="'/orderList/'+this.$route.params.id">订单详情</router-link> &gt;
                <a href="javascript:;">支付中心</a> &gt;
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orderInfo.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <div id="container2">
                                    <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.id" :options="{ size: 200 }"></qrcode>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueQrcode from "@xkeshi/vue-qrcode";

export default {
  name: "payOrder",
  data: function() {
    return {
      orderInfo: {}
    };
  },
  components: {
    //   对象的属性名 默认不支持 使用 对象取值的方式来赋值
    // ES6中有这个语法
    [VueQrcode.name]: VueQrcode
  },
  created() {
    // console.log(this.$route.params.id);
    this.$axios
      .get(`site/validate/order/getorder/${this.$route.params.id}`)
      .then(res => {
        this.orderInfo = res.data.message[0];
      });



    clearInterval(timeid)
    // 用定时器的方式 轮询 查询是否支付订单
    let timeid=setInterval(()=>{
        // 检查是否在登录状态，不在则清除定时器
        // this.$axios.get("site/account/islogin").then(res=>{
            
            // if(res.data.code != "logined")  {
            //     clearInterval(timeid)  
            //     return
            // }else{
                
            // }
            
        this.$axios.get(`site/validate/order/getorder/${this.$route.params.id}`).then(res => {
        // console.log(res);
        if(res.data.message[0].status == 2){
            // 支付成功
            this.$Message.success("付完钱咯,等发货吧!!!(づ￣ 3￣)づ");
            setTimeout(() => {
                // 提示用户
              this.$router.push(`/paySucess/${this.$route.params.id}`);

              clearInterval(timeid)
            }, 500);
        }else{}
      });
            
        // })
        
         
    },1000)
    
  }
};
</script>

<style>
</style>


