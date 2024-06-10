<script setup>
import { ref } from 'vue'
import { Dropdown } from 'flowbite'
import ApiClient from '../services/http.js'
const baseURL = import.meta.env.VITE_BASE_URL
let user = ref(null)
let plan = ref(null)
import { useRouter } from 'vue-router'
const router = useRouter()
import { inject } from 'vue'

const emitter = inject('emitter')

const logoutUser = () => {
  localStorage.removeItem('clinicsyncAuthenticated')
  router.push({
    name: 'login'
  })
}

const goToAccount = () => {
  router.push({
    name: 'account'
  })
}

const getUser = () => {
  ApiClient()
    .get('me')
    .then((res) => {
      user.value = res.data.user
      plan.value = res.data.plan
      emitter.emit('setCurrentUser', { user: user.value, clinics: res.data.clinics })
    })
}

const toggleDropDown = () => {
  // set the dropdown menu element
  const $targetEl = document.getElementById('dropdownMenu')

  // set the element that trigger the dropdown menu on click
  const $triggerEl = document.getElementById('dropdownButton')

  // options with default values
  const options = {
    placement: 'bottom',
    offsetSkidding: 0,
    offsetDistance: 10,
    onHide: () => {
      console.log('dropdown has been hidden')
    },
    onShow: () => {
      console.log('dropdown has been shown')
    }
  }

  if ($targetEl) {
    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     */
    const dropdown = new Dropdown($targetEl, $triggerEl, options)

    // show the dropdown
    dropdown.show()
  }
}

getUser()
</script>

<template>
  <div>
    <div @click="toggleDropDown" id="dropdownButton" class="flex cursor-pointer gap-3 items-center">
      <img
        v-if="user?.image"
        class="w-10 h-10 rounded-full"
        :src="baseURL.replace(/\/$/, '') + user?.image"
        alt=""
      />
      <span
        v-else
        class="h-10 w-10 bg-light-200 flex items-center text-xs justify-center rounded-full"
      >
        {{ user?.first_name[0] }} {{ user?.last_name[0] }}
      </span>
      <div>
        <p class="text-sm">{{ user?.full_name }}</p>
        <p class="text-xs text-main-200 mt-0.5">{{ plan?.plan }}</p>
      </div>
    </div>
    <!-- Dropdown menu -->
    <div
      id="dropdownMenu"
      class="z-10 hidden text-main-200 bg-white divide-y divide-gray-100 rounded-xl shadow w-44 dark:bg-secondary dark:border-dark"
    >
      <ul class="p-1.5 text-sm text-light-secondary" aria-labelledby="dropdownButton">
        <li
          @click="goToAccount"
          class="px-4 py-2 hover:bg-light-200 hover:text-main rounded-md transition-all duration-500 ease-in-out flex gap-2 items-center cursor-pointer"
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
              d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
            />
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg
          >Settings
        </li>

        <li
          @click="logoutUser"
          class="px-4 py-2 hover:bg-light-200 hover:text-main rounded-md transition-all duration-500 ease-in-out flex gap-2 items-center cursor-pointer"
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
              d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
            />
            <path d="M9 12h12l-3 -3" />
            <path d="M18 15l3 -3" />
          </svg>
          Log out
        </li>
      </ul>
    </div>
  </div>
</template>
