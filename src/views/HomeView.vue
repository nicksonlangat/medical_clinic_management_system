<script setup>
import AsideNav from '@/components/AsideNav.vue'
import TopNav from '@/components/TopNav.vue'
import moment from 'moment'
import { ref } from 'vue'
import { inject } from 'vue'

const emitter = inject('emitter')

const title = ref('Dashboard')
let user = ref(null)

let today = new Date()

let hours = new Date().getHours()

let greeting = hours < 12 ? 'Morning' : hours <= 16 && hours >= 12 ? 'Afternoon' : 'Evening'

const formatToday = () => {
  return moment(today).format('ll')
}

emitter.on('setCurrentUser', (data) => {
  user.value = data.user
})

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
} from 'chart.js'
import { Line, Doughnut, Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)
const data = ref({
  labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],

  datasets: [
    {
      label: 'Cashflow per month',
      backgroundColor: '#415be6',
      borderColor: '#415be6',

      data: [50000, 39000, 110000, 50000, 132000, 156000, 160000]
    }
  ]
})
const options = ref({
  responsive: true,
  maintainAspectRatio: false,

  elements: {
    line: {
      tension: 0.2
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#b0b5bd',

        font: {
          size: 10
        },

        beginAtZero: true
      }
    },
    y: {
      grid: {
        display: false
      },
      ticks: {
        color: '#b0b5bd',

        font: {
          size: 10
        },

        beginAtZero: true
      }
    }
  }
})

const doughnutData = ref({
  labels: ['Internet', 'Salaries', 'Rent', 'Electricity'],
  datasets: [
    {
      backgroundColor: ['#9666f6', '#35b3f0', '#9be66f', '#f10186'],
      data: [40, 20, 80, 10]
    }
  ]
})

const doughnutOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})

const barData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#8DCE98',
      data: [120000, 80000, 155000, 200000, 90000, 75000]
    },
    {
      label: 'Expenses',
      backgroundColor: '#FEB814',
      data: [80000, 60000, 105000, 70000, 60000, 45000]
    }
  ]
})
</script>

<template>
  <div id="app" class="h-screen flex flex-col overflow-hidden">
    <!-- Main content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Fixed sidebar -->
      <AsideNav />
      <!--  -->
      <!-- Scroll wrapper -->
      <div class="flex-1 flex bg-[#fafbfc] font-base text-main flex-col">
        <TopNav :title="title" />
        <!-- Scrollable container -->
        <div class="px-2 py-4 flex-1 overflow-y-auto">
          <!-- Your content -->
          <div class="w-1/5">
            <p>
              Good {{ greeting }},
              {{ user?.full_name }}
            </p>
            <p class="text-main-100 text-sm">{{ formatToday() }}</p>
          </div>
          <div class="mt-5 flex gap-2">
            <div class="w-2/3">
              <div class="bg-white rounded-md h-80">
                <div class="p-5">
                  <div class="flex justify-between items-center">
                    <p class="font-semibold">Cashflow</p>
                    <select class="border-0 bg-light-200 text-xs rounded-md text-main-100">
                      <option value="">Last 6 months</option>
                    </select>
                  </div>
                  <div class="flex mt-5 justify-between items-center">
                    <div>
                      <p class="uppercase text-main-100 text-xs">total cash</p>
                      <div class="flex gap-2 mt-1 items-center">
                        <p class="uppercase font-semibold text-lg">ksh 4,565,678.00</p>
                        <span
                          class="bg-[#EDF8F3] inline-flex gap-2 items-center text-xs py-1 px-2 rounded-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-4 text-[#4CBB8C] w-4"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z"
                            />
                          </svg>
                          6.51%
                        </span>
                      </div>
                    </div>
                    <div class="text-main-100 text-sm">
                      <p>Jan 2024 - June 2024</p>
                    </div>
                  </div>
                  <div>
                    <Line :data="data" :options="options" />
                  </div>
                </div>
              </div>
              <div class="w-full mt-2 grid grid-cols-2 gap-2">
                <div class="bg-white rounded-md">
                  <div class="p-5">
                    <div class="flex justify-between items-center">
                      <p class="font-semibold">Income/Expenses</p>
                      <select class="border-0 bg-light-200 text-xs rounded-md text-main-100">
                        <option value="">Last 6 months</option>
                      </select>
                    </div>
                    <div class="flex mt-5 justify-between">
                      <div>
                        <div class="flex text-main-100 uppercase items-center gap-1 text-xs">
                          <div class="bg-[#8DCE98] h-2 w-2 rounded-full"></div>
                          total Income
                        </div>
                        <div class="mt-2 flex gap-2 items-center">
                          <p class="uppercase font-semibold text-sm text-main">ksh 500,565.45</p>
                          <span class="flex gap-1 items-center text-xs"
                            ><svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="h-4 w-4 text-[#4cbb8c]"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z"
                              />
                            </svg>
                            4.65%</span
                          >
                        </div>
                      </div>
                      <div>
                        <div class="flex text-main-100 uppercase items-center gap-1 text-xs">
                          <div class="bg-[#FEB814] h-2 w-2 rounded-full"></div>
                          total Expenses
                        </div>
                        <div class="mt-2 flex gap-2 items-center">
                          <p class="uppercase font-semibold text-sm text-main">ksh 500,565.45</p>
                          <span class="flex gap-1 items-center text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="h-4 w-4 text-[#f10b8a]"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <path
                                d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z"
                              />
                            </svg>
                            4.65%</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <Bar :data="barData" :options="options" />
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="bg-white rounded-md h-36">
                    <div class="p-3">
                      <p class="text-sm">Stock Availability</p>
                      <div class="mt-3 flex justify-between">
                        <div>
                          <p class="text-xs text-main-100 uppercase">asset value</p>
                          <p class="uppercase text-sm font-semibold">ksh 1,200,545.55</p>
                        </div>
                        <div>
                          <p class="text-xs text-main-100 uppercase">total products</p>
                          <p class="uppercase text-sm font-semibold">657</p>
                        </div>
                      </div>
                      <div class="mt-4">
                        <div class="grid grid-cols-3 gap-2">
                          <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                            <div class="bg-cyan-500 h-1.5 rounded-full" style="width: 80%"></div>
                          </div>
                          <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                            <div class="bg-yellow-400 h-1.5 rounded-full" style="width: 40%"></div>
                          </div>
                          <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                            <div class="bg-red-500 h-1.5 rounded-full" style="width: 70%"></div>
                          </div>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <div class="flex gap-2 items-center text-xs">
                            <span class="h-2 w-2 rounded-full bg-cyan-500"> </span>
                            <p class="text-main-100">In Stock</p>
                            <p>450</p>
                          </div>
                          <div class="flex gap-2 items-center text-xs">
                            <span class="h-2 w-2 rounded-full bg-yellow-400"> </span>
                            <p class="text-main-100">Low Stock</p>
                            <p>85</p>
                          </div>
                          <div class="flex gap-2 items-center text-xs">
                            <span class="h-2 w-2 rounded-full bg-red-500"> </span>
                            <p class="text-main-100">Out of Stock</p>
                            <p>100</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-white rounded-md">
                    <div class="p-5">
                      <div class="flex justify-between items-center">
                        <p class="font-semibold">Patients</p>
                        <select class="border-0 bg-light-200 text-xs rounded-md text-main-100">
                          <option value="">June</option>
                        </select>
                      </div>
                      <div class="mt-2 flex gap-5 divide-x">
                        <div class="flex flex-col justify-between text-sm h-full">
                          <p>100</p>
                          <div class="mt-6 text-xs text-main-100">
                            <p>45% New patients</p>
                            <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                              <div class="bg-[#415BE6] h-1.5" style="width: 100%"></div>
                            </div>
                          </div>
                        </div>
                        <div class="flex pl-5 flex-col justify-between text-sm h-full">
                          <p>300</p>
                          <div class="mt-6 text-xs text-main-100">
                            <p>55% Returning patients</p>
                            <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                              <div class="bg-[#415BE6] h-1.5" style="width: 100%"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div class="w-1/3 bg-white rounded-md">
              <div class="p-5">
                <div class="flex justify-between items-center">
                  <p class="font-semibold">Expenses</p>
                  <select class="border-0 bg-light-200 text-xs rounded-md text-main-100">
                    <option value="">Last 6 months</option>
                  </select>
                </div>
                <div>
                  <Doughnut :data="doughnutData" :options="doughnutOptions" />
                </div>
                <div class="mt-10">
                  <p class="uppercase text-main-100">total expenses</p>
                  <p class="uppercase font-semibold">ksh 325, 564.98</p>
                </div>
                <div class="mt-5">
                  <p class="uppercase text-xs text-main-100">top expenses</p>
                  <div class="mt-2 grid grid-cols-2 gap-2">
                    <div class="bg-light-200 rounded-md">
                      <div class="p-3">
                        <div class="flex gap-2 items-center text-main-100 text-xs">
                          <div class="bg-[#9666f6] h-2 w-2 rounded-full"></div>
                          Internet
                        </div>
                        <p class="text-sm mt-1 font-semibold uppercase">ksh 26,000</p>
                      </div>
                    </div>
                    <div class="bg-light-200 rounded-md">
                      <div class="p-3">
                        <div class="flex gap-2 items-center text-main-100 text-xs">
                          <div class="bg-[#35b3f0] h-2 w-2 rounded-full"></div>
                          Salaries
                        </div>
                        <p class="text-sm mt-1 font-semibold uppercase">ksh 120,000</p>
                      </div>
                    </div>
                    <div class="bg-light-200 rounded-md">
                      <div class="p-3">
                        <div class="flex gap-2 items-center text-main-100 text-xs">
                          <div class="bg-[#9be66f] h-2 w-2 rounded-full"></div>
                          Rent
                        </div>
                        <p class="text-sm mt-1 font-semibold uppercase">ksh 50,000</p>
                      </div>
                    </div>
                    <div class="bg-light-200 rounded-md">
                      <div class="p-3">
                        <div class="flex gap-2 items-center text-main-100 text-xs">
                          <div class="bg-[#f10186] h-2 w-2 rounded-full"></div>
                          Electricity
                        </div>
                        <p class="text-sm mt-1 font-semibold uppercase">ksh 16,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
