<template>
    <div class="el-row">
        <div class="el-col el-col-24">
            <div class="comp">
                <div class="tmpl routeanimate">
                    <div class="section">
                        <div class="location">
                            <span>当前位置：</span>
                            <router-link to="/index">首页&gt;</router-link> 
                            <router-link to="/VipCenter">会员中心&gt;</router-link> 
                            <router-link to="/orderList">我的订单&gt;</router-link> 
                        </div>
                    </div>
                    <div class="section clearfix">
                        <div class="left-260">
                            <div class="bg-wrap">
                                <div class="avatar-box">
                                    <a href="/user/center/avatar.html" class="img-box">
                                        <img src="../img/lazyload2.gif" alt="">
                                    </a>
                                    <h3>
                                        梧叶
                                    </h3>
                                    <p>
                                        <b>注册会员</b>
                                    </p>
                                </div>
                                <div class="center-nav">
                                    <ul>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-order"></i>
                                                <span>订单管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <router-link to="/orderList">
                                                        <i class="iconfont icon-arrow-right"></i>交易订单
                                                    </router-link>
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <h2>
                                                <i class="iconfont icon-user"></i>
                                                <span>账户管理</span>
                                            </h2>
                                            <div class="list">
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                </p>
                                                <p>
                                                    <a href="#/site/member/center" class="">
                                                        <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                </p>
                                                <p>
                                                    <a href="javascript:void(0)">
                                                        <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="right-auto">
                            <div class="bg-wrap" style="min-height: 765px;">
                                <div class="sub-tit">
                                    <ul>
                                        <li class="selected">
                                            <a href="/user/order-list.html">交易订单</a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- element分页器 -->
                                <el-pagination
                                    background
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pageIndex"
                                    :page-sizes="[10, 15, 20, 25]"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="totalcount">
                                </el-pagination>
                                
                                
                                <div class="table-wrap">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                        <tbody>
                                            <tr>
                                                <th width="16%" align="left">订单号</th>
                                                <th width="10%">姓名</th>
                                                <th width="12%">订单金额</th>
                                                <th width="11%">下单时间</th>
                                                <th width="10%">状态</th>
                                                <th width="12%">操作</th>
                                            </tr>
                                            
                                            
                                            <tr v-for="item in orderdetail" :key="item.id">
                                                <td>{{ item.order_no }}</td>
                                                <!-- 三元表达式 -->
                                                <td align="left">{{ item.accept_name==""?"匿名用户":item.accept_name }}</td>
                                                <td align="left">
                                                    <strong style="color: red;">￥{{item.real_amount}}</strong>
                                                    <br> 在线支付
                                                </td>
                                                <td align="left">{{item.payment_time | filterDate('YYYY:MM:DD HH:mm:ss')}}</td>
                                                <td align="left">
                                                    {{item.statusName}}
                                                </td>
                                                <td align="left">
                                                    <router-link :to="'/orderDetail/'+item.id">查看订单</router-link>
                                                    <br>
                                                    <router-link v-if="item.status == 1" :to="'/payOrder/'+item.id">去付款</router-link>
                                                </td>
                                            </tr>
                                        
                                        
                                        </tbody>
                                    </table>
                                    <div class="page-foot">
                                        
                                    </div>
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
export default {
    name:"orderList",
    data:function(){
        return {
            // 参数页码(让当前页:current-page也绑定这个参数，做到页面和数据一起改变)
            pageIndex: 1,
             // 参数页容量
            pageSize: 10,
            // 订单列表
            orderdetail:{},
             // 总条数
            totalcount:0
        }
    },
    methods:{
        getOrderList(){
             this.$axios.get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
             .then(res=>{
            
            this.orderdetail=res.data.message
            this.totalcount=res.data.totalcount
            })
        },
        // 改变页容量
        handleSizeChange(size){
            // 每次切换页容量的时候展示第一页数据
            this.pageIndex=1
           this.pageSize=size
            this.getOrderList()
           
        },
        // 改变当前页
        handleCurrentChange(index){
            this.pageIndex=index
            
            this.getOrderList()
           
        }
    },
    created() {
       this.getOrderList()  
        
    },
}
</script>

<style>
.sub-tit{
    padding: 0;
}
.avatar-box {
    height: 80px;
}
</style>


