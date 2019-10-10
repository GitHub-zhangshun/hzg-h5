<template>
    <div class="operational_data">
        <div class="header">
            <img src="@/assets/images/Information_disclosure/banner4.jpg" alt="运营天数">
            <ul class="countdown">
                <li>{{diffYears}}</li>
                <li>{{diffDays}}</li>
                <li>{{diffHours}}</li>
            </ul>
        </div>
        <!-- <div class="chooseMonth">
            <ul @click="chooeMonthBtn">
                <li>选择月份</li>
                <li>
                    {{value}}
                </li>
                <li>
                    <i class="icon iconfont icon-qianjin"></i>
                </li>
            </ul>
        </div> -->
        <div class="contain">
            <header><span>借贷概况</span></header>
            <ul>
                <li v-for="(item, index) in typeOne" :key="index">
                    <p>{{item.title}}</p>
                    <p>{{item.textvalue}}</p>
                </li>
            </ul>
            <div class="panel">
                <div>
                    <ul>
                        <li v-for="(item, index) in typeTwo" :key="index">
                            <p>{{((item.textvalue*10000)/100).toFixed(2)}}%</p>
                            <p>{{item.title}}</p>
                        </li>
                    </ul>
                </div>
                <div v-for="(item, index) in typeThree" :key="index">{{item.title}}：<span>{{item.textvalue}}{{item.title=='关联关系借款笔数'?'笔':'元'}}</span></div>
            </div>
        </div>
        <div class="contain" style="padding-bottom:0" >
            <header><span>累计交易金额</span></header>
            <p class="tips">（统计近一年的月度交易额，竖轴为交易额，横轴为月份）</p>
            <ve-line :data="chartDataMoney" :settings="chartSettingLine" :extend="extend" :colors="color" height="300px" :tooltip-visible="false" :legend-visible="false"></ve-line>
        </div>
        <div class="contain cicle">
            <header><span>平台用户概况</span></header>
            <Swipe indicator-color="#777B86">
                <SwipeItem>
                    <div class="chart">
                        <ve-ring :data="chartDataAge" :colors="ageColors" :settings="chartSettings" height="100%" :tooltip-visible="false" :legend-visible="false"><span class="centerTitle">出借人<br>年龄分布</span></ve-ring>
                    </div>
                    <div class="identifying">
                        <ul>
                            <li>人员总数：{{total}}人</li>
                            <li>
                                <span style="background:#DD5F4C"></span>
                                <span>{{chartDataAge.rows[0] && chartDataAge.rows[0].age}}，{{chartDataAge.rows[0] && chartDataAge.rows[0].precent}}人</span>
                            </li>
                            <li>
                                <span style="background:#E1826D"></span>
                                <span>{{chartDataAge.rows[1] && chartDataAge.rows[1].age}}，{{chartDataAge.rows[1] && chartDataAge.rows[1].precent}}人</span>
                            </li>
                            <li>
                                <span style="background:#F09D9A"></span>
                                <span>{{chartDataAge.rows[2] && chartDataAge.rows[2].age}}，{{chartDataAge.rows[2] && chartDataAge.rows[2].precent}}人</span>
                            </li>
                            <li>
                                <span style="background:#EDC0B5"></span>
                                <span>{{chartDataAge.rows[3] && chartDataAge.rows[3].age}}，{{chartDataAge.rows[3] && chartDataAge.rows[3].precent}}人</span>
                            </li>
                        </ul>
                    </div>
                </SwipeItem>
                <SwipeItem>
                    <div class="sexImg">
                        <ul>
                            <li>
                                <div>
                                    <img src="@/assets/images/Information_disclosure/man.png" alt="">
                                </div>
                                <p style="color:#4360DD">{{sexMan}}人</p>
                            </li>
                            <li>
                                <div>
                                    <img src="@/assets/images/Information_disclosure/women.png" alt="">
                                </div>
                                <p style="color:#DC4D77">{{sexWoman}}人</p>
                            </li>
                        </ul>
                    </div>
                    <div class="identifying">
                        <ul>
                            <li class="sex">出借人性别分布</li>
                            <li>
                                <span style="background:#4360DD"></span>
                                <span>男性，&emsp;{{sexMan}}人</span>
                            </li>
                            <li>
                                <span style="background:#DC4D77"></span>
                                <span>女性，&emsp;{{sexWoman}}人</span>
                            </li>
                        </ul>
                    </div>
                </SwipeItem>
            </Swipe>            
        </div>
        <div class="riskControl">
            <header><span>其他数据</span><span></span> </header>
            <ul>
                <li>逾期金额： <span>{{overdueAmount}}元</span></li>
                <li>逾期笔数： <span>{{number}}笔</span></li>
                <li>逾期90天（不含）以上金额 ：<span>{{over_90_money}}元</span></li>
                <li>逾期90天（不含）以上笔数 ：<span>{{over_90_number}}笔</span></li>
                <li>累计代偿金额： <span>{{accumulatedCompensationAmount}}元</span></li>
                <li>累计代偿笔数： <span>{{accumulatedCompensationNumber}}笔</span></li>
                <li>项目逾期率： <span>{{project}}%</span></li>
                <li>金额逾期率： <span>{{money}}%</span></li>
            </ul>
            
        </div>
        <div class="borrow_money">
            <header><span>出借人收费标准</span><span></span></header>
            <ul>	
                <li>
                    <div>充值费用</div>
                    <div>平台目前不收取充值手续费</div>
                </li>
                <li style="background:#F8F7F5">
                    <div>提现费用</div>
                    <div>T+1提现不收取手续费<br>T+0提现不收取手续费</div>
                </li>
                <li>
                    <div>利息服务费用</div>
                    <div>平台目前不向出借人收取利息服务费用</div>
                </li>
            </ul>
        </div>
        <Popup v-model="show" position="bottom" :close-on-click-overlay='false'>
            <DatetimePicker
                v-model="currentDate"
                type="year-month"  
                :min-date="minDate"     
                :max-date="maxDate"         
                @confirm="onConfirm"
                @cancel="onCancel"
                :formatter="formatter"
            />
        </Popup>
    </div>
</template>

<script>
import { Popup,Swipe, SwipeItem,DatetimePicker } from 'vant';
import { indexApi } from '@/api/statistics'
    export default {
        components:{
            Popup,
            DatetimePicker,
            Swipe,
            SwipeItem
        },
        data () {
            this.extend = {
                series: {
                    areaStyle:{
                        color:['#FFF5F3']
                    }
                }
            }
            this.chartSettingLine = {
                area:true,
                yAxisName:['亿'],
                yAxisType:['']
            }
            this.chartSettings = {
                area: true,
                label:"false",
                radius: [40, 70],
                offsetY: 100,
                hoverAnimation:false,
            }
            return { 
                typeOne:[],   
                typeTwo:[],   
                typeThree:[],   
                overdueAmount:'',
                number:'',
                over_90_money:'',
                accumulatedCompensationAmount:'',
                over_90_number:'',
                accumulatedCompensationNumber:'',
                project:'',
                money:'',
                sexMan:'',
                sexWoman:'',
                // 年数
                diffYears:'',
                //天数
                diffDays:'',
                //小时
                diffHours:'',
                ageColors:['#DD5F4C','#E1826D','#F09D9A','#EDC0B5'],
                sexColors:['#DD5F4C','#E1826D'],
                color:['#F58E9A'] ,       
                chartDataMoney: {
                    columns: ['日期', '交易量'],
                    rows: []
                },
                chartDataAge:{
                    columns: ['age', 'precent'],
                    rows: []
                },
                show:false,
                currentDate: new Date((new Date()).getMonth()==0?(new Date()).getFullYear()-1:(new Date()).getFullYear(),(new Date()).getMonth()),
                minDate:new Date(2015,4),
                value:this.month(),
                //总人数
                total:''
            }
        },
        computed:{
            maxDate(){
                let a = new Date()
                var year = a.getMonth()==0?a.getFullYear()-1:a.getFullYear();
                var month = a.getMonth()-1;
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                return (new Date(year,month));
            }
        },
        mounted(){
            indexApi.GetStartRunTime()
            .then(data=>{
                var seconds = 1000;
                var minutes = seconds * 60;
                var hours = minutes * 60;
                var days = hours * 24;
                var years = days * 365;
                var today = new Date();
                var todayYear = today.getFullYear();
                var todayMonth = today.getMonth()+1;
                var todayDate = today.getDate();
                var todayHour = today.getHours();
                var todayMinute = today.getMinutes();
                var todaySecond = today.getSeconds();
                var t1 = new Date(data.result); //北京时间2016-12-1 00:00:00
                // var t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
                var t2 = new Date()
                var diff = t2-t1;
                var diffYears = Math.floor(diff/years);
                var diffDays = Math.floor((diff/days)-diffYears*365);
                var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
                this.diffYears = diffYears
                this.diffDays = diffDays
                this.diffHours = diffHours
            })
            .catch( ()=> {})
            this.dataSJ(this.value)
        },
        methods:{           
            dataSJ(value){
                // 借贷概况
                this.typeOne=[]
                this.typeTwo=[]  
                this.typeThree=[] 
                this.chartDataMoney.rows = []
                this.chartDataAge.rows = []
                let oldTimestamp = value.split('-')
                let timeYear = oldTimestamp[1]==12 ? Number(oldTimestamp[0]) + 1 : oldTimestamp[0]
                let timeMonth = Number(oldTimestamp[1])+1 <= 9 ? `0${Number(oldTimestamp[1])+1}`: (Number(oldTimestamp[1])+1 > 12 ? `01`: `${Number(oldTimestamp[1])+1}`)
                let newTimestamp = new Date(`${timeYear}/${timeMonth}/01 00:00:00`).getTime()
                //累计交易金额
                indexApi.cumulativeTransactionMoney(newTimestamp).then((data)=>{
                    if(data.code==0){
                        for(let i = 0;i<data.result.length;i++ ){
                            this.chartDataMoney.rows.push({ '日期': data.result[i].monthStr, '交易量': data.result[i].money/100000000},)
                        }
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })
                //借贷概况
                indexApi.loanSituation(newTimestamp).then((data)=>{
                    if(data.code==0){
                        for(let i = 0;i<8;i++){
                            this.typeOne.push(data.result[i])
                        }
                        for(let i = 8;i<10;i++){
                            this.typeTwo.push(data.result[i])
                        }
                        for(let i = 10;i<12;i++){
                            this.typeThree.push(data.result[i])
                        }
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })
                //其他数据
                indexApi.userOverdue(newTimestamp).then((data)=>{
                    if(data.code==0){
                        for(let i = 0;i<data.result.length; i++){
                            switch (data.result[i].title){
                                case '逾期金额（元）':
                                this.overdueAmount = data.result[i].textvalue
                                break;
                                case '逾期笔数':
                                this.number = data.result[i].textvalue
                                break;
                                case '逾期90天（不含）以上借款金额（元）':
                                this.over_90_money = data.result[i].textvalue
                                break;
                                case '累计代偿金额':
                                this.accumulatedCompensationAmount = data.result[i].textvalue
                                break;
                                case '逾期90天（不含）以上笔数':
                                this.over_90_number = data.result[i].textvalue
                                break;
                                case '累计代偿笔数':
                                this.accumulatedCompensationNumber = data.result[i].textvalue
                                break;
                                case '项目逾期率':
                                this.project = data.result[i].textvalue*100
                                break;
                                case '金额逾期率':
                                this.money = data.result[i].textvalue*100
                                break;
                            }
                        }                        
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })
                //年龄分布
                indexApi.userAge(newTimestamp).then((data)=>{
                    if(data.code==0){
                        let totalNumber = 0
                        for(let i = 0;i<data.result.length;i++ ){
                            this.chartDataAge.rows.push({ 'age': data.result[i].title, 'precent': data.result[i].textvalue})
                            totalNumber = totalNumber + data.result[i].textvalue
                        }
                        this.total = totalNumber
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })
                //性别分布
                indexApi.userSex(newTimestamp).then((data)=>{
                    if(data.code==0){
                        this.sexMan = data.result[0].textvalue
                        this.sexWoman = data.result[1].textvalue
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })
            },
            //选择的时间+1天
            month(){
                let a = new Date()
                var year = a.getMonth()==0?a.getFullYear()-1:a.getFullYear();
                var month = a.getMonth();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }else if(month==0){
                    month = 12
                }
                return `${year}-${month}`;
            },
            getNowFormatDate(value) {
                var date = new Date();
                var seperator1 = "-";
                var year = value.getFullYear();
                var month = value.getMonth() + 1;
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                var currentdate = year + seperator1 + month;
                return currentdate;
            },
            //时间确定
            onConfirm(value){
               this.value = this.getNowFormatDate(value)
               this.dataSJ(this.value)
               this.show = false
            },

            //时间选择取消
            onCancel(){
                this.show = false
            },
            chooeMonthBtn(){
                this.show = true
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
        }
    }
</script>

<style scoped lang='less'>
.operational_data{
    .header{
        position: relative;
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
        }
        .countdown{
            position: absolute;
            display: flex;
            top: 41.5%;
            left: 50%;
            transform: translateX(-50%);
            li{
                width: 108px;
                height: 96px;
                display: flex;
                font-size: 50px;
                font-weight: bold;
                color: #fff;
                align-items: center;
                justify-content:center;
            }
            li:nth-of-type(2){
                margin: 0 52px;
            }
        }
    }
    .chooseMonth{
        background: #fff;
        margin-bottom: 20px;
        ul{
            display: flex;
            justify-content:space-between;
            align-items: center;
            padding: 20px 40px;
            font-size: 30px;
            li:nth-of-type(2){      
                padding-right: 10px;         
                flex:1;
                text-align: right;
            }
            li:nth-of-type(2),
            li:nth-of-type(3){
                color:#8C8F94
            }
        }
    }
    .contain{
        background: #fff;
        padding-bottom: 60px;
        margin-bottom: 20px;
        header{        
            line-height: 100px;
            border-bottom: 1px solid #F0F1F3;   
            span:nth-of-type(1){
                color:#34373C;
                border-left: 4px solid #323232;
                padding-left: 40px; 
                font-weight: bold;
                font-size: 30px;
            }
            span:nth-of-type(2){
                float: right;
                font-size: 24px;
                padding-right: 44px;
                color:#999A9C;
            }
        }
        &>.tips{
            font-size: 24px;
            padding-top: 20px;
        }
        &>ul{
            padding: 60px 40px;
            display: flex;
            flex-wrap: wrap;
            li{
                width: 50%;
                font-size: 28px;
                line-height: 2;
                p:nth-of-type(1){
                    color:#A1A5A8;
                    font-size: 24px;
                }
                p:nth-of-type(2){
                    font-size: 36px;
                }
            }
        }
        .panel{
            height: 370px;
            width: 670px;
            margin: 0 auto;
            border: 2px solid #E4E4E4; 
            box-shadow:0 0 10px 5px #ebebeb;
            border-radius: 15px;
            div:nth-of-type(1){
                ul{
                    display: flex;
                    justify-content: space-around;
                    height: 196px;
                    align-items: center;
                    border:1px solid #eff2f7;
                    li{
                        line-height: 1.5;
                        // width: 50%;
                        text-align: center;
                        p:nth-of-type(1){
                            font-size: 36px;
                            color: #000;
                        }
                        p:nth-of-type(2){
                            font-size: 22px;
                            color:#a1a5ac;
                        }
                    }
                }
            }
            div:nth-of-type(2),
            div:nth-of-type(3){
                font-size: 28px;
                line-height: 88px;
                color: #848a93;
                padding-left: 20px;
                span{
                    color:#000;
                }
            }
        }
        &>P{
            // margin-left: 30px;
            color:#93979A;
            padding-top: 20px;
            font-size: 28px;
        }    
        .van-swipe{
            .van-swipe__track{
                .van-swipe-item{
                    position: relative;
                    .chart{
                        width: 376px;
                        height: 376px;
                        .ve-ring{
                            position: relative;
                            .centerTitle{
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-56px,-33px);
                                text-align: center;
                                font-size: 28px;
                                line-height: 1.3;
                            }
                        }
                    }
                    .sexImg{
                        width: 450px;
                        height: 326px;
                        ul{
                            padding: 50px 50px 0;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            li{
                                div{
                                    padding-bottom: 20px;
                                    height: 188px;
                                    img{
                                        height: 100%
                                    }
                                }
                                p{
                                    text-align: center;
                                    font-size: 28px;
                                }
                            }
                        }
                    }
                    .identifying{
                        position: absolute;
                        right: 100px;
                        top: 50%;
                        transform: translateY(-50%);
                        ul{     
                            padding-top: 40px;
                            .sex{
                                font-size: 28px;
                                padding-bottom: 20px;
                            }        
                            li:first-child{
                                font-size: 28px;
                                padding-bottom: 15px;
                            }  
                            li{
                                display: flex;
                                align-items: center;
                                span:nth-of-type(1){
                                    width: 13px;
                                    height: 13px;
                                    background: red;
                                    border-radius: 100%;
                                    vertical-align: middle;
                                    margin-right: 18px;
                                }
                                span:nth-of-type(2){
                                    font-size: 26px;
                                    line-height: 2;
                                    color:#87898E;
                                }
                            }
                        }
                    }
                }
            }
            /deep/.van-swipe__indicators{
                bottom: 0
            }
        }           
    }
    .borrow_money,
    .riskControl{
        background: #fff;
        margin-bottom: 20px;
        header{        
            line-height: 100px;
            border-bottom: 1px solid #F0F1F3;   
            span:nth-of-type(1){
                color:#34373C;
                border-left: 4px solid #323232;
                padding-left: 40px; 
                font-weight: bold;
                font-size: 30px;
                width: 200px;
            }
            span:nth-of-type(2){
                float: right;
                padding-right: 44px;
                color:#999A9C;
            }
        }                
    }
    .riskControl{
        ul{
            padding: 60px 40px;
            li{
                font-size: 28px;
                color:#A0A4AB;
                line-height: 2;
                span{
                  color:#383838;
                }
            }
        }
    }
    .borrow_money{
        ul{
            padding: 60px 40px;
            background: #fff;
            li{
                display: flex;
                align-items: center;
                line-height: 2.5;
                font-size: 26px;
                div:nth-of-type(1){
                  width: 200px;
                  padding-left: 20px;
                }
                div:nth-of-type(2){
                  line-height: 2.8
                  
                  
                  ;
                  flex: 1;
                }
            }
        }
    }
}

</style>