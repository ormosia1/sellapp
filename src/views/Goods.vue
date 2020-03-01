<template>
<div>
    <div class="goods-div">
        <div class="left-div">
            <ul class="content">
                <div v-for="(v,i) in getGoodsList" :key="i" @click="getCategory(i)" :class="{selected : curSelected==i}">
                    <img v-show="v.type == 1" src="../assets/imgs/discount_1@2x.png" alt="">
                    <img v-show="v.type == 2" src="../assets/imgs/decrease_1@2x.png" alt="">
                    <p>{{ v.name }}</p>
                </div>
            </ul>
        </div>
        <div class="right-div">
            <ul class="content">
                <div v-for="(v,i) in getGoodsList" :key="i"  :id="i">
                    <div class="titleName">{{v.name}}</div>
                    <div>
                        <div class="contentBox" v-for="(item,index) in v.foods" :key="index">
                            <div class="headImg">
                                <img :src='item.image' alt="">
                            </div>
                            <div class="desc">
                                <p class="title">{{item.name}}</p>
                                <p class="description">{{item.description}}</p>
                                <p class="sell">月销{{item.sellCount}}份 好评率{{item.rating}}%</p>
                                <p class="price">￥{{item.price}}<span></span></p>
                            </div>
                            <div class="icon">
                                <Icon type="md-remove-circle" size='22'/>
                                <span>{{item.num}}</span>
                                <Icon type="md-add-circle" size='22' @click="add(1,item.name)"/>                            
                            </div>
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
    import {getGoods} from '../api/apis.js';   //es6 要用{}解构
    import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                // foods:'',
                curSelected:0,
                num:0,
                data:{
                    id:'',  //商家id
                    goods:'',   //商品分类中的每一个商品
                    goodsName:'',   //每一个商品名称
                }
            }
        },
        created(){
            // 获取商品列表
            getGoods().then(res=>{
                this.$store.commit('initGoodsList',res.data.data);
            });
            
            console.log(this.$store)
            console.log(this.$store.getters)
        },
        mounted(){
            new BScroll(document.querySelector('.left-div'),{
                click:true  //允许容器点击
            });   //左侧滚动
            this.rightDiv = new BScroll(document.querySelector('.right-div'),{
                click:true,
                probeType:3
            });   //右侧滚动

            this.rightDiv.on('scroll',({y})=>{
                let _y = Math.abs(y)
                for(let divObj of this.getDivMath){
                    if( _y >= divObj.min && _y < divObj.max){
                        this.curSelected = divObj.index;
                        return //结束剩下的所有缓存
                    }
                }
            })
        },
        // 计算属性进行运算结果会缓存，取10次或者一万次，他都是读取第一次运算完的缓存结果
        // 计算属性因为是属性，所以没法传值。 所以必须有return。不能作为事件句柄
        // 它的性能比methods高N倍，因为他不会重复运算。除非内部引用的数据发生了变化，才会重新计算一次。
        methods:{
            getCategory(i){
                 this.curSelected= i;
                this.rightDiv.scrollToElement(document.getElementById(i),400)
            },

            // 点击+
            add(code,name){
                console.log(code,name)
                for(let i of this.getGoodsList){
                    for(let v of i.foods){
                        if(name == v.name){
                            v.num++
                            // this.num = v.num;
                            // this.$store.commit('changeNum',name,v.num)
                        }
                    }
                }
            // console.log(this.num);
            }
        },

        // 计算属性
        computed:{
            // 获取每个div的高度
            getDivMath(){
                let arr = [];   //定义一个数组保存div的高度
                let total = 0 //之前div所有高度的累加
                for(let i = 0; i<this.getGoodsList.length ; i++){
                    // 定义当前div的高度
                    let curDivHeight = document.getElementById(i).offsetHeight;
                    arr.push({min:total,max:total+curDivHeight,index:i})
                    //每循环一次累计之前div的高度
                    total+=curDivHeight;
                }
                return arr;
            },

            // 获取商品列表的计算属性
            getGoodsList(){
                return this.$store.state.goodsList;
                // this.$store.commit('initGoodsList',res.data.data);
            }
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
                    .icon{
                        position: absolute;
                        bottom: 10px;
                        right: -10px;
                        span{
                            margin: 0 5px;
                        }
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