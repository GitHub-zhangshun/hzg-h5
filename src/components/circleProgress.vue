<template>
    <div>
        <!-- <canvas :id="id"></canvas>
        <div class="big"></div>
        <div class="small" :style="{color: fillStyle}">{{proportion}}%</div> -->
    </div>    
</template>
<script>
// import {publicFun} from '@/libs/publicFun'
//     export default {
//         data(){
//             return{
//                 //range控件信息
//                 nowRange:0, //用于做一个临时的range
//                 //画布属性
//                 canvasWidth:108,
//                 canvasHeight:108,
//                 //Sin 曲线属性
//                 sx:0,
//                 waveWidth : 0.1 , //波浪宽度,数越小越宽 
//                 waveHeight : 3, //波浪高度,数越大越高
//                 speed : 0.1, //波浪速度，数越大速度越快
//                 xOffset : 10, //波浪x偏移量

//                 //颜色
//                 fillStyle:''
//             }
//         },
//         props:{
//             id:String,
//             proportion:String,
//             showStatus:String
//         },
//         computed:{
//             // 圆属性(圆心)
//             r(){
//                 return this.canvasHeight / 2
//             },
//             //Sin 曲线属性(轴长)
//             axisLength(){
//                 return this.canvasWidth
//             }
//         },
//         mounted(){
//             let that = this
//             switch(publicFun.Pl(this.showStatus)[0].simplify){
//                 case "bid_product_show_raise_underway":
//                 this.fillStyle = '#ff4e30'
//                 break;
//                 case "bid_product_show_raise_finish":
//                 this.fillStyle = '#6cc9b6'
//                 break;
//                 case "bid_product_show_repayment_underway" || "bid_product_show_repayment_underway":
//                 this.fillStyle = '#f09421'
//                 break;
//                 default:
//                 this.fillStyle = '#b3b6b9'
//             }
//             let canvas = document.getElementById(this.id);
//             let ctx = canvas.getContext('2d');            
//             //画布属性
//             canvas.width = this.canvasWidth;
//             canvas.height = this.canvasHeight;             
//             //画圈函数
//             var IsdrawCircled = false;            
//             var drawCircle = function(){
//                 ctx.beginPath();
//                 ctx.lineWidth=10
//                 ctx.arc(that.r+0.5, that.r, that.r, 0, 2 * Math.PI);
//                 ctx.fillStyle="#c7c7c7"
//                 ctx.fill();
//                 ctx.clip(); 
//             }            
//             //画sin 曲线函数
//             var drawSin = function(xOffset){
//                 ctx.save();
//                 var points=[]; //用于存放绘制Sin曲线的点 
//                 ctx.beginPath();
//                 //在整个轴长上取点
//                 for(var x = that.sx; x < that.sx + that.axisLength; x += 20 / that.axisLength){
//                     //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
//                     var y = -Math.sin((that.sx + x) * that.waveWidth + xOffset); 
//                     var dY = that.canvasHeight * (1 - that.nowRange / 100 ); 
//                     points.push([x, dY + y * that.waveHeight]);
//                     ctx.lineTo(x, dY + y * that.waveHeight);  
//                 }            
//                 //封闭路径
//                 ctx.lineTo(that.axisLength, that.canvasHeight);
//                 ctx.lineTo(that.sx, that.canvasHeight);
//                 ctx.lineTo(points[0][0],points[0][1]);
//                 ctx.fillStyle = that.fillStyle
//                 ctx.fill();                
//                 ctx.restore();
//             };            
//             var render = function(){
//                 ctx.clearRect(0, 0, that.canvasWidth, that.canvasHeight); 
//                 if(IsdrawCircled == false){
//                     drawCircle(); 
//                 }
//                 if(that.nowRange <= that.proportion){
//                     var tmp = 1;
//                     that.nowRange += tmp;
//                 } 
//                 if(that.nowRange > that.proportion){
//                     var tmp = 1;
//                     that.nowRange -= tmp;
//                 }                
//                 drawSin(that.xOffset); 
//                 that.xOffset += that.speed;
//                 requestAnimationFrame(render);
//             }           
//             render();  
//         }
//     }
</script>

<style scoped lang="less">
// div{
//     width: 108px;
//     height: 108px;
//     position: relative;
//     margin: 0 auto 20px;
//     canvas{
//         display: block;
//         width: 108px;
//         height: 108px;
//     }
//     .big{
//         position: absolute;
//         top: 4%;
//         left: 4.5%;
//         width: 92px;
//         height: 92px;
//         margin-bottom: 0;
//         background: transparent;
//         border: 4px solid #fff;
//         border-radius: 50%;
//     }
//     .small{
//         margin-bottom: 0;
//         position: absolute;
//         top: 18.5%;
//         left: 19%;
//         width: 68px;
//         height: 68px;
//         background: #fff;
//         border-radius: 50%;
//         font-size: 24px;
//         line-height: 75px;
//     }
// }
</style>