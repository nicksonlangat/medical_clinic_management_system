<script setup>
import { ref } from 'vue'
import AuthClient from '../services/auth.js'
import ApiClient from '../services/http.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const user = ref({
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  password: '',
  role: 'Owner'
})

const clinic = ref({
  name: '',
  location: '',
  opening_hour: '',
  closing_hour: '',
  clinic_email: '',
  clinic_phone_number: ''
})

const passwordError = ref(false)
const emailError = ref(false)
const phoneError = ref(false)
const registerDone = ref(false)
const activateDone = ref(false)
const loginDone = ref(false)
const clinicCreationDone = ref(false)
const requestingNewCode = ref(false)
const activatingAccount = ref(false)
const codeError = ref(false)
const logging = ref(false)
const creatingClinic = ref(false)
const creatingAccount = ref(false)
const activation_code = ref('')
let currentForm = ref('register')
let docArray = ref(null)

const registerUser = () => {
  creatingAccount.value = true
  AuthClient()
    .post('register', user.value)
    .then((res) => {
      creatingAccount.value = false
      if (res.status == 201) {
        currentForm.value = 'activate'
        registerDone.value = true
      }
    })
    .catch((error) => {
      creatingAccount.value = false
      if (error.response.data.password != undefined) {
        passwordError.value = true
        setTimeout(function () {
          passwordError.value = false
        }, 3000)
      }
      if (error.response.data.email != undefined) {
        // emailError.value = true
        setTimeout(function () {
          emailError.value = false
        }, 3000)
        currentForm.value = 'activate'
        registerDone.value = true
      }
      if (error.response.data.phone_number != undefined) {
        phoneError.value = true
        setTimeout(function () {
          phoneError.value = false
        }, 3000)
      }
    })
}

const resendCode = () => {
  requestingNewCode.value = true
  AuthClient()
    .post('password/reset', { email: user.value.email, action: 'resend' })
    .then((res) => {
      if (res.data.success) {
        requestingNewCode.value = false
      } else {
        requestingNewCode.value = false
        currentForm.value = 'login'
        activateDone.value = true
      }
    })
}

const activateAccount = () => {
  activatingAccount.value = true
  AuthClient()
    .post('activate/account', { email: user.value.email, code: activation_code.value })
    .then((res) => {
      activatingAccount.value = false
      if (res.data.success) {
        currentForm.value = 'login'
        activateDone.value = true
      } else {
        codeError.value = true
        setTimeout(function () {
          codeError.value = false
        }, 3000)
      }
    })
}

const loginUser = () => {
  logging.value = true
  AuthClient()
    .post('login', { email: user.value.email, password: user.value.password })
    .then((res) => {
      localStorage.setItem('clinicsync', JSON.stringify(res.data.access))
      localStorage.setItem('clinicsyncAuthenticated', true)
      logging.value = false
      currentForm.value = 'clinic'
      loginDone.value = true
    })
    .catch((error) => {
      logging.value = false
      if (error.response.data.detail.includes('email')) {
        emailError.value = true
        setTimeout(function () {
          emailError.value = false
        }, 3000)
      }
      if (error.response.data.detail.includes('password')) {
        passwordError.value = true
        setTimeout(function () {
          passwordError.value = false
        }, 3000)
      }
    })
}

const onChange = (event) => {
  docArray.value = event.target.files[0]
}
const createClinic = () => {
  creatingClinic.value = true
  let data = new FormData()
  data.append('name', clinic.value.name)
  data.append('location', clinic.value.location)
  data.append('opening_hour', clinic.value.opening_hour)
  data.append('closing_hour', clinic.value.closing_hour)
  data.append('clinic_email', clinic.value.clinic_email)
  data.append('clinic_phone_number', clinic.value.clinic_phone_number)

  if (docArray.value) {
    data.append('logo', docArray.value, docArray.value.name)
  }
  ApiClient('multipart/formdata')
    .post(`clinics/`, data)
    .then(() => {
      creatingClinic.value = false
      router.push({ name: 'home' })
    })
    .catch((error) => {
      creatingClinic.value = false
      console.log(error)
    })
}
</script>

<template>
  <main class="text-main font-base bg-light-200 h-screen">
    <div class="flex h-full">
      <div class="w-1/2 h-full bg-white">
        <div class="p-10 flex flex-col items-center h-full justify-center">
          <!-- <div class="mt-5 w-full max-w-md">
            <span class="text-2xl inline-flex gap-1 items-center font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-8 w-8"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -20 0l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72m2 5a1 1 0 0 0 -1 1v2.999h-2v-2.999a1 1 0 0 0 -.883 -.993l-.117 -.007a1 1 0 0 0 -1 1v8a1 1 0 0 0 2 0v-3.001h2v3.001a1 1 0 0 0 .883 .993l.117 .007a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1"
                />
              </svg>
              ClinicSync</span
            >
          </div> -->
          <div class="grid mt-5 grid-cols-4 max-w-md w-full">
            <div class="flex text-main-100 flex-col text-sm">
              <div class="flex gap-1 items-center justify-center">
                <div class="">
                  <svg
                    v-if="currentForm == 'register' || registerDone"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-10 w-10 text-blue-50"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-10 w-10"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                    <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                    <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                    <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                    <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                    <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                    <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                    <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                    <path d="M9 12l2 2l4 -4" />
                  </svg>
                </div>
                <div class="w-full bg-inherit rounded-full h-1.5">
                  <div
                    :class="
                      currentForm == 'register' || registerDone ? 'bg-blue-50' : 'bg-gray-300'
                    "
                    class="h-1.5 rounded-full"
                    style="width: 100%"
                  ></div>
                </div>
              </div>
              <p
                :class="currentForm == 'register' || registerDone ? 'text-main' : ''"
                class="ml-2 mt-1"
              >
                Create account
              </p>
            </div>
            <div class="flex text-main-100/50 flex-col text-sm">
              <div class="flex gap-1 items-center justify-center">
                <div class="">
                  <svg
                    v-if="currentForm == 'activate' || activateDone"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-10 w-10 text-blue-50"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-10 w-10"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                    <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                    <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                    <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                    <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                    <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                    <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                    <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                    <path d="M9 12l2 2l4 -4" />
                  </svg>
                </div>
                <div class="w-full bg-inherit rounded-full h-1.5">
                  <div
                    :class="
                      currentForm == 'activate' || activateDone ? 'bg-blue-50' : 'bg-gray-300'
                    "
                    class="h-1.5 rounded-full"
                    style="width: 100%"
                  ></div>
                </div>
              </div>
              <p
                :class="currentForm == 'activate' || activateDone ? 'text-main' : ''"
                class="ml-2 mt-1"
              >
                Activate account
              </p>
            </div>
            <div class="flex text-main-100/50 flex-col text-sm">
              <div class="flex gap-1 items-center justify-center">
                <div class="">
                  <svg
                    v-if="currentForm == 'login' || loginDone"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-10 w-10 text-blue-50"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-10 w-10"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                    <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                    <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                    <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                    <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                    <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                    <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                    <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                    <path d="M9 12l2 2l4 -4" />
                  </svg>
                </div>
                <div class="w-full bg-inherit rounded-full h-1.5">
                  <div
                    :class="currentForm == 'login' || loginDone ? 'bg-blue-50' : 'bg-gray-300'"
                    class="h-1.5 rounded-full"
                    style="width: 100%"
                  ></div>
                </div>
              </div>
              <p :class="currentForm == 'login' || loginDone ? 'text-main' : ''" class="ml-2 mt-1">
                Log in
              </p>
            </div>
            <div class="flex text-main-100/50 flex-col text-sm">
              <div class="flex gap-1 items-center justify-center">
                <div class="">
                  <svg
                    v-if="currentForm == 'clinic' || clinicCreationDone"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-10 w-10 text-blue-50"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path
                      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-10 w-10"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                    <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                    <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                    <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                    <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                    <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                    <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                    <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                    <path d="M9 12l2 2l4 -4" />
                  </svg>
                </div>
                <div class="w-full bg-inherit rounded-full h-1.5">
                  <div
                    :class="
                      currentForm == 'clinic' || clinicCreationDone ? 'bg-blue-50' : 'bg-gray-300'
                    "
                    class="h-1.5 rounded-full"
                    style="width: 100%"
                  ></div>
                </div>
              </div>
              <p
                :class="currentForm == 'clinic' || clinicCreationDone ? 'text-main' : ''"
                class="ml-2 mt-1"
              >
                Create clinic
              </p>
            </div>
          </div>
          <div v-if="currentForm == 'clinic'" class="w-full mt-5 max-w-md">
            <p class="text-3xl font-bold">Create clinic</p>
            <p class="text-main-200 mt-3 text-sm">
              Almost there! Create your clinic which will serve as your workspace. You will be
              redirected to your clinic's dashboard from here.
            </p>

            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Name</label>
              <input
                v-model="clinic.name"
                type="text"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Location</label>
              <input
                v-model="clinic.location"
                type="text"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="flex mt-5 flex-col gap-2 text-sm">
                <label for="">Clinic Email</label>
                <input
                  v-model="clinic.clinic_email"
                  type="text"
                  class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
                />
              </div>
              <div class="flex mt-5 flex-col gap-2 text-sm">
                <label for="">Clinic Number</label>
                <input
                  v-model="clinic.clinic_phone_number"
                  type="text"
                  class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
                />
              </div>
              <div class="flex mt-5 flex-col gap-2 text-sm">
                <label for="">Opening Hours</label>
                <input
                  v-model="clinic.opening_hour"
                  type="text"
                  class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
                />
              </div>
              <div class="flex mt-5 flex-col gap-2 text-sm">
                <label for="">Closing Hour</label>
                <input
                  v-model="clinic.closing_hour"
                  type="text"
                  class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
                />
              </div>
              <div class="mt-8">
                <label
                  class="border border-dashed border-light-200 cursor-pointer py-2.5 hover:bg-light-200 transition-all duration-500 text-main-200 font-base text-sm rounded-md px-4"
                >
                  Click to upload the clinic's logo
                  <input
                    name="docArray"
                    @change="onChange"
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                  />
                </label>
              </div>
              <div class="mt-9 text-xs text-main-200 truncate">
                {{ docArray?.name }}
              </div>
            </div>

            <div class="mt-10">
              <button
                v-if="!creatingClinic"
                @click="createClinic"
                :disabled="
                  clinic.name == '' ||
                  clinic.location == '' ||
                  clinic.clinic_email == '' ||
                  clinic.clinic_phone_number == '' ||
                  clinic.closing_hour == '' ||
                  clinic.opening_hour == ''
                "
                class="bg-blue-50 disabled:opacity-50 text-white py-2 rounded-md w-full text-sm"
              >
                Create clinic
              </button>
              <button
                v-if="creatingClinic"
                class="bg-blue-50 flex gap-2 justify-center items-center text-white py-2 rounded-md w-full text-sm"
              >
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Creating...
              </button>
            </div>
          </div>
          <div v-if="currentForm == 'login'" class="w-full mt-5 max-w-md">
            <p class="text-3xl font-bold">Log in to your account</p>

            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Email</label>
              <input
                v-model="user.email"
                type="email"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
              <small v-if="emailError" class="text-xs text-red-500">Invalid email.</small>
            </div>
            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Password</label>
              <input
                v-model="user.password"
                type="password"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
              <small v-if="passwordError" class="text-xs text-red-500">Invalid password.</small>
            </div>
            <div class="mt-10">
              <button
                v-if="!logging"
                @click="loginUser"
                :disabled="user.email == '' || user.password == ''"
                class="bg-blue-50 disabled:opacity-50 text-white py-2 rounded-md w-full text-sm"
              >
                Log in
              </button>
              <button
                v-if="logging"
                class="bg-blue-50 flex gap-2 justify-center items-center text-white py-2 rounded-md w-full text-sm"
              >
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Logging in...
              </button>
            </div>
            <div class="mt-5 flex gap-2 text-sm">
              <p>Don't have an account?</p>
              <a href="/register" class="text-blue-50">Register</a>
            </div>
          </div>
          <div v-if="currentForm == 'activate'" class="w-full mt-5 max-w-md">
            <p class="text-3xl font-bold">Activate account</p>
            <p class="mt-3 text-sm text-main-200">
              We have sent a 6-digit code to {{ user.email }}. <br />
              Please enter this code to activate your account and proceed to the next section.
            </p>
            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Activation code</label>
              <input
                v-model="activation_code"
                type="text"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
              <small v-if="codeError" class="text-xs text-red-500">Invalid code entered.</small>
            </div>
            <div class="mt-10">
              <button
                v-if="!activatingAccount"
                @click="activateAccount"
                :disabled="activation_code == ''"
                class="bg-blue-50 disabled:opacity-50 text-white py-2 rounded-md w-full text-sm"
              >
                Activate account
              </button>
              <button
                v-if="activatingAccount"
                class="bg-blue-50 flex gap-2 justify-center items-center text-white py-2 rounded-md w-full text-sm"
              >
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Activating...
              </button>
            </div>
            <div class="mt-5 flex gap-2 text-sm">
              <p>Didn't receive the code?</p>
              <button v-if="requestingNewCode" class="flex gap-2 text-sm text-blue-50 items-center">
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  /></svg
                >Resending
              </button>
              <button v-if="!requestingNewCode" class="text-blue-50" @click="resendCode">
                Resend
              </button>
            </div>
          </div>
          <div v-if="currentForm == 'register'" class="w-full mt-5 max-w-md">
            <p class="text-3xl font-bold">Create account</p>

            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Email</label>
              <input
                v-model="user.email"
                type="email"
                class="bg-light-200 py-2 text-main-200 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
              <small v-if="emailError" class="text-xs text-red-500">Email must be unique.</small>
            </div>
            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">First Name</label>
              <input
                v-model="user.first_name"
                type="text"
                class="bg-light-200 py-2 text-main-200 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Last Name</label>
              <input
                v-model="user.last_name"
                type="text"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
            </div>
            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Phone Number</label>
              <input
                v-model="user.phone_number"
                type="text"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
              <small v-if="phoneError" class="text-xs text-red-500"
                >Phone number must be unique.</small
              >
            </div>
            <div class="flex mt-5 flex-col gap-2 text-sm">
              <label for="">Password</label>
              <input
                v-model="user.password"
                type="password"
                class="bg-light-200 text-main-200 py-2 rounded-md border-0 focus:ring-0 focus:outline-none"
              />
              <small v-if="passwordError" class="text-xs text-red-500"
                >Password must be 8 characters, alphanuneric.</small
              >
            </div>
            <div class="mt-10">
              <button
                v-if="creatingAccount"
                class="bg-blue-50 flex gap-2 justify-center items-center text-white py-2 rounded-md w-full text-sm"
              >
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Creating...
              </button>
              <button
                v-if="!creatingAccount"
                @click="registerUser"
                :disabled="
                  user.email == '' ||
                  user.first_name == '' ||
                  user.last_name == '' ||
                  user.phone_number == '' ||
                  user.password == ''
                "
                class="bg-blue-50 disabled:opacity-50 text-white py-2 rounded-md w-full text-sm"
              >
                Create account
              </button>
              <div class="mt-5 flex gap-2 text-sm">
                <p>Already have an account?</p>
                <a class="text-blue-50" href="/login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 h-full flex flex-col items-center justify-center bg-blue-50">
        <div class="p-5">
          <p class="text-4xl text-white font-semibold">
            Transform Your Clinic With <br />
            Powerful Tools
          </p>
          <div class="grid grid-cols-2 gap-2 mt-10">
            <div class="bg-white rounded-xl">
              <div class="p-5">
                <div class="bg-light-200 rounded-xl">
                  <div class="p-5 text-sm">
                    <span
                      class="bg-blue-50 flex w-8 h-8 items-center justify-center text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                          d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"
                        />
                        <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" />
                      </svg>
                    </span>
                    <p class="mt-2">Streamline sales</p>
                    <p class="text-xs uppercase mt-3 text-main-200 font-semibold">
                      ksh 650,768.98 revenue
                    </p>
                    <p class="text-xs uppercase mt-3 text-main-200 font-semibold">
                      ksh 50,768.98 profit
                    </p>
                  </div>
                </div>
                <div class="bg-white mt-2 rounded-xl">
                  <div class="p-5 bg-light-200 rounded-xl text-sm">
                    <span
                      class="bg-blue-50 flex w-8 h-8 items-center justify-center text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path
                          d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                        />
                        <path d="M9 7l1 0" />
                        <path d="M9 13l6 0" />
                        <path d="M13 17l2 0" />
                      </svg>
                    </span>
                    <p class="mt-2">Realtime inventory</p>
                    <p class="text-xs uppercase mt-3 font-semibold gap-5 inline-flex">
                      <span class="text-cyan-500">56 in stock</span>
                      <span class="text-yellow-400">6 low </span>
                      <span class="text-red-500">56 out of stock</span>
                    </p>
                  </div>
                </div>
                <div class="bg-white mt-2 rounded-xl">
                  <div class="p-5 bg-light-200 rounded-xl text-sm">
                    <span
                      class="bg-blue-50 flex w-8 h-8 items-center justify-center text-white rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                        <path d="M3 9l4 0" />
                      </svg>
                    </span>
                    <p class="mt-2">Order management</p>
                    <div class="flex justify-between mt-2">
                      <span class="bg-emerald-100 text-emerald-500 py-1 text-xs px-3 rounded-full"
                        >Complete</span
                      >
                      <span class="bg-gray-100 text-gray-500 py-1 text-xs px-3 rounded-full"
                        >Pending</span
                      >
                      <span class="bg-violet-100 text-violet-500 py-1 text-xs px-3 rounded-full"
                        >Partialy received</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="bg-white rounded-xl">
                <div class="p-5">
                  <p>Seamless patient management</p>
                  <div class="flex mt-2 gap-3 items-center">
                    <img src="../assets/1.png" class="h-8 w-8" alt="" />
                    <div class="text-xs">
                      <p>Oliver Mtukudzi</p>
                      <p class="text-main-100">Patient</p>
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-3 uppercase text-main-100 font-semibold text-xs mt-5 gap-5"
                  >
                    <span>patient info</span>
                    <span>medical info</span>
                    <span>Appointments</span>
                  </div>
                </div>
              </div>
              <div class="bg-white mt-1 rounded-xl">
                <div class="p-5">
                  <p>Staff & doctor entries</p>
                  <div class="flex mt-2 justify-between items-center">
                    <div class="flex gap-5 items-center">
                      <img src="../assets/2.png" class="h-12 w-12" alt="" />
                      <div class="text-xs">
                        <p>Dr Maya Risley</p>
                        <p class="text-main-100 mt-2 inline-flex gap-2 items-center">
                          Dentist <span class="h-1 w-1 bg-gray-300 rounded-full"></span> 8 years
                        </p>
                      </div>
                    </div>

                    <div class="flex flex-col">
                      <div class="flex gap-2 items-center text-xs text-emerald-500">
                        <span class="h-2 w-2 bg-emerald-500 rounded-full"></span>
                        Available
                      </div>
                      <div class="flex gap-3 mt-2 text-main-100">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-5 w-5"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"
                            />
                          </svg>
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-5 w-5"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 9h8" />
                            <path d="M8 13h6" />
                            <path
                              d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white mt-1 rounded-xl">
                <div class="p-5">
                  <p>Manage appointments</p>
                  <div class="mt-5">
                    <div class="flex flex-col gap-1 text-xs">
                      <label for="">Patient Name</label>
                      <input
                        type="text"
                        class="py-1.5 focus:ring-0 focus:outline-none rounded-md bg-light-200 border-0 text-xs"
                      />
                    </div>
                    <div class="grid mt-5 grid-cols-2 gap-1">
                      <div class="flex flex-col gap-1 text-xs">
                        <label for="">Email</label>
                        <input
                          type="text"
                          class="py-1.5 focus:ring-0 focus:outline-none rounded-md bg-light-200 border-0 text-xs"
                        />
                      </div>
                      <div class="flex flex-col gap-1 text-xs">
                        <label for="">Phone Number</label>
                        <input
                          type="text"
                          class="py-1.5 focus:ring-0 focus:outline-none rounded-md bg-light-200 border-0 text-xs"
                        />
                      </div>
                    </div>
                    <div class="grid mt-5 grid-cols-3 gap-1">
                      <div class="flex flex-col gap-1 text-xs">
                        <label for="">Age</label>
                        <input
                          type="text"
                          class="py-1.5 focus:ring-0 focus:outline-none rounded-md bg-light-200 border-0 text-xs"
                        />
                      </div>
                      <div class="flex flex-col gap-1 text-xs">
                        <label for="">Gender</label>
                        <input
                          type="text"
                          class="py-1.5 focus:ring-0 focus:outline-none rounded-md bg-light-200 border-0 text-xs"
                        />
                      </div>
                      <div class="flex flex-col gap-1 text-xs">
                        <label for="">Residence</label>
                        <input
                          type="text"
                          class="py-1.5 focus:ring-0 focus:outline-none rounded-md bg-light-200 border-0 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
