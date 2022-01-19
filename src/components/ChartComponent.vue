<template>
  <div class="small">
    <line-chart :chart-data="datacollection" :width="width"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from '@/LineChart.js'
  import {mapState} from 'vuex'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        width: 500,
        articlesCount: [0,0,0,0,0,0,0,0,0,0,0,0]
      }
    },
    mounted () {
      this.fillData()
      this.calcArticlesCount()
      setTimeout(() =>this.calcWidth())
    },
    computed:{
      ...mapState('client', ['user']), 
      ...mapState('articles', [
        'articles' 
      ]),
      cards() {
        return this.articles.filter(card => card.author.id === this.user.id);
      },
    },
    methods: {
      convertDate(date) {
          const formattedDate = new Date(date * 1000)
          const month = (formattedDate.getMonth()+1);
          return +month;
      },
      calcArticlesCount(){
        this.cards.forEach((article)=> {
          this.articlesCount[this.convertDate(article.date)] = this.articlesCount[this.convertDate(article.date)]+1
         
        })
        console.log(this.articlesCount);
      },
      calcWidth() {
        let element = document.getElementById('small');
        this.width = element.clientWidth;
      },
      fillData () {
        this.datacollection = {
          labels: ['январь', 'февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь' ],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: this.articlesCount
            },
          ]
        }
      },
    }
  }
</script>

<style>
  .small {
    width: 80%;
    margin: 0 auto;
    
  }
</style>

