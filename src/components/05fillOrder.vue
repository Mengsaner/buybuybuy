<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车
                        </h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <el-form status-icon :model="orderForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="orderForm.accept_name" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区" prop="">
                                        <v-distpicker :placeholders="placeholders" @selected="selected" :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="orderForm.address" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile">
                                        <el-input v-model="orderForm.mobile" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="联系电话">
                                        <el-input v-model="orderForm.phone" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="orderForm.email" style="width:500px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="orderForm.post_code" style="width:500px"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                            <em>手续费：0.00元</em> 
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio @change="expressChange(20)" v-model="orderForm.express_id" label="1">顺丰快递(20元)</el-radio>
                                        <el-radio @change="expressChange(10)" v-model="orderForm.express_id" label="2">圆通快递(10元)</el-radio>
                                        <el-radio @change="expressChange(8)" v-model="orderForm.express_id" label="3">韵达快递(8元)</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in message" :key="index">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{ item.title }}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{ item.sell_price }}
                                                </span>
                                            </td>
                                            <td align="center">{{ item.buycount }}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{ item.totalamount }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <el-input type="textarea" v-model="orderForm.message"></el-input>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{ totalCount }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ orderForm.goodsAmount }}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ orderForm.expressMoment }}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderForm.goodsAmount+orderForm.expressMoment}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/shoppingCar" class="btn button">返回购物车</router-link>
                                            <a id="btnSubmit" @click="sureOrder"  class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 导入vue
import Vue from 'vue'
// 引用省市联动包
import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker)

export default {
  name: "order",
  components: { VDistpicker },
  data: function() {
    // 自定义验证的规则 手机号验证
    let checkMobile = (rule, value, callback) => {
      //   定义正则规则
      let exec = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

      if (exec.test(value) == true) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号码！"));
      }
    };
    //邮箱验证
    let checkEmail = (rule, value, callback) => {
         // 如果value 不为空 格式验证
      if (value.trim().length != 0) {
        let exec = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱！"));
        }
      } else {
        callback();
      }
    };
    //邮编验证
    let checkPostCode = (rule, value, callback) => {
      if (value.trim().length != 0) {
        let exec = /^[1-9]\d{5}(?!\d)$/;
        if (exec.test(value.trim()) == true) {
          callback();
        } else {
          callback(new Error("请输入正确的邮编！"));
        }
      } else {
        callback();
      }
    };
    return {
      message:[],//存储购物车需要结算的商品信息
      orderForm: {
        goodsAmount: 0, // 总金额
        expressMoment:20,//快递费 默认20（选择第一个）
        accept_name: "0.0", // 收货人姓名
        area:{
            province: { code: "440000", value: "广东省" },
            city: { code: "440300", value: "深圳市" },
            area: { code: "440306", value: "宝安区" }
        },
        address: "中粮商务公园3栋17层下面的17层", // 详细地址
        mobile: "18666666666", // 手机号
        email: "sos_help@qq.com", // 邮箱
        post_code: "519000" ,// 邮编
        payment_id:"6",// 支付方式
        express_id:"1", //选择快递
        goodsids:"",//需要结算的商品id
        message:"emmmmmmmmm~~~",//订单备注
        cargoodsobj:{}, //购买的商品 id 跟件数的关系
        phone: "110120122123456", // 联系电话
      },
    //   省市联动占位
      placeholders: {
              province: '------- 省 --------',
              city: '--- 市 ---',
              area: '--- 区 ---',
          },
      // 规则
      rules: {
        //   需要跟字段相对应
        accept_name: [
          // required 是否必须  message 提示消息 trigger 触发的方式
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在1到20个字符", triiger: "change" }
        ],
        address: [{ require: true, messge: "请输入地址", trigger: "blur" }],
        // 手机号验证
        mobile: [{ validator: checkMobile, trigger: "change" }],
        // 邮箱验证
        email: [{ validator: checkEmail, trigger: "blur" }],
        // 邮编验证
        post_code: [{ validator: checkPostCode, trigger: "change" }]
      }
    };
  },
  methods:{
      selected(val){
          this.area=val
      },
      expressChange(val){
          this.orderForm.expressMoment=val
        //   console.log(val);
      },
    //   最后一步提交订单
     sureOrder(){
         this.$axios.post("site/validate/order/setorder",this.orderForm).then(res=>{
            //  获取订单id
            let orderid= res.data.message.orderid;
            // 带着id去订单页
        
            this.$router.push("/payOrder/"+orderid);
            
            // 删除购物车中要结算的商品信息
            this.message.forEach(v=>{
                // 删除仓库中的数据
                this.$store.commit("delete",v.id)
            })
         })
     }
  },
  computed:{
    //订单总数量
    totalCount(){
        let totalCount = 0 ;
        this.message.forEach(v =>{
            totalCount += v.buycount
        })
        return totalCount
    }  
  },
  created() {
    //   拿到商品id
      this.orderForm.goodsids=this.$route.params.ids
    // 发送请求
    this.$axios.get("site/validate/order/getgoodslist/"+this.orderForm.goodsids).then(res=>{
        // 总金额
        let total = 0
        // 商品id对象
        let cargoodsobj = {}
        // 拼接数据
        res.data.message.forEach(v => {
            // 拿到商品数量
            v.buycount = this.$store.state.carDate[v.id]
            // 修改总金额
            v.totalamount = v.buycount * v.sell_price
            // 累加每种商品的总金额
            total += v.totalamount
            // 增加商品id对象的内容
            cargoodsobj[v.id] = v.buycount
        });
        // 赋值
        this.message = res.data.message
        this.orderForm.goodsAmount = total;
        this.orderForm.cargoodsobj = cargoodsobj
    })    
  },
};
</script>

<style>
</style>


