<script setup>
import { TransitionRoot } from '@headlessui/vue'
import { ref } from 'vue'
import { inject } from 'vue'

const emitter = inject('emitter')

const isOpen = ref(false)
const type = ref('')
const message = ref('')
const title = ref('')

function openModal() {
  isOpen.value = true
}

emitter.on('showNotification', (data) => {
  ;(type.value = data.type), (message.value = data.message), (title.value = data.title)
  openModal()
  setTimeout(() => (isOpen.value = false), 2000)
})
</script>

<template>
  <TransitionRoot
    :show="isOpen"
    enter="transform transition ease-in-out duration-1000"
    enterFrom="translate-x-full"
    enterTo="translate-x-0"
    leave="transition ease-in-out duration-1000 transform"
    leave-from="translate-x-0"
    leave-to="translate-x-50"
    class="flex absolute font-base items-center w-80 p-2 right-5 top-16 mt-8 bg-white text-main border rounded-lg shadow"
    role="alert"
  >
    <div class="flex gap-3 text-sm">
      <svg
        v-if="type == 'success'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-6 text-emerald-500 h-6"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
        />
      </svg>

      <svg
        v-if="type == 'error'"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 text-red-500 h-6"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z"
        />
      </svg>

      <svg
        v-if="type == 'warning'"
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 text-amber-500 h-6"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z"
        />
      </svg>

      <div class="flex flex-col gap-1">
        <p class="">{{ title }}</p>
        <p class="text-xs text-main-100">{{ message }}</p>
      </div>
    </div>
  </TransitionRoot>
</template>
