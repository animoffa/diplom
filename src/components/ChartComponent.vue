<template>
<div class="chart">
  <div class="chart__options">
    <Toggle text="По месяцам" @toggle="changeToggleValue"/>
  <select v-model="selectedYear">
      <option :value="currentYear" selected>{{currentYear}}</option>
      <option :value="currentYear-1">{{currentYear - 1}}</option>
      <option :value="currentYear-2">{{currentYear - 2}}</option>
      <option :value="currentYear+1">{{currentYear - 3}}</option>
      <option :value="currentYear+2">{{currentYear - 4}}</option>
  </select>
  <select v-model="selectedMonth" :disabled="!perMonth">
      <option value="" hidden disabled selected>Выберите месяц..</option>
      <option v-for="month of allMonths" :key="month" :value="month">{{month}}</option>
      
  </select>
  </div>
  <div class="small">
    <line-chart :chart-data="datacollection" :width="width"></line-chart>
    <button class="button" style="margin-top: 30px;" @click="fillData()">Применить</button>
  </div>
</div>
</template>

<script>
  import LineChart from '@/LineChart.js'
  import {mapState} from 'vuex'
  import Toggle from '@/components/Toggle'

  export default {
    components: {
      LineChart,
      Toggle
    },
    data () {
      return {
        datacollection: null,
        width: 500,
        perMonth: false,
        allMonths: ['январь', 'февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь' ],
        currentYear: 2022,
        currentMonth: '',
        selectedMonth: '',
        allDays: [],
        selectedYear: 2022,
        countDaysOfMonth: [31,29,31,30,31,30,31,31,30,31,30,31],
        articlesCount: [0,0,0,0,0,0,0,0,0,0,0,0]
      }
    },
    mounted () {
      this.fillData()
      this.calcArticlesCount()

      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth();

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
    watch: {
      selectedYear() {
        if (!this.perMonth) {
        this.articlesCount=[0,0,0,0,0,0,0,0,0,0,0,0];
        this.calcArticlesCount()
        this.fillData()
        } else {
          const countOfDays = this.countDaysOfMonth[this.allMonths.indexOf(this.selectedMonth)];
          this.articlesCount=[];
          this.allDays=[];
          for (let i=1; i<=countOfDays; i++ ) {
            this.articlesCount.push(0);
            this.allDays.push(i);
          }
          
          this.calcArticlesCountperMonth()
          this.fillData()
        }
      },
      selectedMonth() {
        const countOfDays = this.countDaysOfMonth[this.allMonths.indexOf(this.selectedMonth)];
        this.articlesCount=[];
        this.allDays=[];
        for (let i=1; i<=countOfDays; i++ ) {
          this.articlesCount.push(0);
          this.allDays.push(i);
        }
        
        this.calcArticlesCountperMonth()
        this.fillData()
      }
    },
    methods: {
      changeToggleValue(value) {
        this.perMonth = !value;
      },
      convertDate(date) {
          const formattedDate = new Date(date * 1000)
          if (formattedDate.getFullYear()=== this.selectedYear ) {
            const month = (formattedDate.getMonth());
            return +month;
          }
          return;
      },
      convertDatePerDay(date) {
          const formattedDate = new Date(date * 1000)
          
          if (formattedDate.getFullYear()=== this.selectedYear && this.allMonths.indexOf(this.selectedMonth) === formattedDate.getMonth() ) {
            const day = (formattedDate.getDate());
            return +day;
          }
          return;
      },
      calcArticlesCount(){
        this.cards.forEach((article)=> {
          this.articlesCount[this.convertDate(article.date)] = this.articlesCount[this.convertDate(article.date)]+1
         
        })
      },
      calcArticlesCountperMonth() {
        this.cards.forEach((article)=> {
          this.articlesCount[this.convertDatePerDay(article.date)] = this.articlesCount[this.convertDatePerDay(article.date)]+1
         
        })
      },
      calcWidth() {
        let element = document.getElementById('small');
        this.width = element.clientWidth;
      },
      fillData () {
        this.datacollection = {
          labels: this.perMonth ? this.allDays : this.allMonths,
          datasets: [
            {
              label: 'Количество опубликованных статей',
              backgroundColor: '#f87979',
              data: this.articlesCount
            },
          ]
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .chart {
    width: 100%;

    &__options {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 20px;
    }
  }
  .small {
    width: 80%;
    margin: 0 auto;
    
  }

  .button {
    left: 50%;
    position: relative;
    transform: translateX(-50%);
    background-color: #477251;
    color: #fff;
    border: none;
    text-align: center;
    padding: 0.8rem 2rem;
    font-size: 1.7rem;
    font-weight: 500;
    border-radius: 8px;
  }

  select {
      width: 20rem;
      border: none;
      background: #00000008;
      font-size: 1.6rem;
      margin-left: 3rem;
      padding: 0 2rem;
      position: relative;
      appearance: none;
      height: 4rem;
      cursor: pointer;
      border-radius: 2rem;

      option {
          font-size: 1.7rem;
          background:rgba(226, 226, 226, 0.651);
      }
  }

  .main-select{
        background:transparent;
        font-size: 2.2rem;
        width:23rem;
        margin-left: 1rem;

        option {
          font-size: 1.9rem;
          background:rgba(226, 226, 226, 0.651);
          margin:0.5rem;
      }
  }

  .select-arrow {
      position: relative;
      left: -3rem;
      top: 0.1rem;
      width: 1.5rem;

  }

  select:focus {
      border: none;
      outline: none;
  }

</style>

