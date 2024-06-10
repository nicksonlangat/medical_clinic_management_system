<script setup>
import AsideNav from '@/components/AsideNav.vue'
import TopNav from '@/components/TopNav.vue'
import OrderTable from '@/components/OrderTable.vue'
import InventoryTable from '@/components/InventoryTable.vue'
import NotificationPage from '@/components/NotificationPage.vue'
import moment from 'moment'

import { ref } from 'vue'

import { inject } from 'vue'

const emitter = inject('emitter')

const title = ref('Stock')
let currentView = ref('inventory')

let today = new Date()

let hours = new Date().getHours()

let greeting = hours < 12 ? 'Morning' : hours <= 16 && hours >= 12 ? 'Afternoon' : 'Evening'

let user = ref(null)
let product_stats = ref(null)
const formatToday = () => {
  return moment(today).format('ll')
}

const changeCurrentView = (view) => {
  return (currentView.value = view)
}

const formatPrice = (value) => {
  let val = (value / 1).toFixed(2).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

emitter.on('setCurrentUser', (data) => {
  user.value = data.user
})

emitter.on('loadProductStats', (data) => {
  product_stats.value = data
})
</script>

<template>
  <div id="app" class="h-screen flex flex-col overflow-hidden">
    <!-- Main content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Fixed sidebar -->
      <AsideNav />
      <NotificationPage />
      <!--  -->
      <!-- Scroll wrapper -->
      <div class="flex-1 flex bg-light-100 font-base text-main flex-col">
        <TopNav :title="title" />
        <!-- Scrollable container -->
        <div class="px-4 py-4 flex-1 overflow-y-auto">
          <!-- Your content -->
          <div class="flex">
            <div class="w-1/5">
              <p>
                Good {{ greeting }}, <br />
                {{ user?.full_name }}
              </p>
              <p class="text-main-100 text-sm">{{ formatToday() }}</p>
            </div>
            <div class="flex w-4/5 divide-x divide-gray-200 gap-5">
              <div class="w-1/2 gap-5 flex items-center">
                <span class="bg-blue-10 text-blue-50 py-2 px-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-cash"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"
                    />
                    <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                  </svg>
                </span>
                <div>
                  <p class="uppercase text-main-100 text-sm">total stock value</p>
                  <p class="text-3xl font-semibold uppercase mt-3">
                    KSH {{ formatPrice(product_stats?.total_stock_value) }}
                  </p>
                </div>
              </div>
              <div class="pl-5 w-2/3">
                <p class="text-lg font-semibold">
                  {{ product_stats?.total_products }}
                  <span class="text-main-100 font-normal text-xs uppercase">products</span>
                </p>
                <div class="mt-4">
                  <div class="grid grid-cols-3 gap-2">
                    <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                      <div
                        class="bg-cyan-500 h-1.5 rounded-full"
                        :style="{ width: product_stats?.in_stock_products.percentage }"
                      ></div>
                    </div>
                    <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                      <div
                        class="bg-yellow-400 h-1.5 rounded-full"
                        :style="{ width: product_stats?.low_stock_products.percentage }"
                      ></div>
                    </div>
                    <div class="w-full bg-inherit rounded-full h-1.5 mb-4">
                      <div
                        class="bg-red-500 h-1.5 rounded-full"
                        :style="{ width: product_stats?.out_of_stock_products.percentage }"
                      ></div>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-2">
                    <div class="flex gap-2 items-center text-xs">
                      <span class="h-2 w-2 rounded-full bg-cyan-500"> </span>
                      <p class="text-main-100">In Stock</p>
                      <p>{{ product_stats?.in_stock_products.value }}</p>
                    </div>
                    <div class="flex gap-2 items-center text-xs">
                      <span class="h-2 w-2 rounded-full bg-yellow-400"> </span>
                      <p class="text-main-100">Low Stock</p>
                      <p>{{ product_stats?.low_stock_products.value }}</p>
                    </div>
                    <div class="flex gap-2 items-center text-xs">
                      <span class="h-2 w-2 rounded-full bg-red-500"> </span>
                      <p class="text-main-100">Out of Stock</p>
                      <p>{{ product_stats?.out_of_stock_products.value }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 cursor-pointer text-main-100 gap-5 flex border-gray-100 border-b">
            <span
              @click="changeCurrentView('inventory')"
              :class="currentView == 'inventory' ? 'border-b-4 text-blue-50 border-blue-50' : ''"
              class="hover:text-blue-50 transition-all duration-300"
              >Inventory</span
            >
            <span
              @click="changeCurrentView('order')"
              :class="currentView == 'order' ? 'border-b-4 text-blue-50 border-blue-50' : ''"
              class="hover:text-blue-50 transition-all duration-300"
              >Order Stock</span
            >
          </div>
          <InventoryTable v-if="currentView == 'inventory'" />
          <OrderTable v-if="currentView == 'order'" />
        </div>
      </div>
    </div>
  </div>
</template>
