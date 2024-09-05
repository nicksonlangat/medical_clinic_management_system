<script setup>
import { ref, watch } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'
import moment from 'moment'

const emitter = inject('emitter')

const isOpen = ref(false)

let patients = ref([])
const doctors = ref([])
let currentDoctor = ref('')
let currentPatient = ref('')
let appointment = ref(null)
let isUpdated = ref(false)
let submitting = ref(false)

let isDetailPage = ref(true)

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

const updateAppointmentStatus = (status) => {
  ApiClient()
    .patch(`reservations/${appointment.value.id}/`, { status: status })
    .then((res) => {
      appointment.value = res.data
      emitter.emit('refreshAppointments', {})
    })
    .catch((error) => {
      console.log(error)
    })
}

watch(currentDoctor, (newValue, oldValue) => {
  console.log(`currentDoctor changed from ${oldValue} to ${newValue}`)
  // Add your logic here
})

// Watch for changes to currentPatient
watch(currentPatient, (newValue, oldValue) => {
  console.log(`currentPatient changed from ${oldValue} to ${newValue}`)
  // Add your logic here
})

const updateAppointment = () => {
  submitting.value = true

  let data = {
    created_by: appointment.value.created_by.id,
    description: appointment.value.description,
    reservation_date: appointment.value.reservation_date,
    reservation_number: appointment.value.reservation_number,
    reservation_type: appointment.value.reservation_type,
    status: appointment.value.status,
    treatment: appointment.value.treatment,
    start_time: appointment.value.start_time,
    end_time: appointment.value.end_time,
    doctor: currentDoctor.value,
    patient: currentPatient.value
  }

  ApiClient()
    .put(`reservations/${appointment.value.id}/`, data)
    .then((res) => {
      submitting.value = false
      appointment.value = res.data
      isUpdated.value = true
        setTimeout(function () {
          isUpdated.value = false
        }, 3000)
      emitter.emit('refreshAppointments', {})
    })
    .catch((error) => {
      submitting.value = false
      console.log(error)
    })
}

const deleteAppointment = () => {
  ApiClient()
    .delete(`reservations/${appointment.value.id}/`)
    .then(() => {
      closeModal()
      emitter.emit('refreshAppointments', {})
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

const formatTime = (value) => {
  return moment(value, [moment.ISO_8601, 'HH:mm']).format('LT')
}

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

emitter.on('viewAppointment', (data) => {
  appointment.value = data.data
  currentDoctor.value = appointment.value.doctor.id
  currentPatient.value = appointment.value.patient.id
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
              <div class="flex text-lg font-semibold items-center justify-between">
                <div>
                  <p>
                    <span class="text-sm text-main-100 font-normal">Appointment ID </span>#{{
                      appointment.reservation_number
                    }}
                  </p>
                </div>

                <div class="flex gap-5 items-center">
                  <span
                    v-if="isDetailPage"
                    @click="isDetailPage = false"
                    class="py-2 px-2 bg-light-200 rounded-md text-main-100 hover:text-main transition-all duration-500 cursor-pointer"
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
                      <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                      <path d="M13.5 6.5l4 4" />
                    </svg>
                  </span>
                  <span
                    v-if="!isDetailPage"
                    @click="isDetailPage = true"
                    class="py-2 px-2 bg-light-200 rounded-md text-main-100 hover:text-main transition-all duration-500 cursor-pointer"
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
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path
                        d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
                      />
                    </svg>
                  </span>
                  <span
                    @click="closeModal"
                    class="py-2 px-2 hover:bg-light-200 rounded-md text-main-100 hover:text-main transition-all duration-500 cursor-pointer"
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
              </div>
              <div v-if="isDetailPage">
                <div class="border mt-10 rounded-lg border-gray-100">
                  <div class="p-3 flex justify-between">
                    <div class="flex gap-5 items-center text-sm">
                      <span
                        class="bg-[#e45ef0] text-white text-xs uppercase flex items-center justify-center size-10 rounded-full"
                      >
                        {{ appointment?.patient.first_name[0]
                        }}{{ appointment?.patient.last_name[0] }}
                      </span>
                      <div>
                        <p class="text-xs text-main-100">Patient's Name</p>
                        <p>
                          {{ appointment?.patient.first_name }} {{ appointment?.patient.last_name }}
                        </p>
                      </div>
                    </div>
                    <div class="flex text-xs items-center gap-2">
                      <p class="text-main-100">Status</p>
                      <div v-if="appointment.status == 'Cancelled'" class="flex gap-1 items-center ">
                        <span
                       
                        class="size-2 flex bg-red-500 rounded-full"></span>
                        <p
                        
                        class="text-red-500">{{ appointment?.status }}</p>
                      </div>
                      <div v-else class="flex gap-1 items-center ">
                        <span
                        :class="appointment.status == 'Pending' ? 'bg-yellow-400' : 'bg-emerald-500'"
                        class="size-2 flex rounded-full"></span>
                        <p
                         :class="appointment.status == 'Pending' ? 'text-yellow-400' : 'text-emerald-500'"
                        >{{ appointment?.status }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-8">
                  <div class="bg-light-200 mt-2 rounded-md">
                    <div class="p-3 text-sm text-main-200">
                      <p class="uppercase text-xs text-main-100">description</p>
                      <p class="mt-1">{{ appointment?.description }}</p>
                    </div>
                  </div>
                </div>
                <hr class="mt-5 border-gray-100" />
                <div class="mt-5 flex justify-between">
                  <div class="flex gap-2 items-center">
                    <span class="bg-blue-10 text-blue-50 py-2 px-2 rounded-lg">
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
                          d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"
                        />
                        <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M15 3v4" />
                        <path d="M7 3v4" />
                        <path d="M3 11h16" />
                        <path d="M18 16.496v1.504l1 1" />
                      </svg>
                    </span>
                    <div class="text-sm">
                      <p class="text-main-100 uppercase text-xs">date</p>
                      <p class="text-sm">
                        {{ appointment?.reservation_date }}

                        {{ formatTime(appointment?.start_time) }} -
                        {{ formatTime(appointment?.end_time) }}
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-2 items-center">
                    <span class="bg-blue-10 text-blue-50 py-2 px-2 rounded-lg">
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
                    <div class="text-sm">
                      <p class="text-main-100 uppercase text-xs">doctor</p>
                      <p>{{ appointment?.doctor.user.full_name }}</p>
                    </div>
                  </div>

                  <div class="flex gap-2 items-center">
                    <span class="bg-blue-10 text-blue-50 py-2 px-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-5 h-5"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
                        />
                        <path
                          d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
                        />
                        <path d="M10 14l4 0" />
                        <path d="M12 12l0 4" />
                      </svg>
                    </span>
                    <div class="text-sm">
                      <p class="text-main-100 uppercase text-xs">type</p>
                      <p>{{ appointment?.reservation_type }}</p>
                    </div>
                  </div>
                </div>
                <hr class="mt-5 border-gray-100" />

                <div class="mt-5 flex justify-between">
                  <div class="flex gap-2 items-center text-sm">
                    <p class="text-main-100">Payment</p>
                    <p>Bill #10456</p>
                    <span class="bg-red-50 ml-5 text-red-500 py-1.5 px-3 rounded-full text-xs"
                      >Unpaid</span
                    >
                  </div>
                  <div>
                    <span
                      class="border border-gray-100 py-1.5 px-3 cursor-pointer rounded-lg flex gap-2 items-center text-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="text-yellow-300 h-5 w-5"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"
                        />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                        <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
                        <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
                      </svg>
                      Send reminder
                    </span>
                  </div>
                </div>
                <hr class="mt-5 border-gray-100" />
                <div class="mt-10">
                  <p class="uppercase text-sm font-semibold">General Information</p>
                  <div class="mt-3 grid grid-cols-3 gap-y-5">
                    <div class="text-sm flex flex-col gap-1">
                      <p class="uppercase text-main-100 text-xs">full name</p>
                      <p>
                        {{ appointment?.patient.first_name }} {{ appointment?.patient.last_name }}
                      </p>
                    </div>
                    <div class="text-sm flex flex-col gap-1">
                      <p class="uppercase text-main-100 text-xs">phone number</p>
                      <p>
                        {{ appointment?.patient.phone_number }}
                      </p>
                    </div>
                    <div class="text-sm flex flex-col gap-1">
                      <p class="uppercase text-main-100 text-xs">location</p>
                      <p>
                        {{ appointment?.patient.address }}
                      </p>
                    </div>
                    <div class="text-sm flex flex-col gap-1">
                      <p class="uppercase text-main-100 text-xs">gender</p>
                      <p>
                        {{ appointment?.patient.gender }}
                      </p>
                    </div>
                    <div class="text-sm flex flex-col gap-1">
                      <p class="uppercase text-main-100 text-xs">blood group</p>
                      <p>
                        {{ appointment?.patient.blood_group }}
                      </p>
                    </div>
                    <div class="text-sm flex flex-col gap-1">
                      <p class="uppercase text-main-100 text-xs">hiv status</p>
                      <p>
                        {{ appointment?.patient.hiv_status }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="flex gap-5 mt-10">
                  <button
                    v-if="appointment?.status != 'Pending'"
                    @click="updateAppointmentStatus('Pending')"
                    class="py-1.5 w-full focus:outline-none px-6 rounded-md text-sm bg-yellow-100 text-yellow-500"
                  >
                    Mark Pending
                  </button>

                  <button
                    v-if="appointment?.status != 'Complete'"
                    @click="updateAppointmentStatus('Complete')"
                    class="py-1.5 w-full focus:outline-none px-6 rounded-md text-sm text-white bg-[#46B988]"
                  >
                    Mark Complete
                  </button>
                  <button
                    v-if="appointment?.status != 'Cancelled'"
                    @click="updateAppointmentStatus('Cancelled')"
                    class="py-1.5 w-full px-6 focus:outline-none text-sm bg-light-200 text-main-100 rounded-md"
                  >
                    Mark Cancelled
                  </button>
                </div>
                <div class="mt-5">
                  <button
                    @click="deleteAppointment"
                    class="py-1.5 w-full px-6 rounded-md text-sm border border-dashed border-red-200 hover:bg-red-500 hover:text-white transition-all duration-500 ease-in-out hover:border-0 text-red-500"
                  >
                    Delete Appointment
                  </button>
                </div>
              </div>
              <div v-if="!isDetailPage">
                <div class="mt-5 text-main">
                  <div class="grid mt-5 grid-cols-1 gap-y-5 gap-5">
                    <div class="grid grid-cols-2 gap-5">
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">Patient</label>
                        <select
                          v-model="currentPatient"
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
                          v-model="currentDoctor"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        >
                          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                            {{ doctor.user.first_name }} {{ doctor.user.last_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Appoinment Type</label>
                      <select
                        v-model="appointment.reservation_type"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                        <option :value="appointment.reservation_type" selected>
                          {{ appointment.reservation_type }}
                        </option>
                        <option value="General">General</option>
                        <option value="Acute">Acute</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="CT Scan">CT Scan</option>
                        <option value="Check Up">Check Up</option>
                        <option value="Chronic">Chronic</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Appointment Date</label>
                      <input
                        type="date"
                        v-model="appointment.reservation_date"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">Start time</label>
                        <select
                          v-model="appointment.start_time"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        >
                          <option :value="appointment.start_time" selected>
                            {{ appointment.start_time }}
                          </option>
                          <option v-for="hour in hours" :key="hour" :value="hour">
                            {{ hour }}
                          </option>
                        </select>
                      </div>
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">End time</label>

                        <select
                          v-model="appointment.end_time"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        >
                          <option :value="appointment.end_time" selected>
                            {{ appointment.end_time }}
                          </option>
                          <option v-for="hour in hours" :key="hour" :value="hour">
                            {{ hour }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Description</label>
                      <textarea
                        v-model="appointment.description"
                        rows="4"
                        class="bg-light-200 resize-none placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                      </textarea>
                    </div>

                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Treatment</label>
                      <textarea
                        v-model="appointment.treatment"
                        rows="4"
                        class="bg-light-200 resize-none placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                      </textarea>
                    </div>
                  </div>
                </div>
                <div class="mt-10 flex justify-between gap-5 text-sm">
                  <button
                    @click="isDetailPage = true"
                    class="bg-light-300 inline-flex gap-2 items-center justify-center text-main w-full py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button v-if="isUpdated" class="w-full bg-[#EAF8F3] border border-[#71D6B2] rounded-md">Appoinment updated</button>
                  <button
                    v-if="!submitting && !isUpdated"
                    @click="updateAppointment"
                    class="bg-blue-50 inline-flex gap-2 disabled:opacity-40 items-center justify-center w-full text-white py-2 rounded-md"
                  >
                    Update Appoinment
                  </button>
                  <button
                    v-if="submitting && !isUpdated"
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
                    Updating...
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
