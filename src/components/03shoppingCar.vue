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
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <!-- 表头 -->
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="goodsinfo.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <router-link to="/index">马上去购物</router-link>吧！
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            <!-- 商品信息 -->
                                <tr v-for="item in goodsinfo" :key="item.id">
                                   <td>
                                       <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ff4949">
                                        </el-switch>
                                    </td> 
                                   <td><img width="75px" :src="item.img_url"></td> 
                                   <td>{{item.title}}</td> 
                                   <td>{{item.sell_price}}</td> 
                                   <td><el-input-number size="mini" :min="0" @change="goodsnumChange(item.id,item.buycount)" v-model="item.buycount"></el-input-number></td> 
                                   <td>{{item.buycount*item.sell_price}}</td> 
                                   <td>
                                       <el-button @click="delOne(item.id)"  type="danger" icon="el-icon-delete" circle></el-button>
                                    </td> 
                                </tr>
                                
                                
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalnum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalprice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                              <button class="button">继续购物</button>
                            </router-link>
                            <button class="submit" @click="checkAndsubmit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "shoppingCar",
  data: function() {
    return {
      goodsinfo: [],
    };
  },
  methods: {
      goodsnumChange(id,num){
          this.$store.commit("updateGoodsNum",{
              goodid:id,
              goodnum:num
          })
      },
      delOne(id){
        //   1、删除vuex仓库中的值
          this.$store.commit("delete",id)
          this.goodsinfo.forEach((v,i) => {
              if(v.id==id){
                //   删除dom里面的数据
                  this.goodsinfo.splice(i,1)
            }
          });
      },
      checkAndsubmit(){
        //   先判断购物车内是否有物品(判断商品数量)
        if(this.totalnum == 0){
            this.$Message.error("没有选择结算商品！")
            return
        }
        // 通过判断说明选择了商品，则可以直接前往订单页
        let ids=""
        
        this.goodsinfo.forEach(v=>{
            // 只要购物车中被选中结算的商品的id
            if(v.selected==true){
                ids+=v.id+","
            } 
        })
        
         // 去掉最后一个","
            ids=ids.slice(0,-1)
            
            this.$router.push(`/order/${ids}`)
        
         
      }
  },
  created() {
    //   用变量存储carDate
    let CarDate = this.$store.state.carDate;
    //   获取id
    let id = "";
    // 遍历对像
    for (const key in CarDate) {
      id += key + ",";
    }
    // 去掉最后多余的逗号 第二个-1的意思是 最后一个 不要
    id = id.slice(0, -1);
    //   获取id对应的商品信息
    // console.log(id=="");
    // 如果没有购买商品，则没有商品id，则不用发请求
    if(id=="")return
    this.$axios.get(`site/comment/getshopcargoods/${id}`).then(response => {
      // 因为服务器返回的数据 没有购买数量 他们也不知道
        response.data.message.forEach((v,i) => {
        //    后台没给数。自己获取商品对应的数量添加至数据中
        v.buycount=CarDate[v.id]
        // 添加状态元素判断是否被选中（默认选中）
        v.selected=true
        
        });
        
        this.goodsinfo=response.data.message
        // console.log(response.data.message);
    });
    
  },
  computed:{
      totalprice(){
          let totalprice=0
          this.goodsinfo.forEach(v => {
              if(v.selected==true){
                  totalprice+=v.buycount*v.sell_price
              }
          });
          return totalprice
      },
      totalnum(){
          let totalnum=0
          this.goodsinfo.forEach(v=>{
              if(v.selected==true){
                  totalnum+=v.buycount
              }
          })
          return totalnum
      }
  }
};
</script>


<style>
</style>

