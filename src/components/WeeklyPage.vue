<script setup>
import { ref } from 'vue'
import ApiClient from '../services/http.js'
import { inject } from 'vue'
import moment from 'moment'
const emitter = inject('emitter')

let weekly_appointments = ref([])

const getWeeklyAppointments = () => {
  ApiClient()
    .get('weekly/appointments')
    .then((res) => {
      weekly_appointments.value = res.data.results
    })
    .catch((error) => {
      console.log(error)
    })
}

const formatTime = (value) => {
  return moment(value, [moment.ISO_8601, 'HH:mm']).format('LT')
}

const openNewReservation = () => {
  emitter.emit('newReservation')
}

const openAppointment = (appointment) => {
  emitter.emit('viewAppointment', { data: appointment })
}

emitter.on('refreshAppointments', () => {
  getWeeklyAppointments()
})

getWeeklyAppointments()
</script>
<template>
  <div class="font-base mt-5">
    <div class="flex justify-between">
      <div class="flex gap-3 items-center">
        <p>July 2024</p>
        <button class="bg-light-200 py-1.5 px-2 rounded-md text-xs">This week</button>
      </div>
      <div class="flex gap-5 items-center">
        <div
          class="border text-xs py-1.5 rounded-md px-2 gap-2 cursor-pointer flex items-center text-main-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-4"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M15 3v4" />
            <path d="M7 3v4" />
            <path d="M3 11h16" />
            <path d="M18 16.496v1.504l1 1" />
          </svg>
          24 July - 31 July
        </div>
        <button
          @click="openNewReservation"
          class="bg-blue-50 text-white text-xs rounded-md py-1.5 px-2"
        >
          New Appointment
        </button>
        <button class="bg-light-200 text-main-100 text-xs rounded-md py-1.5 px-2">Filters</button>
        <button class="bg-light-200 text-main-100 text-xs rounded-md py-1.5 px-2">
          All Dentists
        </button>
      </div>
    </div>

    <div class="grid h-screen border-t mt-5 grid-cols-5 divide-x">
      <div v-for="day in weekly_appointments" :key="day" class="h-full">
        <div>
          <p
            :class="day.today ? 'text-main bg-light-300' : 'text-main-200'"
            class="uppercase p-3 text-xs text-center"
          >
            {{ day.day.slice() }} {{ day.date }}
          </p>
          <hr />
        </div>
        <div class="mt-5 flex px-2 flex-col gap-2">
          <div
            v-for="item in day.appointments"
            :key="item"
            @click="openAppointment(item)"
            class="even:bg-[#F1F7EC] cursor-pointer first:bg-[#E9F5FC] bg-[#FCEBF1] rounded-md"
          >
            <div class="p-3 text-xs">
              <div class="flex justify-between items-center">
                <p class="font-bold">{{ item.doctor?.user?.full_name }}</p>
                <div class="bg-white flex items-center gap-2 py-0.5 px-2 rounded-md">
                  <span class="size-1.5 bg-emerald-500 rounded-full"></span>
                  {{ item.status }}
                </div>
              </div>

              <p class="font-bold mt-1">
                {{ item.patient.first_name }} {{ item.patient.last_name }}
              </p>
              <p class="text-main-100 mt-1">
                {{ formatTime(item.start_time) }} - {{ formatTime(item.end_time) }}
              </p>
              <br />
              <span class="bg-white py-0.5 px-2 rounded-md">{{ item.reservation_type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
