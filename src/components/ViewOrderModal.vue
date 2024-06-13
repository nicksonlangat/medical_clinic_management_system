<script setup>
import { computed, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'

const emitter = inject('emitter')

const isOpen = ref(false)

let vendors = ref([])

let updating = ref(false)

let order = ref({
  vendor: '',
  notes: ''
})

const text = ref('')
const notes = ref('')

let products = ref([])

const uniqueNames = ref(new Set())
let productNotFound = ref(false)

const getProducts = () => {
  ApiClient()
    .get(`products?name=${text.value}`)
    .then((res) => {
      if (res.data.length) {
        // Filter out duplicates while pushing new products
        res.data.forEach((product) => {
          if (!uniqueNames.value.has(product.name)) {
            uniqueNames.value.add(product.name)
            product['quantity'] = 1
            products.value.push({ product: product, is_new: true, quantity: 1 })
          }
        })
      } else {
        productNotFound.value = true
        setTimeout(() => (productNotFound.value = false), 2000)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const filteredProducts = computed(() => {
  return products.value
  // return products.value.filter((product) => product.quantity != 0)
})

const removeProduct = (object) => {
  object.product.quantity = 0

  products.value = products.value.filter((product) => product.product.name !== object.product.name)
  uniqueNames.value.delete(object.product.name)

  if (!object.is_new) {
    deleteOrderItem(object)
  }
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

const formatPrice = (value) => {
  let val = (value / 1).toFixed(2).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const selectedVendor = computed(() => {
  let vendor = ''
  if (order.value.vendor != '') {
    vendor = vendors.value.find((object) => object.id == order.value.vendor)
  }
  return vendor
})

const updateOrder = () => {
  updating.value = true
  ApiClient()
    .put(`orders/${order.value.id}/`, {
      order_items: products.value,
      vendor: order.value.vendor,
      notes: notes.value
    })
    .then(() => {
      updating.value = false
      closeModal()
      showNotification()
    })
    .catch((error) => {
      console.log(error)
    })
}

const updateOrderItem = (order_item) => {
  ApiClient()
    .patch(`orderitems/${order_item.id}/`, {
      status: 'Received'
    })
    .then((res) => {
      order_item.status = res.data.status
    })
    .catch((error) => {
      console.log(error)
    })
}

const deleteOrderItem = (order_item) => {
  ApiClient()
    .delete(`orderitems/${order_item.id}/`)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}

const showNotification = () => {
  emitter.emit('showNotification', {
    type: 'success',
    title: 'Order updated',
    message: 'Your order has been successfully updated!'
  })
}

function closeModal() {
  isOpen.value = false
  emitter.emit('refreshOrders', {})
}
function openModal() {
  isOpen.value = true
}

emitter.on('viewOrder', (data) => {
  products.value = data.order.products
  notes.value = data.order.notes
  order.value = data.order
  order.value.vendor = data.order.vendor.id
  openModal()
})

getVendors()
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex h-full items-center justify-end p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full h-full max-w-2xl transform overflow-hidden text-main font-base rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex text-xl font-semibold justify-between">
                <p>Order {{ order.order_number }}</p>

                <span
                  @click="closeModal"
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
              <div class="mt-5">
                <div class="bg-light-200 rounded-md">
                  <div class="p-5 flex divide-x">
                    <div class="flex w-1/3 pr-5 flex-col gap-2 text-xs">
                      <label for="">Vendor</label>
                      <select
                        v-model="order.vendor"
                        class="py-2 border-0 placeholder:text-main-100/50 text-main-200 placeholder:text-xs text-xs focus:outline-none focus:ring-0 rounded-md bg-light-300"
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
                    <div class="w-1/2 text-xs pl-5">
                      <p>Address</p>
                      <div class="flex flex-col gap-3 mt-2 text-xs text-main-100">
                        <div class="flex gap-2 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-4 w-4"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z"
                            />
                          </svg>
                          {{ selectedVendor?.location }}
                        </div>
                      </div>
                    </div>
                    <div class="w-1/2 text-xs pl-5">
                      <p>Contact</p>
                      <div class="flex flex-col gap-3 mt-2 text-xs text-main-100">
                        <div class="flex gap-2 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-4 w-4"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z"
                            />
                          </svg>
                          {{ selectedVendor?.phone_number }}
                        </div>
                        <div class="flex gap-2 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="h-4 w-4"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z"
                            />
                            <path
                              d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
                            />
                          </svg>

                          {{ selectedVendor?.email }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 text-main bg-light-200 rounded-md">
                  <div class="p-5">
                    <div class="flex justify-between items-center">
                      <p class="font-semibold text-xl">Add products</p>
                      <p v-if="productNotFound" class="text-xs text-red-500">Product not found.</p>
                    </div>

                    <div class="mt-3">
                      <input
                        type="text"
                        v-model="text"
                        v-on:keyup.enter="getProducts"
                        placeholder="Type product name"
                        class="bg-light-300 placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      />
                    </div>

                    <div class="mt-5 overflow-x-auto rounded-lg">
                      <table class="w-full text-sm text-left rtl:text-right">
                        <thead class="text-xs uppercase bg-light-300 text-main-100">
                          <tr>
                            <th scope="col" class="px-2 py-3">product name</th>

                            <th scope="col" class="px-2 py-3">quantity</th>
                            <th scope="col" class="px-2 py-3">total</th>
                            <th scope="col" class="px-2 py-3"></th>
                            <th scope="col" class="px-2 py-3"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="product in filteredProducts"
                            :key="product.id"
                            class="bg-white border-b border-gray-100 text-sm hover:bg-light-200 transition-all duration-500"
                          >
                            <th scope="row" class="px-3 py-4">
                              <div class="flex gap-2 items-center">
                                <img
                                  v-if="product.product.image"
                                  class="h-8 w-8 rounded-full object-cover"
                                  :src="product.product.image"
                                  alt=""
                                />
                                <img
                                  v-else
                                  class="h-8 w-8 rounded-full object-cover"
                                  :src="product.product.image_url"
                                  alt=""
                                />

                                <p class="truncate text-xs">
                                  {{ product.product.name }} <br /><span
                                    class="text-main-100 text-xs font-normal"
                                  >
                                    {{ product.product.category.name }} -
                                    {{ product.product.sku }}</span
                                  >
                                </p>
                              </div>
                            </th>

                            <td class="px-2 text-xs">
                              <input
                                class="text-xs rounded-md w-12 text-center focus:outline-none focus:ring-0 border-0 bg-light-200"
                                type="text"
                                v-model="product.quantity"
                              />
                            </td>
                            <td class="px-2 py-4 text-xs">
                              {{ formatPrice(product.quantity * product.product.price) }}
                            </td>
                            <td class="px-2 py-4 text-xs">
                              <button
                                v-if="!product.is_new && product.status != 'Received'"
                                @click="updateOrderItem(product)"
                                class="text-xs font-extralight py-0.5 px-2 rounded-md bg-blue-50 text-white"
                              >
                                Receive
                              </button>
                              <button
                                v-if="!product.is_new && product.status == 'Received'"
                                class="text-xs font-extralight py-0.5 px-2 rounded-md bg-emerald-500 text-white"
                              >
                                Received
                              </button>
                              <button v-else></button>
                            </td>
                            <td class="px-2 py-4 text-xs">
                              <span class="cursor-pointer" @click="removeProduct(product)">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  class="h-4 w-4 text-main-100"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                  <path
                                    d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
                                  />
                                  <path
                                    d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
                                  /></svg
                              ></span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="mt-3">
                      <textarea
                        type="text"
                        v-model="notes"
                        rows="4"
                        placeholder="Any additional notes"
                        class="bg-light-300 resize-none placeholder:text-main-100 focus:ring-0 focus:outline-none py-2 text-sm border-0 rounded-md w-full"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-5 flex justify-between gap-5 text-sm">
                <button
                  @click="closeModal"
                  class="bg-light-300 inline-flex gap-2 items-center justify-center text-main w-full py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  @click="updateOrder"
                  class="bg-blue-50 inline-flex gap-2 disabled:opacity-40 items-center justify-center w-full text-white py-2 rounded-md"
                >
                  <svg
                    v-if="updating"
                    class="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p v-if="updating">Updating...</p>

                  <p v-else>Update order</p>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
