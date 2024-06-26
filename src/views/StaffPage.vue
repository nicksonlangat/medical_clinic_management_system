<script setup>
import AsideNav from '@/components/AsideNav.vue'
import TopNav from '@/components/TopNav.vue'
import DoctorTable from '@/components/DoctorTable.vue'
import InventoryTable from '@/components/InventoryTable.vue'
import NotificationPage from '@/components/NotificationPage.vue'
import moment from 'moment'

import { ref } from 'vue'

import { inject } from 'vue'

const emitter = inject('emitter')

const title = ref('Staff')
let currentView = ref('doctor')

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

          <div class="mt-5 cursor-pointer text-main-100 gap-5 flex border-gray-100 border-b">
            <span
              @click="changeCurrentView('doctor')"
              :class="currentView == 'doctor' ? 'border-b-4 text-blue-50 border-blue-50' : ''"
              class="hover:text-blue-50 transition-all duration-300"
              >Doctor Staff</span
            >
            <span
              @click="changeCurrentView('general')"
              :class="currentView == 'general' ? 'border-b-4 text-blue-50 border-blue-50' : ''"
              class="hover:text-blue-50 transition-all duration-300"
              >General Staff</span
            >
          </div>
          <div class="mt-5">
            <div class="flex gap-3 items-center">
              <span class="bg-blue-10 text-blue-50 py-2 px-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1"
                  />
                  <path d="M8 15a6 6 0 1 0 12 0v-3" />
                  <path d="M11 3v2" />
                  <path d="M6 3v2" />
                  <path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                </svg>
              </span>
              <p class="text-main text-3xl">
                45 <span class="text-sm text-main-200">Doctors</span>
              </p>
            </div>
          </div>
          <InventoryTable v-if="currentView == 'general'" />
          <DoctorTable v-if="currentView == 'doctor'" />
        </div>
      </div>
    </div>
  </div>
</template>
