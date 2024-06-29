<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

import { inject } from 'vue'

const emitter = inject('emitter')

let page = ref('')

let clinics = ref([])

emitter.on('setCurrentUser', (data) => {
  clinics.value = data.clinics
})

const goToPage = (page) => {
  router.push({ name: page })
}

page.value = route.name
</script>

<template>
  <div class="bg-light-200 border-gray-100 border-r font-base text-main w-64">
    <div class="p-5">
      <span class="text-3xl inline-flex gap-1 items-center font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="h-10 w-10"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -20 0l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72m2 5a1 1 0 0 0 -1 1v2.999h-2v-2.999a1 1 0 0 0 -.883 -.993l-.117 -.007a1 1 0 0 0 -1 1v8a1 1 0 0 0 2 0v-3.001h2v3.001a1 1 0 0 0 .883 .993l.117 .007a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1"
          />
        </svg>
        ClinicSync</span
      >

      <div class="border bg-light-300 border-[#f0f1f3] text-main-200 rounded-md mt-5">
        <div class="p-2 flex gap-2 text-sm items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-building-hospital"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 21l18 0" />
            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
            <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
            <path d="M10 9l4 0" />
            <path d="M12 7l0 4" />
          </svg>
          <div>
            <p>{{ clinics[0]?.name }}</p>
            <p class="text-xs mt-1">{{ clinics[0]?.location }}</p>
          </div>
        </div>
      </div>

      <ul class="mt-10 flex text-[#6c777d] flex-col gap-3 cursor-pointer text-sm">
        <li
          @click="goToPage('home')"
          :class="page == 'home' ? 'bg-blue-10 text-blue-40' : ''"
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
            <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
            <path
              d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"
            />
            <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
          </svg>
          Dashboard
        </li>
      </ul>
      <p class="uppercase pl-4 text-xs text-main-100 font-semibold mt-5">clinic</p>
      <ul class="mt-2 flex text-main-200 flex-col gap-1 cursor-pointer text-sm">
        <li
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M15 3v4" />
            <path d="M7 3v4" />
            <path d="M3 11h16" />
            <path d="M18 16.496v1.504l1 1" />
          </svg>
          Appointments
        </li>
        <li
          @click="goToPage('patients')"
          :class="page == 'patients' ? 'bg-blue-10 text-blue-40' : ''"
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
          Patients
        </li>

        <li
          @click="goToPage('staff')"
          :class="page == 'staff' ? 'bg-blue-10 text-blue-40' : ''"
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path d="M6 4h-1a2 2 0 0 0 -2 2v3.5h0a5.5 5.5 0 0 0 11 0v-3.5a2 2 0 0 0 -2 -2h-1" />
            <path d="M8 15a6 6 0 1 0 12 0v-3" />
            <path d="M11 3v2" />
            <path d="M6 3v2" />
            <path d="M20 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          </svg>
          Staff
        </li>
        <li
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path
              d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
            />
            <path
              d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
            />
            <path d="M10 14l4 0" />
            <path d="M12 12l0 4" />
          </svg>
          Reports
        </li>
      </ul>
      <p class="uppercase pl-4 text-xs text-main-100 font-semibold mt-5">finance</p>
      <ul class="mt-2 flex flex-col text-main-200 gap-1 cursor-pointer text-sm">
        <li
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path
              d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
            />
            <path
              d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"
            />
            <path d="M8 14l0 .01" />
            <path d="M12 14l0 .01" />
            <path d="M16 14l0 .01" />
            <path d="M8 17l0 .01" />
            <path d="M12 17l0 .01" />
            <path d="M16 17l0 .01" />
          </svg>
          Accounts
        </li>
        <li
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path d="M9 15l6 -6" />
            <circle cx="9.5" cy="9.5" r=".5" fill="currentColor" />
            <circle cx="14.5" cy="14.5" r=".5" fill="currentColor" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          </svg>
          Sales
        </li>
        <li
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <path d="M9 7l1 0" />
            <path d="M9 13l6 0" />
            <path d="M13 17l2 0" />
          </svg>
          Purchases
        </li>
      </ul>
      <p class="uppercase pl-4 text-xs text-main-100 font-semibold mt-5">assets</p>
      <ul class="mt-2 flex text-main-200 flex-col gap-1 cursor-pointer text-sm">
        <li
          @click="goToPage('stock')"
          :class="page == 'stock' ? 'bg-blue-10 text-blue-40' : ''"
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path
              d="M9 3m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
            />
            <path
              d="M10 6v.98c0 .877 -.634 1.626 -1.5 1.77c-.866 .144 -1.5 .893 -1.5 1.77v8.48a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-8.48c0 -.877 -.634 -1.626 -1.5 -1.77a1.795 1.795 0 0 1 -1.5 -1.77v-.98"
            />
            <path d="M7 12h10" />
            <path d="M7 18h10" />
            <path d="M11 15h2" />
          </svg>
          Stock
        </li>
        <li
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-emergency-bed"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M8 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            <path d="M4 8l2.1 2.8a3 3 0 0 0 2.4 1.2h11.5" />
            <path d="M10 6h4" />
            <path d="M12 4v4" />
            <path d="M12 12v2l-2.5 2.5" />
            <path d="M14.5 16.5l-2.5 -2.5" />
          </svg>
          Peripherals
        </li>
      </ul>
      <p class="uppercase pl-4 text-xs text-main-100 font-semibold mt-5">other</p>
      <ul class="mt-2 flex flex-col text-main-200 gap-1 cursor-pointer text-sm">
        <li
          class="py-2 flex hover:bg-blue-10 hover:text-blue-40 transition-all duration-500 ease-in-out gap-2 items-center pl-4 rounded-md"
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
            <path d="M4 14v-3a8 8 0 1 1 16 0v3" />
            <path d="M18 19c0 1.657 -2.686 3 -6 3" />
            <path
              d="M4 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z"
            />
            <path
              d="M15 14a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2v-3z"
            />
          </svg>
          Support
        </li>
      </ul>
    </div>
  </div>
</template>
