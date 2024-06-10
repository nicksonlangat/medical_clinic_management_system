<script setup>
import { ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { inject } from 'vue'
import ApiClient from '../services/http.js'

const emitter = inject('emitter')

const isOpen = ref(false)

let categories = ref([])

let vendors = ref([])

let uploading = ref(false)
let docArray = ref(null)

let product = ref({
  name: '',
  category: '',
  vendor: '',
  price: '',
  sku: '',
  stock_number: '',
  image_url: ''
})

const onChange = (event) => {
  docArray.value = event.target.files[0]
}

const uploadProduct = () => {
  uploading.value = true
  let data = new FormData()
  data.append('name', product.value.name)
  data.append('category', product.value.category)
  data.append('vendor', product.value.vendor)
  data.append('price', product.value.price)
  data.append('sku', product.value.sku)
  data.append('stock_number', product.value.stock_number)

  if (docArray.value) {
    data.append('image', docArray.value, docArray.value.name)
  }

  ApiClient('multipart/formdata')
    .post('products/', data)
    .then(() => {
      uploading.value = false
      emitter.emit('refreshProducts')
      closeModal()
      showNotification()
    })
    .catch((error) => {
      uploading.value = false
      console.log(error)
    })
}

const getCategories = () => {
  ApiClient()
    .get('categories')
    .then((res) => {
      categories.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
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

const showNotification = () => {
  emitter.emit('showNotification', {
    type: 'success',
    title: 'Product added',
    message: 'The product has been successfully uploaded!'
  })
}

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

emitter.on('newOrder', () => {
  openModal()
})

getCategories()
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
        <div class="flex min-h-full items-center justify-end p-4 text-center">
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
              class="w-full max-w-md transform overflow-hidden text-main font-base rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex text-xl font-semibold justify-between">
                <p>New Product</p>
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
              <div class="mt-10">
                <div class="flex flex-col gap-2 text-sm">
                  <label for="">Name</label>
                  <input
                    type="text"
                    v-model="product.name"
                    placeholder="Product name"
                    class="py-2 text-main-200 border-0 placeholder:text-main-100/50 placeholder:text-sm text-sm focus:outline-none focus:ring-0 rounded-md bg-light-200"
                  />
                </div>
                <div class="flex mt-5 flex-col gap-2 text-sm">
                  <label for="">SKU</label>
                  <input
                    v-model="product.sku"
                    type="text"
                    placeholder="Product sku"
                    class="py-2 text-main-200 border-0 placeholder:text-main-100/50 placeholder:text-sm text-sm focus:outline-none focus:ring-0 rounded-md bg-light-200"
                  />
                </div>
                <div class="flex flex-col mt-5 gap-2 text-sm">
                  <label for="">Category</label>
                  <select
                    v-model="product.category"
                    class="py-2 border-0 placeholder:text-main-100/50 text-main-200 placeholder:text-sm text-sm focus:outline-none focus:ring-0 rounded-md bg-light-200"
                  >
                    <option
                      class="text-main-200"
                      v-for="category in categories"
                      :value="category.id"
                      :key="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div class="flex flex-col mt-5 gap-2 text-sm">
                  <label for="">Vendor</label>
                  <select
                    v-model="product.vendor"
                    class="py-2 border-0 placeholder:text-main-100/50 text-main-200 placeholder:text-sm text-sm focus:outline-none focus:ring-0 rounded-md bg-light-200"
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
                <div class="grid grid-cols-2 gap-2 mt-5">
                  <div class="flex flex-col gap-2 text-sm">
                    <label for="">Price</label>
                    <input
                      type="text"
                      v-model="product.price"
                      placeholder="Product price"
                      class="py-2 border-0 placeholder:text-main-100/50 placeholder:text-sm text-sm focus:outline-none focus:ring-0 rounded-md bg-light-200"
                    />
                  </div>
                  <div class="flex flex-col gap-2 text-sm">
                    <label for="">Stock</label>
                    <input
                      type="text"
                      v-model="product.stock_number"
                      placeholder="Product quantity"
                      class="py-2 border-0 placeholder:text-main-100/50 placeholder:text-sm text-sm focus:outline-none focus:ring-0 rounded-md bg-light-200"
                    />
                  </div>
                </div>
                <div class="flex mt-5 items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer"
                  >
                    <div class="flex flex-col text-main-200 items-center justify-center pt-5 pb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="mt-2 mb-2 h-6 w-6"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                        <path d="M7 9l5 -5l5 5" />
                        <path d="M12 4l0 12" />
                      </svg>
                      <p class="mb-2 text-xs">Product image</p>
                      <p class="text-xs">jpeg, png, jpg</p>
                    </div>
                    <input
                      name="docArray"
                      @change="onChange"
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                    />
                  </label>
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
                  @click="uploadProduct"
                  class="bg-blue-50 inline-flex gap-2 items-center justify-center w-full text-white py-2 rounded-md"
                >
                  <svg
                    v-if="uploading"
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
                  <p v-if="uploading">Saving...</p>

                  <p v-else>Add product</p>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
