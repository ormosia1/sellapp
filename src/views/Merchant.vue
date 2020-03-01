<template>
    <div class="Box">
        <div class="top">
            <div class="topBox">
                <div class="top_left_box">
                    <p class="title">{{data.name}}</p>
                    <!-- 评分 -->
                    <div class="grade">
                        <Rate allow-half v-model="valueHalf" />
                        <span class="sellCount">({{data.sellCount}})月售单</span>
                    </div>
                </div>
                <!-- 右边收藏爱心 -->
                <div class="top_right_box">收藏</div>
            </div>
            <div class="bottomBox">
                <!-- 起送价 -->
                <div class="list">
                    <p>起送价</p>
                    <p><span>{{data.minPrice}}</span>元</p>
                </div>
                <div class="list">
                    <p>商家配送</p>
                    <p><span>{{data.deliveryPrice}}</span>元</p>
                </div>
                <div class="list">
                    <p>平均配送时间</p>
                    <p><span>{{data.deliveryTime}}</span>分钟</p>
                </div>
            </div>
        </div>
        <!-- 活动与公告 -->
        <div class="bulletin">
            <div class="title">公告与活动</div>
            <div class="list red">{{data.bulletin}}</div>
            <div class="list" v-for="(v,i) in data.supports" :key="i">{{v.description}}</div>
        </div>
        <!-- 商家实景 -->
        <div class="pics">
            <div class="title">商家实景</div>
            <div>
                <div class="img" v-for="(v,i) in data.pics" :key="i">
                    <img :src="v" alt="">
                </div>
            </div>
        </div>
        <!-- 商家信息 -->
        <div class="info">
            <div class="title">商家信息</div>
            <div class="list" v-for="v in data.infos" :key="v.name">{{v}}</div>
        </div>
    </div>
</template>

<script>
    import {getSeller} from '../api/apis.js'; 
    export default {
        data () {
            return {
                valueHalf: 4.0,
                data:{
                    imgs:[]
                }
            }
        },
        created(){
            getSeller().then(res=>{
                console.log(res.data.data);
                this.data = res.data.data;
            })
        }
    }
</script>

<style lang="less" scoped>
.Box{
    background: #f4f5f7;
    margin-bottom: 60px;
    .top{
        border-bottom: 1px solid #ddd;
        background: #fff;
        .topBox{
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px solid #ddd;
            .top_left_box{
                padding: 10px 0;
            }
        }
        .bottomBox{
            display: flex;
            text-align: center;
            .list{
                flex: 1;
                border-right: 1px solid #ddd;
                margin: 20px 0;
                p{
                    span{
                        font-size: 30px;
                        font-weight: lighter;
                    }
                }
            }
        }
    }
    .bulletin,.info,.pics{
        margin-top: 15px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        background: #fff;
        .title{
            padding: 10px 10px 0px 10px;
            font-size: 16px;
            color: #000;
            font-weight: bold;
        }
        .list{
            margin: 0px 20px;
            border-bottom: 1px solid #ddd;
            padding: 10px 15px;
        }
        .list:last-child{
            border: 0;
        }
        .red{
            color: red;
            line-height: 24px;
        }
    }
    .pics{
        div{
            display: flex;
            flex-wrap: wrap;
            margin: 0 5px;
            .img{
                margin-left: 10px;
                margin-bottom: 10px;
                width: 29%;
                height: 70px;
                img{
                    width: 100%;
                    height: 100%;
                    flex: 1;
                }
            }
        }
    }
}
</style>