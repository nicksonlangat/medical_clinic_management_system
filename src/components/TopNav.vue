<script setup>
import DropDown from '@/components/DropDown.vue'
const props = defineProps(['title'])

const title = props.title
</script>

<template>
  <div class="bg-white border-b border-gray-100 font-base text-main">
    <div class="p-5 flex justify-between items-center">
      <p class="text-2xl font-semibold">{{ title }}</p>
      <!-- <div>
        <input
          type="text"
          class="bg-light-200 py-2 rounded-md border-0 w-96 placeholder:text-main-100 text-sm focus:outline-none focus:ring-0"
          placeholder="Search anything..."
        />
      </div> -->
      <div class="flex gap-5 mr-10">
        <button
          type="button"
          class="relative inline-flex items-center px-2.5 py-2 rounded-full text-sm font-medium text-center text-white bg-light-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-main h-5 w-5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z"
            />
            <path
              d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z"
            />
          </svg>
          <span class="sr-only">Notifications</span>
          <div
            class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2"
          >
            8
          </div>
        </button>
        <button
          type="button"
          class="relative inline-flex items-center px-2.5 py-2 rounded-full text-sm font-medium text-center text-white bg-light-200"
        >
          <svg
            class="w-5 text-main h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path
              d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
            />
            <path
              d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
            />
          </svg>
          <span class="sr-only">Messages</span>
          <div
            class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2"
          >
            2
          </div>
        </button>

        <DropDown />
      </div>
    </div>
  </div>
</template>
