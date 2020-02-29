<template>
<div>
    <div class="goods-div">
        <div class="left-div">
            <ul class="content">
                <div v-for="(v,i) in data" :key="i" @click="getCategory(i)" :class="{selected : curSelected==i}">
                    <img v-show="v.type == 1" src="../assets/imgs/discount_1@2x.png" alt="">
                    <img v-show="v.type == 2" src="../assets/imgs/decrease_1@2x.png" alt="">
                    <p>{{ v.name }}</p>
                </div>
            </ul>
        </div>
        <div class="right-div">
            <ul class="content">
                <div v-for="(v,i) in data" :key="i">
                    <div class="titleName">{{v.name}}</div>
                    <div>
                        <div class="contentBox" v-for="(item,index) in v.foods" :key="index" :id="index">
                            <div class="headImg">
                                <img :src='item.image' alt="">
                            </div>
                            <div class="desc">
                                <p class="title">{{item.name}}</p>
                                <p class="description">{{item.description}}</p>
                                <p class="sell">月销{{item.sellCount}}份 好评率{{item.rating}}%</p>
                                <p class="price">￥{{item.price}}<span></span></p>
                            </div>
                            <Icon type="ios-add-circle" size='22'/>                            
                        </div>
                    </div>
                </div>
            </ul>
        </div>
        <router-view></router-view>
        <!-- 二级路由出口 -->
    </div>
</div>
</template>

<script>
    import {getSeller,getGoods} from '../api/apis.js';   //es6 要用{}解构
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                foods:'',
                curSelected:0,
                data:{
                    id:'',  //商家id
                    goods:'',   //商品分类中的每一个商品
                    goodsName:'',   //每一个商品名称
                }
            }
        },
        created(){
            // 获取id
            getSeller().then(res=>{
                this.data.id = res.data.data.id;
            });
            // 获取商品列表
            getGoods(this.data.id).then(res=>{
                console.log(res.data.data)
                this.data = res.data.data;
                this.data.forEach((v) => {
                   this.foods = v.foods
                    // console.log("v.name="+v.name,'v.foods=',v.foods)
                });
            });
        },
        mounted(){
            new BScroll(document.querySelector('.left-div'),{
                click:true  //允许容器点击
            });   //左侧滚动
            this.rightDiv = new BScroll(document.querySelector('.right-div'));   //左侧滚动
        },
        methods:{
            getCategory(i){
                this.curSelected = i;
                console.log(i);
                this.rightDiv.scrollToElement(document.getElementById(i),400)
            },
        }
    }
</script>

<style lang="less" scoped>
.selected{
    background: #fff;
}
.goods-div{
    display: flex;
    height: 450px;
    .left-div{
        height: 100%;
        width: 120px;
        background: #f4f5f7;
        overflow: scroll;
        // margin-bottom: 60px;
        div{
            // height: 60px;
            display: flex;
            align-items: center;
            padding: 15px 0;
            margin:  0 10px;
            border-bottom: 1px solid #ddd;
            text-align: center;
            img{
                width: 15px;
            }
        }
        div:last-child{
            border-bottom: 0;
        }
    }
    .right-div{
        width: 100%;
        background: #f4f5f7;
        overflow: scroll;
        // margin-bottom: 60px;
        div{
            .titleName{
                height: 30px;
                line-height: 30px;
                padding-left: 15px;
                background: #f4f5f7;
            }
            div{
                background: #fff;
                .contentBox{
                    height: 120px;
                    display: flex;
                    margin: 0 26px;
                    padding: 26px 0;
                    color: darkgrey;
                    position: relative;
                    background: #fff;
                    border-bottom: 1px solid #ddd;
                    .headImg{
                        width: 70px;
                        height: 70px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .desc{
                        width: 95px;
                        margin-left: 10px;
                        position: relative;
                        .title{
                            width: 100%;
                            font-size: 16px;
                            font-weight: bold;
                            color: #000;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        };
                        .sell{
                            width: 100%;
                            font-size: 12px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .description{
                            width: 100%;
                            font-size: 12px;
                            overflow:hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        .price{
                            font-size: 16px;
                            font-weight: bold;
                            color: #f00;
                        }
                    }
                    // 图标
                    .ivu-icon{
                        position: absolute;
                        bottom: 15px;
                        right: 10px;
                    }
                }
                .contentBox:last-child{
                    border: 0;
                }
            }
            
        }
    }
}

</style>