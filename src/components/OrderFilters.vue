<script setup>
import { ref } from 'vue'
import { Dropdown } from 'flowbite'

import ApiClient from '../services/http.js'
import { inject } from 'vue'

const emitter = inject('emitter')

let vendors = ref([])

const filters = ref({
  vendor: '',
  status: '',
  order_number: ''
})

const applyFilters = () => {
  emitter.emit('setOrderFilters', {
    selectedFilters: filters.value
  })
  closeFilterDropDown()
}

const resetFilters = () => {
  filters.value.vendor = ''
  filters.value.status = ''
  filters.value.order_number = ''

  applyFilters()
}

const getVendors = () => {
  ApiClient()
    .get('vendors')
    .then((res) => {
      vendors.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
}

const toggleDropDown = () => {
  // set the dropdown menu element
  const $targetEl = document.getElementById('orderFilterDropdownMenu')

  // set the element that trigger the dropdown menu on click
  const $triggerEl = document.getElementById('orderFilterDropdownButton')

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

const closeFilterDropDown = () => {
  const $targetEl = document.getElementById('orderFilterDropdownMenu')

  const $triggerEl = document.getElementById('orderFilterDropdownButton')

  if ($targetEl) {
    const dropdown = new Dropdown($targetEl, $triggerEl)

    dropdown.hide()
  }
}
getVendors()
</script>

<template>
  <div>
    <div @click="toggleDropDown" id="orderFilterDropdownButton">
      <button
        class="border px-3 border-[#E6E9EF] text-main-200 py-1 inline-flex gap-2 items-center rounded-md"
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
          <path d="M4 6l7 0" />
          <path d="M4 12l7 0" />
          <path d="M4 18l9 0" />
          <path d="M15 9l3 -3l3 3" />
          <path d="M18 6l0 12" />
        </svg>
        Filters
      </button>
    </div>
    <!-- Dropdown menu -->
    <div
      id="orderFilterDropdownMenu"
      class="z-10 hidden text-main bg-white divide-y divide-gray-100 rounded-xl shadow w-96"
    >
      <div class="p-5">
        <div class="flex text-xl font-semibold justify-between">
          <p>Filters</p>
          <span
            @click="closeFilterDropDown"
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
        <div class="mt-2 flex flex-col gap-5">
          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label for="">Status</label>
              <select
                v-model="filters.status"
                class="py-2 bg-light-200 text-xs rounded-md w-full focus:ring-0 focus:outline-none border-0 text-main-100"
              >
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div class="flex flex-col gap-2 text-sm">
              <label for="">Vendor</label>
              <select
                v-model="filters.vendor"
                class="py-2 border-0 placeholder:text-main-100/50 text-main-200 placeholder:text-xs text-xs focus:outline-none focus:ring-0 rounded-md bg-light-200"
              >
                <option
                  class="text-main-200"
                  v-for="vendor in vendors"
                  :value="vendor.id"
                  :key="vendor.id"
                >
                  {{ vendor.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label for="">Order number</label>
            <input
              v-model="filters.order_number"
              class="py-2 bg-light-200 text-xs rounded-md w-full focus:ring-0 focus:outline-none border-0 text-main-100"
            />
          </div>
        </div>
        <div class="mt-5 flex justify-between items-center">
          <button @click="resetFilters" class="text-blue-50">Reset filters</button>
          <button
            @click="applyFilters"
            class="bg-blue-50 px-4 text-white text-xs py-1.5 rounded-md"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
