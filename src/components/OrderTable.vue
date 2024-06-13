<script setup>
import { computed, ref } from 'vue'
import NewOrderModal from './NewOrderModal.vue'
import ViewOrderModal from './ViewOrderModal.vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'
import moment from 'moment'

const orders = ref([])
const emitter = inject('emitter')
const text = ref('')
let isLoading = ref(false)

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    return order.order_number.toLowerCase().includes(text.value.toLowerCase())
  })
})

const formatDate = (value) => {
  return moment(value).format('ll')
}

const getOrders = () => {
  isLoading.value = true
  ApiClient()
    .get('orders')
    .then((res) => {
      orders.value = res.data
      isLoading.value = false
    })
    .catch((error) => {
      console.log(error)
      isLoading.value = false
    })
}

const openNewOrder = () => {
  emitter.emit('newOrder')
}

const viewOrderDetal = (order) => {
  emitter.emit('viewOrder', { order: order })
}

getOrders()

emitter.on('refreshOrders', () => {
  getOrders()
})
</script>
<template>
  <div>
    <NewOrderModal />
    <ViewOrderModal />
    <div class="mt-5 flex justify-between">
      <div class="relative">
        <input
          type="text"
          v-model="text"
          placeholder="Search by order number"
          class="bg-light-200 focus:ring-0 focus:outline-none py-2 text-sm w-96 border-0 rounded-md placeholder:text-main-100 pl-8"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute h-4 w-4 top-2.5 left-3"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      </div>
      <div class="flex gap-5 items-center text-sm">
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
        <button
          @click="openNewOrder"
          class="bg-blue-50 text-white py-1 inline-flex gap-2 items-center rounded-md px-3"
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
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
          New Order
        </button>
      </div>
    </div>

    <div
      v-if="!isLoading && orders.length == 0"
      class="mt-5 flex flex-col items-center justify-center"
    >
      <svg
        width="250"
        height="200"
        viewBox="0 0 250 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="250" height="200" fill="white" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M207 65C210.866 65 214 68.134 214 72C214 75.866 210.866 79 207 79H167C170.866 79 174 82.134 174 86C174 89.866 170.866 93 167 93H189C192.866 93 196 96.134 196 100C196 103.866 192.866 107 189 107H178.826C173.952 107 170 110.134 170 114C170 116.577 172 118.911 176 121C179.866 121 183 124.134 183 128C183 131.866 179.866 135 176 135H93C89.134 135 86 131.866 86 128C86 124.134 89.134 121 93 121H54C50.134 121 47 117.866 47 114C47 110.134 50.134 107 54 107H94C97.866 107 101 103.866 101 100C101 96.134 97.866 93 94 93H69C65.134 93 62 89.866 62 86C62 82.134 65.134 79 69 79H109C105.134 79 102 75.866 102 72C102 68.134 105.134 65 109 65H207ZM207 93C210.866 93 214 96.134 214 100C214 103.866 210.866 107 207 107C203.134 107 200 103.866 200 100C200 96.134 203.134 93 207 93Z"
          fill="#F4F6F9"
        />
        <path
          d="M120.5 133C139.002 133 154 118.002 154 99.5C154 80.9985 139.002 66 120.5 66C101.998 66 87 80.9985 87 99.5C87 118.002 101.998 133 120.5 133Z"
          fill="#F4F6F9"
          stroke="#8F98AC"
          stroke-width="2.5"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M115.132 125.494C116.891 125.819 118.68 125.987 120.5 126C135.136 126 147 114.136 147 99.5C147 84.8645 135.136 73 120.5 73C116.74 73 113.164 73.7829 109.924 75.1946C104.294 77.6479 99.6816 81.9999 96.896 87.4419C95.0445 91.0589 94 95.1575 94 99.5C94 103.44 94.8599 107.179 96.4021 110.54C97.5032 112.94 98.9521 115.146 100.684 117.096"
          fill="white"
        />
        <path
          d="M115.132 125.494C116.891 125.819 118.68 125.987 120.5 126C135.136 126 147 114.136 147 99.5C147 84.8645 135.136 73 120.5 73C116.74 73 113.164 73.7829 109.924 75.1946C104.294 77.6479 99.6816 81.9999 96.896 87.4419C95.0445 91.0589 94 95.1575 94 99.5C94 103.44 94.8599 107.179 96.4021 110.54C97.5032 112.94 98.9521 115.146 100.684 117.096"
          stroke="#8F98AC"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M103.797 120.075C105.946 121.821 108.372 123.237 111.001 124.247"
          stroke="#8F98AC"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path d="M148 126L154 132" stroke="#8F98AC" stroke-width="2.5" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M153.03 131.03C151.138 132.923 151.138 135.992 153.03 137.884L164.116 148.97C166.008 150.862 169.077 150.862 170.97 148.97C172.862 147.077 172.862 144.008 170.97 142.116L159.884 131.03C157.992 129.138 154.923 129.138 153.03 131.03Z"
          fill="#F4F6F9"
          stroke="#8F98AC"
          stroke-width="2.5"
        />
        <path d="M158 133L169 144" stroke="white" stroke-width="2.5" stroke-linecap="round" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M114 88C114 99.598 123.402 109 135 109C137.278 109 139.472 108.637 141.526 107.966C138.173 116.287 130.023 122.161 120.5 122.161C107.985 122.161 97.8394 112.015 97.8394 99.5C97.8394 88.1596 106.17 78.7648 117.045 77.1011C115.113 80.2793 114 84.0097 114 88Z"
          fill="#F4F6F9"
        />
        <path
          d="M121 81C119.727 81 118.482 81.1253 117.279 81.3642M113.645 82.4761C106.804 85.3508 102 92.1144 102 100"
          stroke="#8F98AC"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <path
          d="M174.176 99.7773H166M180.5 92H163.324H180.5ZM187.5 92H185.279H187.5Z"
          stroke="#8F98AC"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M84.1758 121.777H76M79.5 113H62.3242H79.5ZM56.5 113H52.2788H56.5Z"
          stroke="#8F98AC"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p>No orders found.</p>
      <p class="text-main-100 text-sm mt-1">Please place some orders to view them here.</p>
      <button
        @click="openNewOrder"
        class="bg-blue-50 mt-2 text-white py-1 inline-flex gap-2 items-center rounded-md px-3"
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
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        New Order
      </button>
    </div>

    <div v-if="!isLoading && orders.length" class="mt-5 overflow-x-auto rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs uppercase bg-light-200 text-main-100">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-inherit border-gray-200 rounded focus:ring-0"
                />
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">order</th>
            <th scope="col" class="px-6 py-3">created</th>
            <th scope="col" class="px-6 py-3">vendor</th>
            <th scope="col" class="px-6 py-3">status</th>
            <th scope="col" class="px-6 py-3">items received</th>
            <th scope="col" class="px-6 py-3">email sent</th>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in filteredOrders"
            :key="order.id"
            class="bg-white border-b border-gray-100 text-sm hover:bg-light-200 transition-all duration-500 cursor-pointer"
          >
            <td class="w-4 p-4">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-inherit border-gray-200 rounded focus:ring-0"
                />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="px-6 py-4">
              <p>#{{ order.order_number }}</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                {{ order.all_products }} items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH {{ order.order_totals }}</span>
              </p>
            </th>
            <td class="px-6 py-4">{{ formatDate(order.created_at) }}</td>
            <td class="px-6 py-4">{{ order.vendor.name }}</td>
            <td class="px-6 py-4">
              <span
                v-if="order.status == 'Pending'"
                class="bg-gray-200 text-gray-400 py-1 text-xs px-3 rounded-full"
                >{{ order.status }}</span
              >
              <span
                v-if="order.status == 'Complete'"
                class="bg-emerald-100 text-emerald-500 py-1 text-xs px-3 rounded-full"
                >{{ order.status }}</span
              >
              <span
                v-if="order.status == 'Cancelled'"
                class="bg-red-50 text-red-500 py-1 text-xs px-3 rounded-full"
                >{{ order.status }}</span
              >
              <!-- <span class="bg-violet-200 text-violet-500 py-1 text-xs px-3 rounded-full"
                >Partially received</span
              > -->
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    :style="{ width: order.reception_percentage }"
                  ></div>
                </div>
                <p>{{ order.received_products }}/{{ order.all_products }}</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                v-if="order.email_sent"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500 h-5 w-5"
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
                fill="currentColor"
                class="h-5 w-5 text-red-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button
                @click="viewOrderDetal(order)"
                class="bg-blue-50 py-1 px-2 rounded text-xs text-white"
              >
                View
              </button>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-main-100 h-5 w-5 cursor-pointer"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="isLoading"
      class="mt-10 flex flex-col items-center justify-center text-main-100 text-lg"
    >
      <svg
        aria-hidden="true"
        class="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
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
      Fetching orders
    </div>
  </div>
</template>
