<template>
  <div class="dashboard-page">
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-select
        :items="listMonths"
        v-model="filter.month"
        :menu-props="{ offsetY: true }"
        item-text="month"
        item-value="id"
        label="Mes"
        hide-details="auto"
        outlined
        required
        @change="changePeriod()"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-select
        :items="listYears"
        v-model="filter.year"
        :menu-props="{ offsetY: true }"
        label="Año"
        hide-details="auto"
        outlined
        required
        @change="changePeriod()"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12">
        <v-card
          elevation="2"
        >
          <ApexCharts type="bar" height="350" :options="graphic1.chartOptions" :series="graphic1.series"></ApexCharts>
        </v-card>  
      </v-col>    
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-card
          elevation="2"
        >
          <ApexCharts type="bar" height="350" :options="graphic2.chartOptions" :series="graphic2.series"></ApexCharts>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-card
          elevation="2"
        >
          <ApexCharts type="bar" height="350" :options="graphic3.chartOptions" :series="graphic3.series"></ApexCharts>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'IndexPage',
  layout: 'auth',
  data(){   
    return {
      graphic1: {
        series: [
          {
            name: 'Fiscalizaciones',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          },
          {
            name: 'Pago de Penalidades',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          }
        }
      },
      graphic2: {
        series: [
          {
            name: 'Fiscalizaciones',
            data: [44, 55]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Usuario 1', 'Usuario 2'],
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          }
        }
      },
      graphic3: {
        series: [
          {
            name: 'Pago de Penalidades',
            data: [44, 55]
          }
        ],
        chartOptions: {
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Usuario 1', 'Usuario 2'],
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          }
        }
      },
      filter: {
        month: '',
        year: new Date().getFullYear()
      },
      listMonths: [
        {
          id: "01",
          month: "Enero",
        },
        {
          id: "02",
          month: "Febrero",
        },
        {
          id: "03",
          month: "Marzo",
        },
        {
          id: "04",
          month: "Abril",
        },
        {
          id: "05",
          month: "Mayo",
        },
        {
          id: "06",
          month: "Junio",
        },
        {
          id: "07",
          month: "Julio",
        },
        {
          id: "08",
          month: "Agosto",
        },
        {
          id: "09",
          month: "Setiembre",
        },
        {
          id: "10",
          month: "Octubre",
        },
        {
          id: "11",
          month: "Noviembre",
        },
        {
          id: "12",
          month: "Diciembre",
        }
      ],
      listYears: [],
      graphicData: {
        graphic1: null,
        graphic2: null,
        graphic3: null
      }
    }
  },
  methods: {
    ...mapActions("indicators", ['getGraphics']),
    getActualMonth(){
      let month = new Date().getMonth()
      month = (month+1)
      if(month < 10){
        month = `0${month}`
      }
      this.filter.month = month
    },
    getYears(){
      let year = new Date().getFullYear()
      for (let i = 2023; i <= year; i++) {
        this.listYears.push(i)
      }
      this.listYears.sort((a, b) => b - a)
    },
    async changePeriod(){
      if(!this.filter.month || !this.filter.year){
        return
      }
      try {
        this.loading = true
        let res = await this.getGraphics(this.filter)
        if(res.success){
          this.graphicData = res.data
        }
      } catch (error) {
        console.log("error", error)
      } finally {
        this.loading = false
      }
    }
  },
  mounted(){
    this.getYears()
    this.getActualMonth()
    this.changePeriod()
  }
}
</script>
<style lang="scss">
.dashboard-page{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
