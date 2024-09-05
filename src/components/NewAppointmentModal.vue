<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'

const emitter = inject('emitter')

const isOpen = ref(false)

let currentStep = ref(1)
let patients = ref([])
const doctors = ref([])
let submitting = ref(false)

let reservation = ref({
  patient: '',
  doctor: '',
  reservation_date: '',
  reservation_type: '',
  start_time: '',
  end_time: '',
  description: '',
  treatment: ''
})

let hours = ref([
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00'
])

const addNewReservation = () => {
  submitting.value = true
  ApiClient()
    .post('reservations/', reservation.value)
    .then((res) => {
      submitting.value = false
      console.log(res.data)
      closeModal()
      showNotification()
      emitter.emit('refreshAppointments', {})
    })
    .catch((error) => {
      console.log(error)
      // closeModal()
    })
}

const getPatients = () => {
  ApiClient()
    .get('patients')
    .then((res) => {
      patients.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const getDoctors = () => {
  ApiClient()
    .get('staff')
    .then((res) => {
      doctors.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const showNotification = () => {
  emitter.emit('showNotification', {
    type: 'success',
    title: 'Appoinment booked',
    message: 'Appointment has been successfully booked!'
  })
}

function closeModal() {
  isOpen.value = false
  emitter.emit('refreshReservations', {})
}
function openModal() {
  isOpen.value = true
}

emitter.on('newReservation', () => {
  openModal()
})

getDoctors()
getPatients()
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex h-full items-center justify-end p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full h-full max-w-lg transform overflow-hidden text-main font-base rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex text-xl font-semibold justify-between">
                <p>New Reservation</p>

                <span
                  @click="closeModal"
                  class="py-2 px-2 hover:bg-light-200 rounded-full text-main-100 hover:text-main transition-all duration-500 cursor-pointer"
                >
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
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                  </svg>
                </span>
              </div>
              <div v-if="currentStep == 1">
                <div class="mt-5 text-main">
                  <div class="grid mt-5 grid-cols-1 gap-y-5 gap-5">
                    <div class="grid grid-cols-2 gap-5">
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">Patient</label>
                        <select
                          v-model="reservation.patient"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        >
                          <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                            {{ patient.first_name }} {{ patient.last_name }}
                          </option>
                        </select>
                      </div>
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">Doctor</label>
                        <select
                          v-model="reservation.doctor"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        >
                          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                            {{ doctor.user.first_name }} {{ doctor.user.last_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Reservation Type</label>
                      <select
                        v-model="reservation.reservation_type"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                        <option value="General">General</option>
                        <option value="Acute">Acute</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="Check Up">Check Up</option>
                        <option value="Chronic">Chronic</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Reservation Date</label>
                      <input
                        type="date"
                        v-model="reservation.reservation_date"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">Start time</label>
                        <select
                          v-model="reservation.start_time"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        >
                          <option v-for="hour in hours" :key="hour" :value="hour">
                            {{ hour }}
                          </option>
                        </select>
                      </div>
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">End time</label>

                        <select
                          v-model="reservation.end_time"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        >
                          <option v-for="hour in hours" :key="hour" :value="hour">
                            {{ hour }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Description</label>
                      <textarea
                        v-model="reservation.description"
                        rows="4"
                        class="bg-light-200 resize-none placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                      </textarea>
                    </div>

                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Treatment</label>
                      <textarea
                        v-model="reservation.treatment"
                        rows="4"
                        class="bg-light-200 resize-none placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>

                <div class="mt-10 flex justify-between gap-5 text-sm">
                  <button
                    @click="closeModal"
                    class="bg-light-300 inline-flex gap-2 items-center justify-center text-main w-full py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    v-if="!submitting"
                    @click="addNewReservation"
                    class="bg-blue-50 inline-flex gap-2 disabled:opacity-40 items-center justify-center w-full text-white py-2 rounded-md"
                  >
                    Add Appoinment
                  </button>
                  <button
                    v-if="submitting"
                    class="bg-blue-50 inline-flex gap-2 disabled:opacity-40 items-center justify-center w-full text-white py-2 rounded-md"
                  >
                    <svg
                      class="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Booking...
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
