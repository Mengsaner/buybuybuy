<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                           
                             <!-- 商品详情图片预览插件 -->
                             <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="containerOptions"></ProductZoomer>         
                            </div>
                            <div class="goods-spec">
                                <h1>{{ goodsinfo.title }}</h1>
                                <p class="subtitle">{{ goodsinfo.sub_title }}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{ goodsinfo.goods_no }}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ goodsinfo.market_price }}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{ goodsinfo.sell_price }}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <!-- 购买数量计数器 -->
                                                    <el-input-number v-model="num1" @change="handleChange" :min="0" :max="goodsinfo.stock_quantity" size="small" label="描述文字"></el-input-number>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCar" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- iView吸顶组件 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="flag=false" :class="{selected:!flag}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="flag=true"  :class="{selected:flag}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 用v-html解析数据里面的标签-->
                            <div class="tab-content entry" v-show="!flag" v-html="goodsinfo.content"></div>
                            <!-- 评论盒子 -->
                            <div class="tab-content" v-show="flag">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" v-model.trim="submsg" datatype="*10-1000" nullmsg="请填写评论内容！" @keyup.enter="submit"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="submit">
                                                <span class="Validform_checktip" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 评论框 -->
                                    <ul id="commentList" class="list-box">
                                        <!-- 如果有评论则不显示 -->
                                        <p v-show="commentlist.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                       
                                        <li v-for="item in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{ item.user_name }}</span>
                                                    <span>{{ item.add_time | filterDate("YYYY-MM-DD HH:mm:ss")}}</span>
                                                </div>
                                                <p>{{ item.content }}</p>
                                            </div>
                                        </li>
                                       
                                    </ul>
                                    <!-- 分页 -->
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                           <div class="block">
                                                <el-pagination 
                                                    background
                                                    @size-change="handleSizeChange"                      @current-change="handleCurrentChange"
                                                    :current-page="currentPage"
                                                    :page-sizes="[5, 10, 15, 20]"
                                                    :page-size="pageNum"
                                                    layout="total, sizes, prev, pager, next, jumper"
                                                    :total="totalcount">
                                                </el-pagination>
                                            </div>
                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                   
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | filterDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- iView返回顶部组件 -->
        <BackTop></BackTop>
        <!-- 点击加入购物车的动画所需的盒子 -->
        <!-- 关键点：imglist里面的数据是发请求之后才获取到的，所以在标签渲染出来之前是没有里面的数据，所以会报错。
        解决办法：利用vif，在没有数据的时候不让此标签生成就不会报错了。等请求到数据imglist数组含有数据后，再次渲染 -->
        <img v-if="imglist.length!=0" id="pic" :src="imglist[0].original_path" >
    </div>
    
</template>

<script>
//导入jquery
import $ from "jquery";
//出口
export default {
  name: "Detail",
  data: function() {
    return {
      goodsinfo: "",
      hotgoodslist: [],
      //   商品id
      id: "",
      //   购买数量
      num1: 0,
      //   获取图片数据
      imglist: [],
      //   放大镜的图片数据
      images: {
        normal_size: []
      },
      //   放大镜的默认设置
      containerOptions: {
        zoomFactor: 5, //改变放大倍数
        pane: "container-round", //改变方法样式
        hoverDelay: 300, //延迟放大
        namespace: "zoomer",
        move_by_click: false, //是否点击切换缩略图
        scroll_items: 10,
        choosed_thumb_border_color: "skyblue" //框的颜色
      },
      //   判断是否显示评论
      flag: false,
      //   评论数据
      commentlist: [],
      //   总页数
      totalcount: undefined,
      //  当前页码
      currentPage: 1,
      //   每页容量
      pageNum: 5,
      // 提交评论的内容
      submsg: ""
    };
  },
  methods: {
    //   购买数量
    handleChange(num) {
      //   console.log(num);
      this.num1 = num;
    },
    //获取产品详情函数
    getProductdetail() {
      //   获取商品id
      this.id = this.$route.params.id;
      // 根据商品id获取商品详情数据
      this.$axios
        .get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;

          let arr = [];
          this.imglist.forEach((v, i) => {
            arr.push({
              id: v.id,
              url: v.original_path
            });
          });

          this.images.normal_size = arr;
        });
    },
    //获取评论
    getComment() {
      this.$axios
        .get(
          `site/comment/getbypage/goods/${this.id}?pageIndex=
            ${this.currentPage}&pageSize=${this.pageNum}`
        )
        .then(response => {
          this.commentlist = response.data.message;
          this.totalcount = response.data.totalcount;
        });
    },
    // element插件事件：切换页面获取评论数据
    handleCurrentChange(page) {
      // console.log(page);
      this.currentPage = page;
      this.getComment();
    },
    // element插件事件：切换页容量获取评论数据
    handleSizeChange(size) {
      // console.log(size);
      this.pageNum = size;
      this.currentPage = 1;
      this.getComment();
    },
    // 评论
    submit() {
      if (this.submsg == "") {
        this.$Message.error(
          "请输入评论!!!请输入评论!!!请输入评论!!!请输入评论!!!"
        );
        return;
      }

      this.$axios({
        method: "post",
        url: `site/validate/comment/post/goods/${this.id}`,
        data: {
          commenttxt: this.submsg
        }
      }).then(res => {
        this.$Message.success(res.data.message);
        this.getComment();
      });
      this.submsg = "";
    },
    // 加入购物车
    addCar() {
      // 判断，商品数量为0，则不进行下一步
      if (this.num1 == 0) {
        this.$Message.error("哥们,买点呗,不买怎么加入购物车呀 (づ￣ 3￣)づ");
        return;
      }

      // 获取购物车的位置距离信息
      let addbutton = $(".add").offset();
      addbutton.width = "45px";
      // 获取动画目标位置的距离信息
      let buycar = $(".icon-cart").offset();
      buycar.width = "10px";
      // console.log(buycar);
      // 给小图片定位及移动
      $("#pic")
        .stop(true, false)
        .show()
        .css(addbutton)
        .animate(buycar, 1000, "linear", function() {
          $(this).hide();
        });

      // 增加数据
      this.$store.commit("addgoods", {
        goodid: this.id,
        goodnum: this.num1
      });
    }
  },
  created() {
    this.getProductdetail();
    // 获取评论数据（默认显示数据）
    this.getComment();
  },
  //   监听$route-----------------
  watch: {
    $route(to, from) {
      // 强制让图片数组等于[],后面再赋值，相当于实时变动
      this.images.normal_size = [];
      //跳转到其他数据的时候，调回第一页
      this.currentPage = 1;

      // 获取到热卖商品的id
      // 根据商品id获取商品详情数据
      this.getProductdetail();
      // 获取评论数据（默认显示数据）
      this.getComment();
    //   切换回商品时，商品购买数量变为0
      this.num1=0
    }
  }
};
</script>



<style lang="less">
.tab-content img {
  width: 100%;
  display: block;
}

/* 放大镜相关样式 */
.pic-box {
  width: 395px;
  .zoomer-zoomer-box {
    margin-right: 10px;
  }
  .control-box .thumb-list {
    display: flex;
    justify-content: center;
    img {
      width: 80px;
      height: 80px;
      margin: 2px;
    }
  }
  .control {
    text-align: center;
    display: flex;
    /* 主轴 */
    justify-content: center;
    /* 纵轴 副轴 侧轴 */
    align-items: center;
  }
}

// 加入购物车的动画效果图
#pic {
  width: 45px;
  display: none;
  border-radius: 50%;
  position: absolute;
}
</style>
