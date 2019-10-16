<template>
  <div>
    <!-- 题目 -->
    <div v-if="subject" class="timu">
      <transition name="fade">
        <div v-if="show">
          <header>
            <h1><span>{{currentIndex+1}}</span> / <span>{{topic[currentIndex] && topic[currentIndex || 0].total}}</span></h1>
            <p>{{topic[currentIndex]&&topic[currentIndex || 0].title}}</p>
          </header>
          <section>
            <ul>
              <li v-for="(item, index) in (topic[currentIndex] && topic[currentIndex].children && topic[currentIndex || 0 ].children)" :key="index" @click.once="selectIndex(index,currentIndex,item.Id)">
                <p :class="chooseIndex==index?'selectRed':''">{{item.remark}}<i class="icon iconfont icon-gou" v-if="chooseIndex==index"></i></p>
              </li>
            </ul>
          </section>
          <button class="submit" v-if="currentIndex===((topic[currentIndex] && (topic[currentIndex||0].total)-1) )&&submitBtn" @click.once="submit">提交</button>
          <button @click.once="back" v-if="currentIndex!==0" class="back"><i class="icon iconfont icon-houtui"></i>上一题</button>
        </div>
      </transition>
      <div class="shade" v-if="shade"></div>
    </div>
    <!-- 测评结果 -->
    <div class="riskResult" v-if="riskResult">
      <div class="headImg"><img :src="imgUrl"></div>
      <p class="garde">您的风险测评等级为</p>
      <h1>{{riskLevelTxt}}</h1>
      <p class="contain">{{riskLevelRemark}}</p>
      <button class="okBtn" @click="riskOk">完成测评</button>
    </div>
  </div>
</template>

<script>
  import { indexApi } from '@/api/mine'
  import { setTimeout } from 'timers';
  export default {
    data() {
      return {
        //题目索引
        currentIndex: 0,
        topic: [],
        //选中的索引
        chooseIndex: '-1',
        show: true,
        shade: false,
        //题目flag
        subject: true,
        //结果flag
        riskResult: false,
        //题目最后一题的按钮显示
        submitBtn: false,
        //测评等级
        riskLevelTxt: '',
        //测评内容
        riskLevelRemark: '',
        //测评等级图片url
        imgUrl: ''
      }
    },
    async created() {
      await indexApi.typeItemList().then(data => {
        for (let i = 0; i < data.result.length; i++) {
          this.topic.push({
            Id: data.result[i].Id,
            children: data.result[i].children,
            title: data.result[i].title,
            total: data.result.length,
            //选中的索引
            chooseIndex: '',
            chooseId: ''
          })
        }
      })
    },
    watch: {
      currentIndex() {
        this.show = false
        setTimeout(() => {
          this.show = true
          this.shade = false
        }, 500)

      }
    },
    methods: {
      //选中，下一题，保存上一题的状态
      selectIndex(index, currentIndex, id) {
        this.shade = true
        this.topic[currentIndex].chooseId = id
        this.chooseIndex = index
        this.topic[currentIndex].chooseIndex = index
        if (this.currentIndex === (this.currentIndex > 1 && (this.topic[this.currentIndex - 1].total - 1))) {
          this.shade = false
          this.submitBtn = true
          return
        }
        setTimeout(() => {
          this.currentIndex++;
          if (this.topic[currentIndex + 1].chooseIndex == '') {
            this.chooseIndex = '-1'
          } else {
            this.chooseIndex = this.topic[currentIndex + 1].chooseIndex
          }
        }, 100)
      },
      //上一题
      back() {
        this.currentIndex--;
        this.chooseIndex = this.topic[this.currentIndex].chooseIndex
      },
      //提交
      submit() {
        let itemList = []
        for (let i = 0; i < this.topic.length; i++) {
          itemList.push({
            answerId: this.topic[i].chooseId,
            subjectId: this.topic[i].Id
          })
        }
        indexApi.investorRiskEvaluate(itemList).then(data => {
          this.subject = false
          this.riskResult = true
          this.riskLevelTxt = data.result.riskLevelTxt;
          this.riskLevelRemark = data.result.riskLevelRemark
          switch (data.result.riskLevelSimplify) {
            case "risk_level_steady":
              this.imgUrl = require("../../../assets/images/my/steady.png")
              break;
            case "risk_level_keep":
              this.imgUrl = require("../../../assets/images/my/Conservatism.png")
              break;
            case "risk_level_active":
              this.imgUrl = require("../../../assets/images/my/positive.png")
              break;
          }
          if (localStorage.getItem('info')) {
            let old = JSON.parse(localStorage.getItem('info'))
            old.user.riskLevelInfo = data.result
            localStorage.setItem('info', JSON.stringify(old))
          }
        })
      },
      //完成测评
      riskOk() {
        switch (this.$route.query.type) {
          case 1:
            this.$router.go(-1)
            break;
          case 2:
            this.$router.push('/my')
        }
      }
    }
  }

</script>

<style scoped lang='less'>
  div {
    .timu {
      min-height: 100vh;
      background: #fff;

      .fade-enter-active {
        transition: all .3s ease;
      }

      .fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }

      .fade-enter,
      .fade-leave-to

      /* .slide-fade-leave-active for below version 2.1.8 */
        {
        transform: translateX(20px);
        opacity: 0;
      }

      header {
        padding: 74px 40px 46px 40px;
        border-bottom: 1px solid rgb(241, 242, 246);

        h1 {
          color: #ff4e30;
          padding-bottom: 32px;

          span:nth-of-type(1) {
            font-size: 46px;
          }

          span:nth-of-type(2) {
            font-size: 30px;
          }
        }

        p {
          line-height: 1.3;
          font-size: 36px;
          color: #32363c;
          font-weight: bold;
        }
      }

      section {
        padding: 68px 40px 0 40px;

        p {
          padding-bottom: 62px;
          font-size: 28px;
          color: #32363c;
          line-height: 1.5;

          i {
            margin-left: 18px;
            font-size: 24px;
          }
        }

        .selectRed {
          color: #ff4e30;
        }

      }

      .submit {
        margin: 80px auto 0;
        width: 670px;
        height: 88px;
        background: #ff4e30;
        border-radius: 10px;
        color: #fff;
        font-size: 32px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }

      .back {
        width: 420px;
        height: 88px;
        color: #333;
        border-radius: 88px;
        line-height: 88px;
        background: transparent;
        margin: 30px auto 0;
        font-size: 30px;
        border: 2px solid rgb(226, 226, 226);
        position: relative;
        left: 50%;
        transform: translateX(-50%);

        i {
          font-size: 45px;
          color: #333;
          vertical-align: middle;
          position: absolute;
          left: 30px;
        }
      }

      .shade {
        border: 1px solid;
        position: fixed;
        top: 0;
        left: 0;
        min-width: 100vw;
        min-height: 100vh;
        opacity: 0;
      }
    }

    .riskResult {
      padding-top: 60px;

      .headImg {
        width: 179px;
        height: 179px;
        margin: 0 auto;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .garde {
        padding: 46px 0 24px 0;
        text-align: center;
        font-size: 26px;
        color: #848a93;
      }

      h1 {
        text-align: center;
        font-weight: bold;
        font-size: 50px;
        color: #32363c;
        padding-bottom: 60px;
      }

      .contain {
        padding: 0 40px 80px;
        line-height: 2;
        font-size: 28px;
        color: #848a93;
      }

      .okBtn {
        color: #fff;
        background: #ff4e30;
        width: 670px;
        height: 88px;
        margin: 0 auto;
        font-size: 32px;
        border-radius: 10px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

</style>
