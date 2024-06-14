<template>
  <div class="text-right">
    <Menu as="div" class="inline-block text-left">
      <div>
        <MenuButton class="flex gap-2 text-xs text-white bg-blue-50 py-1 rounded-md px-4">
          View order
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 mr-5 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="showOrderDetails"
                :class="[
                  active ? 'bg-light-200 text-main' : 'text-main-200',
                  'group flex w-full items-center transition-all duration-500 ease-in-out rounded-md px-2 py-2 text-sm'
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-blue-50 mr-2 h-5 w-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path
                    d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
                  />
                </svg>
                View order
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="resendEmail"
                :class="[
                  active ? 'bg-light-200 text-main' : 'text-main-200',
                  'group flex w-full items-center transition-all duration-500 ease-in-out rounded-md px-2 py-2 text-sm'
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 h-5 w-5 text-blue-50"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"
                  />
                  <path d="M3 7l9 6l9 -6" />
                </svg>
                Resend email
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="changeStatus('Complete')"
                :class="[
                  active ? 'bg-light-200 text-main' : 'text-main-200',
                  'group flex w-full items-center transition-all duration-500 ease-in-out rounded-md px-2 py-2 text-sm'
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 h-5 w-5 text-emerald-500"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                Mark complete
              </button>
            </MenuItem>
          </div>
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="changeStatus('Pending')"
                :class="[
                  active ? 'bg-light-200 text-main' : 'text-main-200',
                  'group flex w-full transition-all duration-500 ease-in-out items-center rounded-md px-2 py-2 text-sm'
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 h-5 w-5 text-gray-500"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                </svg>
                Mark pending
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="changeStatus('Cancelled')"
                :class="[
                  active ? 'bg-light-200 text-main' : 'text-main-200',
                  'group flex w-full items-center transition-all duration-500 ease-in-out rounded-md px-2 py-2 text-sm'
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 h-5 w-5 text-red-500"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M10 8l4 8" />
                  <path d="M10 16l4 -8" />
                </svg>
                Mark cancelled
              </button>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="deleteOrder"
                :class="[
                  active ? 'bg-light-200 text-main' : 'text-main-200',
                  'group flex w-full transition-all duration-500 ease-in-out items-center rounded-md px-2 py-2 text-sm'
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 h-5 w-5 text-red-500"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
                Delete order
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'
const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emitter = inject('emitter')

const showOrderDetails = () => {
  emitter.emit('showOrder', { order: props.order })
}

const changeStatus = (status) => {
  ApiClient()
    .post(`/change/status`, { status: status, order_id: props.order.id })
    .then(() => {
      emitter.emit('refreshOrders', {})
      showNotification('Your order has been successfully updated!')
    })
}

const resendEmail = () => {
  ApiClient()
    .post(`/send/email`, { order_id: props.order.id })
    .then(() => {
      emitter.emit('refreshOrders', {})
      showNotification('Your order has been successfully updated!')
    })
}

const deleteOrder = () => {
  ApiClient()
    .delete(`orders/${props.order.id}/`)
    .then(() => {
      emitter.emit('refreshOrders', {})
      showNotification('Your order has been successfully deleted!')
    })
}

const showNotification = (message) => {
  emitter.emit('showNotification', {
    type: 'success',
    title: 'Order updated',
    message: message
  })
}
</script>
