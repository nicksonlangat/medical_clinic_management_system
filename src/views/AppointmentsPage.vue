<script setup>
import AsideNav from '@/components/AsideNav.vue'
import TopNav from '@/components/TopNav.vue'
import WeeklyPage from '@/components/WeeklyPage.vue'
import DailyPage from '@/components/DailyPage.vue'
import NotificationPage from '@/components/NotificationPage.vue'
import NewAppointmentModal from '@/components/NewAppointmentModal.vue'
import ViewAppointmentModal from '@/components/ViewAppointmentModal.vue'
import { ref } from 'vue'

import { inject } from 'vue'

const emitter = inject('emitter')

const title = ref('Appointments')
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
      <NewAppointmentModal />
      <ViewAppointmentModal />
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
              >Weekly</span
            >
            <span
              @click="changeCurrentView(false)"
              :class="!currentView ? 'border-b-4 text-blue-50 border-blue-50' : ''"
              class="hover:text-blue-50 transition-all duration-300"
              >Daily</span
            >
          </div>
          <div v-if="currentView">
            <WeeklyPage />
          </div>
          <div v-else>
            <DailyPage />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
