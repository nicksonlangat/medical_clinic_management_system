<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'
import { Switch } from '@headlessui/vue'

const emitter = inject('emitter')

const isOpen = ref(false)
const imageSrc = ref(null)
let currentStep = ref(1)
let docArray = ref(null)
let submitting = ref(false)

const baseURL = import.meta.env.VITE_BASE_URL

const onChange = (event) => {
  const file = event.target.files[0]
  docArray.value = file

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageSrc.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

let staff = ref(null)
let user = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  role: '',
  job_title: '',
  staff_type: '',
  job_type: ''
})

let weekdays = ref([
  {
    day: 'Monday',
    enabled: true,
    start_time: '12:00 AM',
    end_time: '11:00 PM'
  },
  {
    day: 'Tuesday',
    enabled: true,
    start_time: '12:00 AM',
    end_time: '11:00 PM'
  },
  {
    day: 'Wednesday',
    enabled: true,
    start_time: '12:00 AM',
    end_time: '11:00 PM'
  },
  {
    day: 'Thursday',
    enabled: true,
    start_time: '12:00 AM',
    end_time: '11:00 PM'
  },
  {
    day: 'Friday',
    enabled: true,
    start_time: '12:00 AM',
    end_time: '11:00 PM'
  },
  {
    day: 'Saturday',
    enabled: true,
    start_time: '12:00 AM',
    end_time: '11:00 PM'
  },
  {
    day: 'Sunday',
    enabled: true,
    start_time: '12:00 AM',
    end_time: '11:00 PM'
  }
])

let hours = ref([
  '12:00 AM',
  '1:00 AM',
  '2:00 AM',
  '3:00 AM',
  '4:00 AM',
  '5:00 AM',
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM'
])

const updateStaff = () => {
  submitting.value = true
  updateUser()
}

const showNotification = () => {
  emitter.emit('showNotification', {
    type: 'success',
    title: 'Staff updated',
    message: 'Staff has been successfully updated!'
  })
}

const updateUser = () => {
  let data = new FormData()
  data.append('first_name', user.value.first_name)
  data.append('last_name', user.value.last_name)
  data.append('email', user.value.email)
  data.append('phone_number', user.value.phone_number)
  if (docArray.value) {
    data.append('image', docArray.value, docArray.value.name)
  }

  ApiClient('multipart/formdata')
    .put(`update-user/${staff.value.user.id}/`, data)
    .then(() => {
      editStaff()
    })
    .catch((error) => {
      submitting.value = false
      console.log(error)
    })
}

const editStaff = () => {
  let data = {
    user: staff.value.user.id,
    job_title: user.value.job_title,
    job_type: user.value.job_type,
    staff_type: user.value.role,
    working_days: weekdays.value
  }
  ApiClient()
    .patch(`staff/${staff.value.id}/`, data)
    .then(() => {
      submitting.value = false

      closeModal()
      showNotification()
      currentStep.value = 1
    })
    .catch((error) => {
      submitting.value = false
      console.log(error)
    })
}

function closeModal() {
  isOpen.value = false
  emitter.emit('refreshStaff', {})
}
function openModal() {
  isOpen.value = true
}

emitter.on('showStaff', (data) => {
  staff.value = data.staff
  user.value.first_name = data.staff.user.first_name
  user.value.last_name = data.staff.user.last_name
  user.value.email = data.staff.user.email
  user.value.phone_number = data.staff.user.phone_number
  user.value.role = data.staff.staff_type
  user.value.job_title = data.staff.job_title
  user.value.job_type = data.staff.job_type
  weekdays.value = data.staff.working_days
  imageSrc.value = baseURL + data.staff.user.image
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
                <p>View Staff</p>

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
                  <div class="flex gap-5 items-center">
                    <label
                      class="bg-light-300 flex items-center justify-center text-main-100 cursor-pointer h-20 w-20 rounded-full"
                    >
                      <input
                        name="docArray"
                        @change="onChange"
                        id="dropzone-file"
                        type="file"
                        class="hidden"
                      />
                      <img
                        v-if="imageSrc"
                        class="h-20 w-20 object-cover rounded-full"
                        :src="imageSrc"
                        alt="Image Preview"
                      />
                      <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-12 w-12"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                        <path
                          d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z"
                        />
                      </svg>
                    </label>
                    <div class="text-sm">
                      <p class="text-blue-50">Upload photo</p>

                      <p class="text-main-100">An image of the staff to be added in the system.</p>
                    </div>
                  </div>
                  <div class="grid mt-5 grid-cols-1 gap-y-5 gap-5">
                    <div class="grid grid-cols-2 gap-2">
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">First name</label>
                        <input
                          type="text"
                          v-model="user.first_name"
                          placeholder="First name"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        />
                      </div>
                      <div class="flex flex-col gap-2 text-sm text-main-200">
                        <label for="">Last name</label>
                        <input
                          v-model="user.last_name"
                          type="text"
                          placeholder="Last name"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                        />
                      </div>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Email</label>
                      <input
                        type="email"
                        v-model="user.email"
                        placeholder="Email"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Phone Number</label>
                      <input
                        type="text"
                        v-model="user.phone_number"
                        placeholder="Phone number"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Role</label>
                      <select
                        v-model="user.role"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Contract</label>
                      <select
                        v-model="user.job_type"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                      </select>
                    </div>
                    <div class="flex flex-col gap-2 text-sm text-main-200">
                      <label for="">Job Title</label>
                      <input
                        type="text"
                        v-model="user.job_title"
                        placeholder="Job title"
                        class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
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
                  <div class="flex flex-col gap-10">
                    <div
                      v-for="weekday in weekdays"
                      :key="weekday.day"
                      class="flex justify-between items-center text-sm"
                    >
                      <div class="flex gap-5 items-center">
                        <Switch
                          v-model="weekday.enabled"
                          :class="weekday.enabled ? 'bg-blue-50' : 'bg-light-300'"
                          class="relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                        >
                          <span class="sr-only">Hour setting</span>
                          <span
                            aria-hidden="true"
                            :class="weekday.enabled ? 'translate-x-9' : 'translate-x-0'"
                            class="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                          />
                        </Switch>
                        <p>{{ weekday.day }}</p>
                      </div>

                      <div class="flex gap-5 items-center">
                        <select
                          v-model="weekday.start_time"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-1.5 text-sm border-0 rounded-md w-full"
                        >
                          <option v-for="hour in hours" :key="hour" :value="hour">
                            {{ hour }}
                          </option>
                        </select>
                        <p>to</p>
                        <select
                          v-model="weekday.end_time"
                          class="bg-light-200 placeholder:text-main-100 focus:ring-0 focus:outline-none py-1.5 text-sm border-0 rounded-md w-full"
                        >
                          <option v-for="hour in hours" :key="hour" :value="hour">
                            {{ hour }}
                          </option>
                        </select>
                      </div>
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
                      @click="updateStaff"
                      class="bg-blue-50 inline-flex gap-2 disabled:opacity-40 items-center justify-center w-full text-white py-2 rounded-md"
                    >
                      Update staff
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
