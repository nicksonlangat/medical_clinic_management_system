<script setup>
import { ref } from 'vue'
import { Dropdown } from 'flowbite'
import { inject } from 'vue'

const emitter = inject('emitter')

const filters = ref({
  blood_group: '',
  gender: '',
  hiv_status: '',
  is_active: ''
})

const applyFilters = () => {
  emitter.emit('setPatientFilters', {
    selectedFilters: filters.value
  })
  closeFilterDropDown()
}

const resetFilters = () => {
  filters.value.hiv_status = ''
  filters.value.gender = ''
  filters.value.blood_group = ''

  applyFilters()
}

const toggleDropDown = () => {
  // set the dropdown menu element
  const $targetEl = document.getElementById('patientFilterDropdownMenu')

  // set the element that trigger the dropdown menu on click
  const $triggerEl = document.getElementById('patientFilterDropdownButton')

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
  const $targetEl = document.getElementById('patientFilterDropdownMenu')

  const $triggerEl = document.getElementById('patientFilterDropdownButton')

  if ($targetEl) {
    const dropdown = new Dropdown($targetEl, $triggerEl)

    dropdown.hide()
  }
}
</script>

<template>
  <div>
    <div @click="toggleDropDown" id="patientFilterDropdownButton">
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
      id="patientFilterDropdownMenu"
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
              <label for="">Blood Group</label>
              <select
                v-model="filters.blood_group"
                class="py-2 bg-light-200 text-xs rounded-md w-full focus:ring-0 focus:outline-none border-0 text-main-100"
              >
                <option value="AB">AB</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="O">O</option>
              </select>
            </div>

            <div class="flex flex-col gap-2 text-sm">
              <label for="">HIV Status</label>
              <select
                v-model="filters.hiv_status"
                class="py-2 border-0 placeholder:text-main-100/50 text-main-200 placeholder:text-xs text-xs focus:outline-none focus:ring-0 rounded-md bg-light-200"
              >
                <option value="Negative">Negative</option>
                <option value="Positive">Positive</option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-2 text-sm">
            <label for="">Gender</label>
            <select
              v-model="filters.gender"
              class="py-2 border-0 placeholder:text-main-100/50 text-main-200 placeholder:text-xs text-xs focus:outline-none focus:ring-0 rounded-md bg-light-200"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
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
