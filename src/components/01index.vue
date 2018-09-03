<template>
    <div>
        <!-- nav -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
       <!-- 导航页及轮播图 -->
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="it in item.subcates" :key="it.id">
                                               {{it.title}}
                                            </span>   
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{ item.title }}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="it in item.subcates" :key="it.id">{{it.title}}</a>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <div class="block">
                                    <el-carousel trigger="click">
                                        <el-carousel-item v-for="item in sliderlist" :key="item.id">
                                            <a href="#"> <img :src="item.img_url"></a>
                                        </el-carousel-item>
                                    </el-carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{ index+1 }}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{ item.title }}</a>
                                    <span>{{ item.add_time | filterDate  }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 商品分类 -->
        <div class="section"  v-for="item in category" :key="item.id">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="it in item.level2catelist" :key="it.id">{{ it.subcatetitle }}</a>
                   
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="it in item.datas" :key="it.artID">
                            <router-link :to="'/site/goodsinfo/'+it.artID">
                                <div class="img-box">
                                    <img v-lazy="it.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{ it.artTitle }}</h3>
                                    <p class="price">
                                        <b>{{ it.sell_price }}</b>元</p>
                                    <p>
                                        <strong>{{ it.stock_quantity }}</strong>
                                        <span>市场价：
                                            <s>{{ it.market_price }}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//导入this.$axios
// import this.$axios from "this.$axios";
// 导入vue
import Vue from "vue";
//引入Element
import ElementUI from "element-ui";
//引入Element样式
import "element-ui/lib/theme-chalk/index.css";
//注册ElementUI,在node环境下需要手动注册
Vue.use(ElementUI);
// ----------------------------------------------

export default {
  name: "index",
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      category: []
    };
  },
  //vue函数实例化的生命周期函数--创建之前
  // beforeCreate() {},
  //vue函数实例化的生命周期函数--创建完毕
  created() {
    // 请求商品详情
    this.$axios
      .get("site/goods/gettopdata/goods")
      .then(response => {
        // console.log(response.data.message);
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
      });
    // 请求商品分类列表
    this.$axios
      .get("site/goods/getgoodsgroup")
      .then(response => {
        //   console.log(JSON.parse(response.request.response).message);
        this.category = JSON.parse(response.request.response).message;
        // console.log(this.category);
      });
  },
//   过滤器抽取到main.js中作为全局过滤器使用
//   filters: {
//     filterDate(val) {
//       return moment(val).format("YYYY年MM月DD日");
//     }
//   }
};
</script>

<style>
.el-carousel__container {
  height: 341px;
}

.el-carousel__item img {
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>


