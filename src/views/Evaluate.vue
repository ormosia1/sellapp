<template>
    <div id="evaluate">
        <!-- 评星 -->
        <div class="topBox">
            <div class="left-div">
                <p>3.9</p>
                <p>综合评分</p>
                <p>高于周边商店69.2%</p>
            </div>
            <div class="right-div">
                <p>
                    <span>服务态度</span>
                    <Rate show-text :value.sync="valueCustomText1">
                        <span style="color: #f5a623">{{ valueCustomText1 }}</span>
                    </Rate>
                </p>
                <p>
                    <span>服务态度</span>
                    <Rate show-text :value.sync="valueCustomText2">
                        <span style="color: #f5a623">{{ valueCustomText2 }}</span>
                    </Rate>
                </p>
                <p><span>送达时间</span>44分钟</p>
            </div>
        </div>
        <div class="content">
            <div class="title">
                <div class="top">
                   <i-button type="primary">全部<span class="font">{{list.count}}</span></i-button>
                   <i-button type="primary">满意<span class="font">{{list.count}}</span></i-button>
                   <i-button type="primary">不满意<span class="font">{{list.count}}</span></i-button>
                </div>
                <div class="bottom">
                    <p>只看有内容的评价</p>
                </div>
            </div>
            <!-- 评论 -->
            <div class="evaluateBox">
                <div class="box" v-for="(v,i) in list" :key="i">
                    <img class="headImg" :src='v.avatar' alt="">
                    <div class="eva-right-div">
                        <div class="eva-head">
                            <div class="name">{{v.username}}</div>
                            <div class="time">{{formatting}}</div>
                        </div>
                        <!-- 评价的星星 -->
                        <div class="eva-start">
                             <Rate class="rate" disabled allow-half v-model="v.score" />
                            <span class="arrive">{{v.deliveryTime}}分钟到达</span>
                        </div>
                        <div class="eva">{{v.text}}</div>
                        <div class="label">
                            <div v-for="(item,index) in v.recommend" :key="index">{{item}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getRatings} from '../api/apis.js';
export default {
        data () {
            return {
                list:{
                    rateTime:'',
                    count:'',   //定义人数
                },
                formatting:{},
                valueText: 3,
                valueCustomText1: 3.8,
                valueCustomText2: 4.0,
            }
        },
        created(){
            getRatings().then(res=>{
                console.log(res.data.data)
                this.list = res.data.data;
                for(let i=0; i<this.list.length;i++){
                    this.list.rateTime = this.list[i].rateTime;
                    var date = new Date(this.list.rateTime);
                    var year = date.getFullYear();  //年
                    var month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                    var day = date.getDate();
                    var hour = date.getHours();
                    var minute = date.getMinutes();
                    this.formatting = year+'-'+month+'-'+day+' '+hour+':'+minute;
                    // console.log(this.formatting);//2018-9-1 0:0:0
                    // 评论人数
                    this.list.count = i;
                }
                    console.log(this.list.count)
                // for(let i in this.list){
                //     // this.count++;
                //     this.list.rateTime = this.list[i].rateTime;
                //     var date = new Date(this.list.rateTime);
                //     var year = date.getFullYear();  //年
                //     var month = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
                //     var day = date.getDate();
                //     var hour = date.getHours();
                //     var minute = date.getMinutes();
                //     this.formatting = year+'-'+month+'-'+day+' '+hour+':'+minute;
                //     console.log(this.formatting);//2018-9-1 0:0:0
                //     // console.log(year,month,day)
                // }
                // console.log(this.count)
            })
        }
};
</script>

<style lang="less">
#evaluate{
    background: #f4f5f7;
    .topBox{
        // height: 100px;
        display: flex;
        padding: 10px 0;
        align-items: center;
        border-bottom: 1px solid #ddd;
        background: #fff;
        .left-div{
            border-right: 1px solid #ddd;
            text-align: center;
            padding: 0 5px;
            p:first-child{
                font-size: 26px;
                color: orange;
                line-height: 1;
            }
            p:last-child{
                font-size: 12px;
            }
        }
        .right-div{
            margin-left: 10px;
            // overflow: hidden; 
            // 星星 
            span{
                margin-right: 5px;
            }
            .ivu-rate{
                font-size: 18px;
            }
            .ivu-rate-star{
                margin-right: 0px;
            }          
        }
    }
    .content{
        border-top: 1px solid #ddd;
        background: #fff;
        // 满意按钮
        margin-top: 15px;
        .title{
            padding: 10px 10px 0 10px;
            border-bottom: 1px solid #ddd;
            .top{
                padding-bottom: 10px;
                border-bottom: 1px solid #ddd;
                .ivu-btn{
                    font-size: 12px;
                    padding: 5px;
                    margin-right: 5px;
                    border-radius: 0;
                    border: 0;
                }
                .ivu-btn-primary:first-child{
                    background: #00a0dc;
                }
                .ivu-btn-primary:nth-child(2){
                    background: #ccecf7;
                }
                .ivu-btn-primary:last-child{
                    background: #eaebed;
                }
            }
            .bottom{
                p{
                    height: 40px;
                    line-height: 40px;
                }
            }
        }
        .evaluateBox{
            .box{
                display: flex;
                padding: 20px 0;
                border-bottom: 1px solid #ddd;
                margin: 0 15px;
                // 头像
                .headImg{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                .eva-right-div{
                    width: 80%;
                    margin-left: 15px;
                    .eva-head{
                        display: flex;
                        justify-content: space-between;
                        .name{
                            font-size: 12px;
                            color: #000;
                        }
                        .time{
                            font-size: 12px;
                        }
                    }
                    .eva-start{
                        .ivu-rate{
                            font-size: 16px;
                         }   
                        .rate{
                            .ivu-rate-star{
                                margin-right: 0;
                            }
                        }
                        .arrive{
                            margin-left: 5px;
                            font-size: 12px;
                        }
                    }
                    .label{
                        display: flex;
                        flex-wrap: wrap;
                        div{
                            max-width: 70px;
                            padding: 0 5px;
                            font-size: 12px;
                            border: 1px solid #ddd;
                            text-align: center;
                            margin-top: 10px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
}
.rate .ivu-rate{
    // margin-right: 0;
}
</style>