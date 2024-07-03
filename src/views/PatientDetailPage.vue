<script setup>
import AsideNav from '@/components/AsideNav.vue'
import TopNav from '@/components/TopNav.vue'
import moment from 'moment'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ApiClient from '../services/http.js'

const route = useRoute()
const title = ref('Patient')
const patient_id = ref(route.params['id'])
const patient = ref(null)
const formatDate = (value) => {
  return moment(value).format('ll')
}
const getPatientDetails = () => {
  ApiClient()
    .get(`patients/${patient_id.value}/`)
    .then((res) => {
      patient.value = res.data
    })
}

getPatientDetails()
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

          <div class="mt-5 flex justify-between items-center">
            <div>
              <div class="flex gap-5 items-center">
                <img
                  v-if="patient.image"
                  :src="baseURL + patient.image"
                  class="size-20 rounded-full object-cover"
                  alt=""
                />
                <span
                  v-else
                  class="bg-emerald-500/80 text-white flex items-center justify-center font-normal text-xs uppercase size-20 rounded-full"
                >
                  {{ patient?.first_name[0] }}{{ patient?.last_name[0] }}
                </span>
                <div class="font-normal text-xl">
                  <p>{{ patient?.first_name }} {{ patient?.last_name }}</p>
                  <div class="border mt-3 w-64 rounded-md text-sm">
                    <div class="p-2 flex items-center justify-between">
                      <p class="text-xs text-main-100">Last edited 45 days ago</p>
                      <span class="text-blue-50 mr-2 cursor-pointer">Edit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button class="py-1.5 text-sm text-white bg-blue-50 rounded-md px-3">
                Create Appointment
              </button>
            </div>
          </div>
          <div class="border-b mt-10 flex gap-8 cursor-pointer">
            <span class="text-blue-50 border-b-4 py-2 border-blue-50">Patient Information</span>
            <span class="py-2 text-main-100">Appointment History</span>
            <span class="py-2 text-main-100">Medical Records</span>
          </div>
          <div class="mt-5">
            <div>
              <div class="border-l-4 uppercase border-gray-700">
                <p class="ml-2">Patient Data</p>
              </div>
              <div class="grid mt-5 text-sm grid-cols-3 gap-y-10">
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Full name</p>
                  <p>{{ patient?.first_name }} {{ patient?.last_name }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Age</p>
                  <p>{{ patient?.age }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Contact</p>
                  <p>{{ patient?.phone_number }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Address</p>
                  <p>{{ patient?.address }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Registered</p>
                  <p>{{ formatDate(patient?.created_at) }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Last visit</p>
                  <p>{{ formatDate(patient?.last_visit) }}</p>
                </div>
              </div>
            </div>

            <div class="mt-10">
              <div class="border-l-4 uppercase border-gray-700">
                <p class="ml-2">Medical Data</p>
              </div>
              <div class="grid mt-5 text-sm grid-cols-3 gap-y-10">
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Gender</p>
                  <p>{{ patient?.gender }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Blood Group</p>
                  <p>{{ patient?.blood_group }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Blood Pressure</p>
                  <p>{{ patient?.blood_pressure }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">HIV Status</p>
                  <p>{{ patient?.hiv_status }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Allergic</p>
                  <p v-if="patient?.is_allergic">Yes</p>
                  <p v-else>No</p>
                </div>
               
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Allergens</p>
                  <p>{{ patient?.allergic_description }}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <p class="text-main-100 text-xs">Medical Condition</p>
                  <p>{{ patient?.medical_condition }}</p>
                </div>
               
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
