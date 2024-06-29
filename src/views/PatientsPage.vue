<script setup>
import AsideNav from '@/components/AsideNav.vue'
import TopNav from '@/components/TopNav.vue'
import PatientTable from '@/components/PatientTable.vue'
import NotificationPage from '@/components/NotificationPage.vue'

import { ref } from 'vue'

import { inject } from 'vue'

const emitter = inject('emitter')

const title = ref('Patients')
let currentView = ref(true)

let user = ref(null)
let patient_stats = ref(null)

const changeCurrentView = (view) => {
  applyFilter(view)
  return (currentView.value = view)
}

const applyFilter = (filter) => {
  emitter.emit('setPatientFilters', {
    selectedFilters: { is_active: filter, hiv_status: '', blood_group: '', gender: '' }
  })
}

emitter.on('setCurrentUser', (data) => {
  user.value = data.user
})

emitter.on('loadPatientStats', (data) => {
  patient_stats.value = data
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
              @click="changeCurrentView(true)"
              :class="currentView ? 'border-b-4 text-blue-50 border-blue-50' : ''"
              class="hover:text-blue-50 transition-all duration-300"
              >Active patients</span
            >
            <span
              @click="changeCurrentView(false)"
              :class="!currentView ? 'border-b-4 text-blue-50 border-blue-50' : ''"
              class="hover:text-blue-50 transition-all duration-300"
              >Inactive patients</span
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
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
              </span>
              <p class="text-main text-3xl">
                {{ patient_stats?.total_count }}
                <span class="text-sm text-main-200">Total patients</span>
              </p>
              <p class="text-main text-3xl">
                {{ patient_stats?.active_patient_count }}
                <span class="text-sm text-main-200">Active patients</span>
              </p>
              <p class="text-main text-3xl">
                {{ patient_stats?.inactive_patient_count }}
                <span class="text-sm text-main-200">Inactive patients</span>
              </p>
            </div>
          </div>
          <PatientTable />
        </div>
      </div>
    </div>
  </div>
</template>
