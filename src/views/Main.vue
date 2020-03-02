<template>
    <div>
        <div class="headBox">
            <div class="header" :style="{backgroundImage:'url('+data.avatar+')'}">
                <div class="headImg">
                    <img :src='data.avatar' alt="">
                </div>
                <div class="desc">
                    <p class="title">{{data.name}}</p>
                    <p class="deliveryman">{{data.description}} / {{data.deliveryTime}}分钟送达</p>
                    <p class="applyActivities">{{data.supports ? data.supports[0].description : ""}}</p>
                </div>
                <div class="five">{{data.ratingCount}}个 ></div>
                <div class="notice">{{data.bulletin}}</div>
            </div>
            <div class="nav-bar">
                <router-link to="/goods" active-class="colorRed">商品</router-link>
                <router-link to="/evaluate" active-class="colorRed">评价</router-link>
                <router-link to="/merchant" active-class="colorRed">商家</router-link>
            </div>
        </div>
        <!-- 头部 -->
        <div class="content">
            <router-view></router-view>
        </div>
        <!-- 尾部 -->
        <div class="footer" @click="isShow = !isShow">
            <div class="shopCar">
                <div class="icon">
                    <img src="../assets/imgs/shopCar01.png" alt="">
                </div>
                <div class="price">￥{{this.$store.getters.getPrice}}</div>
            </div>
            <p>另需配送费￥{{data.deliveryPrice}}元</p>
            <div class="btn btnOrange" v-if="this.$store.getters.getPrice >=20">去结算</div>
            <div class="btn" v-else-if="this.$store.getters.getPrice <20 && this.$store.getters.getPrice >0">差{{20-(this.$store.getters.getPrice)}}元起送</div>
            <div class="btn" v-else>￥20起送</div>
        </div>

        <!-- 购物车面板 -->
        <transition  name="slide-fade">
            <div class="shopCarPanel" v-show="isShow">
                <div class="shopCar-top">购物车</div>
                <div class="shopCar-bottom"  v-for="(v,i) in getGoodsList" :key="i">
                    <div class="shopCar-box" v-for="(value,index) in v.foods" :key="index">
                        <div class="shopCar-desc" v-show="value.num > 0">{{value.name}}
                            <!-- <p></p> -->
                        </div>
                        <div v-if="value.num > 0" class="shopCar-price">￥{{value.num*value.price}}</div>                   
                        <div v-if="value.num > 0" class="shopCar-icon">
                            <Icon type="md-remove-circle" size='22' v-if="value.num >0" @click="clickChange(-1,value.name)"/>
                            <span v-if="value.num >0">{{value.num}}</span>
                            <Icon type="md-add-circle" size='22' @click="clickChange(1,value.name)"/>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {getSeller} from '../api/apis.js';   //es6 要用{}解构
    export default {
        data(){
            return{
                isShow:false,
                list:[],
                data:{
                    id:'',  //商家id
                    // description:'', //商品特色活动
                }
            }
        },
        created(){
            getSeller().then(res=>{
                // console.log(res.data.data);
                this.data = res.data.data;
            })

            // console.log(this.$store)
        },
        computed:{
            // 获取商品列表的计算属性
            getGoodsList(){
                return this.$store.state.goodsList;
            },
        },
        methods:{
                        // 点击+|-
            clickChange(code,name){
                for(let i of this.getGoodsList){
                    for(let v of i.foods){
                        // 商品名称去重
                        if(name == v.name){
                            v.num+=code
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
div{

.header{
    height: 140px;
    background-size: cover;
    display: flex;
    padding: 26px 0 0 26px;
    color: #fff;
    position: relative;
    .headImg{
        width: 70px;
        height: 70px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
    .desc{
        margin-left: 10px;
        .title{
            padding-left: 40px;
            background: url('../assets/imgs/brand@2x.png') no-repeat;
            background-size: 36px;
            background-position: 0 center;
            font-size: 3vh;
            font-weight: bold;
        };
        .applyActivities{
            padding-left: 20px;
            background: url('../assets/imgs/decrease_1@2x.png') no-repeat;
            background-size: 16px;
            background-position: 0 center;
            font-size: 12px;
        }
    }
    .five{
        width: 55px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        top: 65px;
        right: 30px;
        background: rgba(0, 0, 0,0.3);
        border-radius: 20px;
    }
    .notice{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: absolute;
        bottom: 0px;
        left: 0;
        height: 30px;
        line-height: 30px;
        padding: 0px 20px 0 40px;
        background: rgba(0, 0, 0,0.3);
        background-image: url('../assets/imgs/bulletin@2x.png');
        background-repeat: no-repeat;
        background-position: 10px center;
        background-size: 26px;
    }
}
.nav-bar{
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ddd;
    a{
        color: #515a6e;
    }
    .colorRed{
        color: red;
    }
}
// 中间
.content{
    height: 100%;
}
.footer{
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index:100;
    background: #141c27;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shopCar{
        width: auto;
        height: 30px;
        line-height: 30px;
        position: relative;
        color: #7d8086;
        .icon{
            width: 53px;
            position: absolute;
            top: -22px;
            left: 5px;
            text-align: center;
            background: #141c27;
            padding: 6px;
            border-radius: 50%;
            img{
                width: 100%;
            }
        }
        .price{
            margin-left: 54px;
            padding-right: 5px;
            font-size: 3vh;
            border-right: 1px solid #eee;
            font-weight: bold;
        }
    }
    p{
        flex: 1;
        margin-left: 10px;
    }
    .btn{
        // width: 80px;
        min-width: 80px;
        padding: 0 5px;
        height: 100%;
        text-align: center;
        line-height: 60px;
        background: #2b343b;
        font-size: 16px;
    }
    .btnOrange{
        background: orange;
    }
}
// 购物车面板
    .shopCarPanel{
        width: 100%;
        height: 200px;
        background: rgba(255, 255, 255, 0.9);
        position: fixed;
        bottom: 60px;
        left: 0px;
        overflow: scroll;
        color: #333333;
        .shopCar-top{
            width: 100%;
            height: 40px;
            background: #f4f4f4;
            line-height: 40px;
            padding-left: 15px;
            border-top: 1px solid #ddd;
        }
        .shopCar-bottom{
            .shopCar-box{
                display: flex;
                justify-content: space-between;
                line-height: 30px;
                background: #fff;
                padding: 0 10px 0 15px;
                // border-bottom: 1px solid #ddd;
                .shopCar-desc{
                    width: 80px;
                }
                .shopCar-icon{
                    .ivu-icon{
                        color: #ddd;
                    }
                    .ivu-icon-md-add-circle{
                        color: rgb(248, 212, 145);
                    }
                }
            }
        }
    }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
</style>