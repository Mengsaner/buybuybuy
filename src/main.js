// 导入vue
import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'
//注册vuerouter,在node环境下需要手动注册
Vue.use(VueRouter)

// 导入组件-------------------------------------
// 导入app模板(主组件))
import App from './App.vue'
// 首页 组件
import Index from "./components/01index.vue"
// 详情页 组件
import Detail from './components/02productDetail.vue'
// 购物车 组件
import shoppingCar from './components/03shoppingCar.vue'
// 登录 组件
import Login from './components/04login.vue'
// 下订单 组件
import Order from './components/05fillOrder.vue'
// 订单支付 组件
import PayOrder from './components/06payOrder.vue'
// 订单支付成功 组件
import paySuccess from './components/07paySuccess.vue'
// vip中心 组件
import VipCenter from './components/08VipCenter.vue'
// 交易订单 组件
import orderList from './components/09orderList.vue'
// 交易详情 组件
import orderDetail from './components/10orderDetail.vue'
// 导入组件-------------------------------------



// 实例化路由对象
const router = new VueRouter({
  // 等同于routes:routes
  routes: [
    // 访问对象重新定位
    {
      path: "/",
      redirect: "/index"
    },
    // 配置组件
    {
      path: "/index",
      component: Index
    },
    {
      path: "/site/goodsinfo/:id",
      component: Detail
    },
    {
      path:"/shoppingCar",
      component:shoppingCar
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/order/:ids",
      component:Order,
      // 路由元信息 可以随意加  
      meta:{ checkLogin:true }
    },
    {
      path:"/payOrder/:id",
      component:PayOrder,
      meta:{ checkLogin:true }
    },
    {
      path:"/paySucess/:id",
      component:paySuccess,
      meta:{ checkLogin:true}
    },
    {
      path:"/VipCenter",
      component:VipCenter,
      meta:{ checkLgin: true}
    },
    {
      path:"/orderList",
      component:orderList,
      meta:{ checkLgin: true }
    },
    {
      path:"/orderDetail/:id",
      component:orderDetail,
      meta:{ checkLgin: true }
    }
  ]
})

//增加导航守卫（路由守卫）全局判断是否登录（登录保持）
 router.beforeEach((to,from,next)=>{
  //  在每次有页面跳转的时候，存储跳转之前的页面路径(存储在全局仓库vuex的store中)
  store.commit("saveFromPath",from.path)
  
    if(to.meta.checkLogin == true){
        //发请求判断是否登录(同页面不需要用this.$axios)
      axios.get("site/account/islogin").then(response=>{

        if(response.data.code=="nologin"){
          // 没有登录则返回登录页
          // console.log(response.data.code);
            next("/login")
        }else{
          //   登录则前往结算页
          // console.log(response.data.code);
      
            next()
        }
     })
    }else{
      next()
  }
 
     
 
 })





// 导入全局功能组件------------------------------------
// 1引入懒加载
import VueLazyload from 'vue-lazyload'
//注册VueLazyload,在node环境下需要手动注册
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: require('./img/lazyload.gif'),
  // 导入图片，必须要用require
  loading: require('./img/lazyload2.gif'),
  attempt: 1
})

//2导入日期格式化工具
import moment from "moment";
  
// 3导入iView组件
import iView from 'iview';
  // iview的css
import 'iview/dist/styles/iview.css';
//注册iView,在node环境下需要手动注册
Vue.use(iView);

// 4导入放大镜
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 5导入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//6导入axios,配置全局axios
import axios from "axios";
// 配备基地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
// 将axios组件放至vue原型上，可以避免多页面重复引用(this的指向为Vue的时候：this.$axios引用 )
Vue.prototype.$axios=axios

//让ajax携带cookie
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials = true;
// 导入功能组件------------------------------------



//导入vuex（状态管理）
import Vuex from 'vuex'
Vue.use(Vuex)
  // 实例化仓库 用来保存数据------------------------------------------------
  const store = new Vuex.Store({
  //  存储的数据
    state:{
      // 数据常驻：从本地存储把商品信息读取出来，没有则赋值为空对象
      carDate:JSON.parse(window.localStorage.getItem("goodsinfo")) || {},
      isLogin:false,
      fromPath:""
    },
    // 方法
    mutations:{
      // 触发方法(参数之间用逗号隔开),视情况传入多少个参数)
      // increment(state,n){
      //   // count累加  累加步长n
      //   state.count +=n
      // }
      // 设置参数(方法第一个参数均为默认的state)
      addgoods(state,goodInfo){
        // 如果传过来的id不存在，即新增，存在即累加（id为商品id，num为商品数量）
        if(state.carDate[goodInfo.goodid]== undefined){
           // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
          Vue.set(state.carDate,goodInfo.goodid,goodInfo.goodnum)
        }else{
          state.carDate[goodInfo.goodid] += goodInfo.goodnum
        } 
      },
      // 覆盖购物车数量信息
      updateGoodsNum(state,goodInfo){
        // 直接把在购物车修改后的商品和商品数量传过来，覆盖原数据
        state.carDate[goodInfo.goodid]=goodInfo.goodnum
      },
      delete(state,id){
        // 如何删除对象中的属性
        // delete 删除对象中的属性
        // delete state.cartDate[goodId];
        // delete 删除的属性不会触发视图更新
        // 需要调用Vue.delete方法才可以
        Vue.delete(state.carDate,id)
      },
      changeloginstatus(state,loginstatus){
        state.isLogin=loginstatus
      },
      // 存储页面路径
      saveFromPath(state,frompath){
        state.fromPath=frompath
      }
    },
    // vuex中的计算属性（类似于vue中的computed）
    getters:{
      goodsCont:state=>{
        let num=0;
        //  循环数据对象
        for (const key in state.carDate) {
            num+= state.carDate[key]
        }
        //当购物车数量超过99，显示为99+
        if(num>99){
          num="99+"
        }
        return num
      }
    }
  })

//关闭或刷新浏览器时存储商品信息
 window.onbeforeunload=function(){
   window.localStorage.setItem("goodsinfo",JSON.stringify(store.state.carDate))
 }
 
// 定义全局过滤器
Vue.filter('filterDate', function (val,format) {
  if(format != undefined){
    // console.log(format);
    return moment(val).format(format);
  }else{
    return moment(val).format("YYYY年MM月DD日");
  }
  
})


//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

// 实例化app，并挂载路由
new Vue({
  el: "#app",
  router,
  // 仓库对象，属性名为store
  store,
  render: h => h(App),
  beforeCreate() {
    
    // 每次刷新网页之前判断是否处在登录状态
    axios.get("/site/account/islogin").then(res=>{
      if(res.data.code=="logined"){
        // 登录状态默认为false，如果处于已登录状态，则改为true
        store.state.isLogin =true
      }else{}
    })
  },
})