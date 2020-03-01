import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 1. 创建一个vuex的数据仓库，用来存放所有需要交互的数据！
// 以后要交互的数据都存放在这里
var store = new Vuex.Store({     //store： 创建对象实例
        // 存放
        state:{
            name:'张三',
            goodsList:[],// 存放商品页面列表
            nameNum:[],

        },

        // 改变，他是改变state的唯一方式
        // 为什么修改要写在这里？
        //每一个mutation都会接受一个参数state，就指向上面的state
        mutations:{
            changeName(state,name){
                state.name = name //如果要获取修改后的，那就要调用，因为修改在函数里，而函数不调用不会自己执行
            },
            initGoodsList(state,newArr){
                state.goodsList = newArr;
            },
            // 点击加减号修改num（数量）
            // changeNum(state,goodsName,num){
            //     state.goodsName = nameNum;
            // }
        },

        // getters:{
        //     // 设置num
        //     getNum(state,code,foodsName){
        //         for(let i of state.goodsList){
        //             for(let v of i.foods){
        //                 if(foodsName == v.name){
        //                     v.num +=code;
        //                     let num = v.num;
        //                 }
        //             }
        //         }
        //         return 1
        //     }
        // }

        
})    

//所以mutation函数必须手动触发
//参数1：要触发的mutation的名字，参数2：要传入的参数
// store.commit('changeName',name)  //触发一个mutation     //这里的参数2：name指向mutations中函数的函数changeName中的name;实现动态修改
// console.log(store.state.name)

export default store;