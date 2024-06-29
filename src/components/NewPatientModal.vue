<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'
import { Switch } from '@headlessui/vue'
import moment from 'moment'

const emitter = inject('emitter')

const isOpen = ref(false)
// const imageSrc = ref(null)
let currentStep = ref(1)
let docArray = ref(null)
let submitting = ref(false)

// const onChange = (event) => {
//   const file = event.target.files[0]
//   docArray.value = file
//   console.log(docArray.value)

//   if (file && file.type.startsWith('image/')) {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       imageSrc.value = e.target.result
//     }
//     reader.readAsDataURL(file)
//   }
// }

let patient = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  address: '',
  clinic: '',
  gender: 'Male',
  age: '',
  hiv_status: '',
  blood_group: '',
  blood_pressure: '',
  is_allergic: false,
  allergic_description: '',
  medical_condition: '',
  last_visit: moment(new Date()).format('YYYY-MM-DD')
})

const addNewPatient = () => {
  submitting.value = true
  createPatient()
}

const showNotification = () => {
  emitter.emit('showNotification', {
    type: 'success',
    title: 'Patient added',
    message: 'Patient has been successfully added!'
  })
}

let clinics = ref([])

emitter.on('setCurrentUser', (data) => {
  clinics.value = data.clinics
})

const createPatient = () => {
  let data = new FormData()
  data.append('first_name', patient.value.first_name)
  data.append('last_name', patient.value.last_name)
  data.append('phone_number', patient.value.phone_number)
  data.append('age', patient.value.age)
  data.append('email', patient.value.email)
  data.append('address', patient.value.address)
  data.append('clinic', clinics.value[0].id)
  data.append('gender', patient.value.gender)
  data.append('hiv_status', patient.value.hiv_status)
  data.append('blood_group', patient.value.blood_group)
  data.append('blood_pressure', patient.value.blood_pressure)
  data.append('is_allergic', patient.value.is_allergic)
  data.append('allergic_description', patient.value.allergic_description)
  data.append('medical_condition', patient.value.medical_condition)
  data.append('last_visit', patient.value.last_visit)

  if (docArray.value) {
    data.append('image', docArray.value, docArray.value.name)
  }

  ApiClient('multipart/formdata')
    .post('patients/', data)
    .then(() => {
      submitting.value = false

      closeModal()
      showNotification()
    })
    .catch((error) => {
      submitting.value = false
      console.log(error)
    })
}

function closeModal() {
  isOpen.value = false
  emitter.emit('refreshPatients', {})
}
function openModal() {
  isOpen.value = true
}

emitter.on('newPatient', () => {
  openModal()
})
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
                <p>New Patient</p>

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
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">First name</label>
                      <input
                        type="text"
                        v-model="patient.first_name"
                        placeholder="First name"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Last name</label>
                      <input
                        v-model="patient.last_name"
                        type="text"
                        placeholder="Last name"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>

                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Age</label>
                      <input
                        type="text"
                        v-model="patient.age"
                        placeholder="Patient's age"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Email (optional)</label>
                      <input
                        type="email"
                        v-model="patient.email"
                        placeholder="Email"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Phone Number</label>
                      <input
                        type="text"
                        v-model="patient.phone_number"
                        placeholder="Phone number"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Address</label>
                      <input
                        type="text"
                        v-model="patient.address"
                        placeholder="Address"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>

                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Gender</label>
                      <select
                        v-model="patient.gender"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
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
                    @click="currentStep = 2"
                    class="bg-blue-50 inline-flex gap-2 disabled:opacity-40 items-center justify-center w-full text-white py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
              <div v-if="currentStep == 2">
                <div class="text-main mt-10 font-base">
                  <div class="flex flex-col gap-5">
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">HIV Status</label>
                      <select
                        v-model="patient.hiv_status"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                        <option value="Negative">Negative</option>
                        <option value="Positive">Positive</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Blood Group</label>
                      <select
                        v-model="patient.blood_group"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                        <option value="AB">AB</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Blood Pressure</label>
                      <input
                        v-model="patient.blood_pressure"
                        type="text"
                        placeholder=""
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex text-sm text-main-200 gap-2 items-center">
                      <p>Is Allergic?</p>
                      <Switch
                        v-model="patient.is_allergic"
                        :class="patient.is_allergic ? 'bg-blue-50' : 'bg-light-300'"
                        class="relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                      >
                        <span class="sr-only">Allergy setting</span>
                        <span
                          aria-hidden="true"
                          :class="patient.is_allergic ? 'translate-x-9' : 'translate-x-0'"
                          class="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                        />
                      </Switch>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Allergies</label>
                      <input
                        v-model="patient.allergic_description"
                        type="text"
                        placeholder="Allergic description"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Medical Condition</label>
                      <textarea
                        v-model="patient.medical_condition"
                        type="text"
                        placeholder="Describe patient's description"
                        rows="4"
                        class="bg-light-200 placeholder:text-main-100 resize-none focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      ></textarea>
                    </div>
                  </div>

                  <div class="mt-10 flex justify-between gap-5 text-sm">
                    <button
                      @click="currentStep = 1"
                      class="bg-light-300 inline-flex gap-2 items-center justify-center text-main w-full py-2 rounded-md"
                    >
                      Previous
                    </button>
                    <button
                      v-if="!submitting"
                      @click="addNewPatient"
                      class="bg-blue-50 inline-flex gap-2 disabled:opacity-40 items-center justify-center w-full text-white py-2 rounded-md"
                    >
                      Add patient
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
                      Submitting...
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
