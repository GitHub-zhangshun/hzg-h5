<template>
    <div>
        <van-tabs sticky v-model="active"  :line-width="27" @click="onClick">
            <van-tab title="关于我们">
                <about></about>
            </van-tab>
            <van-tab title="银行存管">
                <bank></bank>
            </van-tab>
            <van-tab title="备案信息">
                <record></record>
            </van-tab>
            <van-tab title="公司概况">
                <company></company>
            </van-tab>
            <van-tab title="审查报告">
                <review></review>
            </van-tab>
            <van-tab title="运营数据">
                <operationalData></operationalData>
            </van-tab>
            <!-- <van-tab title="运营报告">
                <runReports></runReports>
            </van-tab> -->
            <van-tab title="风险管理">
                <riskManagement></riskManagement>
            </van-tab>
            <van-tab title="风险提示">
                <riskWarning></riskWarning>                   
            </van-tab>
            <van-tab title="法律法规">
                <lawsRegulations></lawsRegulations>
            </van-tab>
            <van-tab title="信披声明">
                <informationStatement></informationStatement>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import about from './about'
import bank from './bank'
import record from './record'
import company from './company'
import review from './review'
import operationalData from './operational_data'
import runReports from './run_reports'
import riskManagement from './risk_management'
import lawsRegulations from './laws_regulations'
import informationStatement from './information_statement'
import riskWarning from'./Risk_warning'
    export default {
        data(){
            return{
                active:this.$route.query.index?this.$route.query.index:0
            }
        },
        components: {
            about,
            bank,
            record,
            company,
            review,
            operationalData,
            runReports,
            riskManagement,
            informationStatement,
            lawsRegulations,
            riskWarning
        },
        methods:{
            onClick(index){
                // if(index==6){
                //     this.$router.replace({query:{index:6}})
                // }else 
                if(index==7){
                    this.$router.replace({query:{index:7}})
                }else{
                    this.$router.replace({query:{}})
                }

            }
        }
    }
</script>

<style scoped lang='less'>
/deep/.van-tabs__wrap{
    z-index: 2!important;
    position: fixed;
    top: 0;
}
/deep/.van-tabs__line{
    top: 65%;
    height: 6px;
}
/deep/.van-tab{
    color: #323233;
}
/deep/.van-tab--active{
    color: #e0634f
}
</style>