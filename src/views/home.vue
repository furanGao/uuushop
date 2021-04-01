<template>
    <div id="main"></div>
</template>

<script>
  export default {
    mounted() {
      let myChar = this.$echart.init(document.getElementById('main'))
      var data = []
      let option =  {
        backgroundColor: '#545c64',

        title: {
          text: '小高商城收入来源',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: 335, name: '明星代言'},
              {value: 310, name: '广告营销'},
              {value: 274, name: '视频推广'},
              {value: 235, name: '线下活动'},
              {value: 400, name: '国家扶持'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      myChar.setOption(option)
    }
   }
</script>

<style scoped>
#main{
  width: 1600px;
  height: 800px;
}

</style>
