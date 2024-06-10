<script setup>
import { ref } from 'vue'
import AuthClient from '../services/auth.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const user = ref({
  email: '',
  password: ''
})

const passwordError = ref(false)
const emailError = ref(false)
const logging = ref(false)

const loginUser = () => {
  logging.value = true
  AuthClient()
    .post('login', { email: user.value.email, password: user.value.password })
    .then((res) => {
      localStorage.setItem('clinicsync', JSON.stringify(res.data.access))
      localStorage.setItem('clinicsyncAuthenticated', true)
      logging.value = false
      router.push({ name: 'home' })
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
</script>

<template>
  <main class="text-main font-base bg-light-200 h-screen">
    <div class="flex h-full">
      <div class="w-1/2 h-full bg-white">
        <div class="p-10 flex flex-col items-center h-full justify-center">
          <div class="mt-5 w-full max-w-md">
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
          </div>

          <div class="w-full mt-5 max-w-md">
            <p class="text-3xl font-bold">Log in to your account</p>
            <div class="mt-3 text-main-100 text-sm">Welcome back, log in to your account.</div>

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
            <div class="flex justify-end mt-4 items-center">
              <a href="/forgot" class="text-blue-50 text-sm">Forgot password?</a>
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
