<script setup>
import { computed, inject, ref } from 'vue'
import InventoryModal from './InventoryModal.vue'
import NewProductModal from './NewProductModal.vue'
import ApiClient from '../services/http.js'
import EditProductModal from './EditProductModal.vue'
import ProductFilters from './ProductFilters.vue'
const emitter = inject('emitter')
let isLoading = ref(false)
let products = ref([])
let product_stats = ref(null)

const filters = ref({
  vendor: '',
  category: '',
  sku: '',
  status: '',
  stock_number: ''
})

const selectedFilters = ref([])

const addFilter = () => {
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value != '') {
      let filter = `${key}: ${value}`
      console.log(filter)
      selectedFilters.value.push(filters.value)
    }
  })
}

const importInventory = () => {
  emitter.emit('importInventory', {})
}

const addProduct = () => {
  emitter.emit('newProduct', {})
}

const products_url = ref('products')

const getProducts = (products_url) => {
  isLoading.value = true
  ApiClient()
    .get(products_url)
    .then((res) => {
      isLoading.value = false
      products.value = res.data
    })
    .catch((error) => {
      console.log(error)
      isLoading.value = false
    })
}

const getProductStats = () => {
  ApiClient()
    .get('products/stats')
    .then((res) => {
      product_stats.value = res.data
      emitter.emit('loadProductStats', product_stats.value)
    })
    .catch((error) => {
      console.log(error)
    })
}

const text = ref('')

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return product.name.toLowerCase().includes(text.value.toLowerCase())
  })
})

const formatPrice = (value) => {
  let val = (value / 1).toFixed(2).replace(',', '.')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const editProduct = (product) => {
  emitter.emit('editProduct', { product: product })
}

// getProducts(products_url.value)
getProductStats()

emitter.on('refreshProducts', () => {
  getProducts(products_url.value)
  getProductStats()
})

emitter.on('setFilters', (data) => {
  filters.value = data.selectedFilters
  let products_url = `products?vendor=${filters.value.vendor}&&category=${filters.value.category}&&status=${filters.value.status}&&sku=${filters.value.sku}&&stock_number=${data.selectedFilters.stock_number}`
  getProducts(products_url)
  addFilter()
})
</script>

<template>
  <div>
    <InventoryModal />
    <NewProductModal />
    <EditProductModal />
    <div class="mt-5 flex justify-between">
      <div class="relative">
        <input
          type="text"
          v-model="text"
          placeholder="Search by sku or name"
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
        <ProductFilters />
        <button
          @click="importInventory"
          class="bg-[#0CA273] border border-[#0D8E66] text-white py-1 inline-flex gap-2 items-center rounded-md px-3"
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
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
            <path d="M8 11h8v7h-8z" />
            <path d="M8 15h8" />
            <path d="M11 11v7" />
          </svg>
          Import products
        </button>

        <button
          @click="addProduct"
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
          New Product
        </button>
      </div>
    </div>

    <div
      v-if="!isLoading && products.length == 0"
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
      <p>No products found.</p>
      <p class="text-main-100 text-sm mt-1">Please upload some products to view them here.</p>
      <button
        @click="addProduct"
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
        New Product
      </button>
    </div>

    <div v-if="!isLoading && products.length" class="mt-5 overflow-x-auto rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right">
        <thead class="text-xs uppercase bg-light-200 text-main-100">
          <tr>
            <th scope="col" class="px-6 py-3">medicine</th>
            <th scope="col" class="px-6 py-3">sku</th>
            <th scope="col" class="px-6 py-3">status</th>
            <th scope="col" class="px-6 py-3">stock</th>
            <th scope="col" class="px-6 py-3">price</th>
            <th scope="col" class="px-6 py-3">stock value</th>
            <th scope="col" class="px-6 py-3">vendor</th>
            <!-- <th scope="col" class="px-6 py-3"></th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            @click="editProduct(product)"
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white border-b border-gray-100 text-sm hover:bg-light-200 transition-all duration-500 cursor-pointer"
          >
            <th scope="row" class="px-6 py-4">
              <div class="flex gap-2 items-center">
                <img
                  v-if="product.image"
                  class="h-8 w-8 rounded-full object-cover"
                  :src="product.image"
                  alt=""
                />
                <img
                  v-else
                  class="h-8 w-8 rounded-full object-cover"
                  :src="product.image_url"
                  alt=""
                />

                <p class="truncate text-xs">
                  {{ product.name }} <br /><span class="text-main-100 text-xs font-normal">
                    {{ product.category.name }}</span
                  >
                </p>
              </div>
            </th>
            <td class="px-6 py-4 text-xs">{{ product.sku }}</td>

            <td class="px-6 py-4">
              <span
                v-if="product.stock_status == 'In stock'"
                class="bg-cyan-50 text-cyan-500 py-1 text-xs px-3 rounded-full"
                >{{ product.stock_status }}</span
              >
              <span
                v-if="product.stock_status == 'Low stock'"
                class="bg-yellow-50 text-yellow-500 py-1 text-xs px-3 rounded-full"
                >{{ product.stock_status }}</span
              >
              <span
                v-if="product.stock_status == 'Out of stock'"
                class="bg-red-50 text-red-500 py-1 text-xs px-3 rounded-full"
                >{{ product.stock_status }}</span
              >
            </td>
            <td class="px-6 py-4 text-xs">{{ product.stock_number }}</td>
            <td class="px-6 py-4 text-xs">{{ product.price }}</td>
            <td class="px-6 py-4 text-xs">
              {{ formatPrice(product.price * product.stock_number) }}
            </td>
            <td class="px-6 py-4 text-xs">{{ product.vendor.name }}</td>
            <!-- <td class="px-6 py-4">
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
            </td> -->
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
      Fetching inventory
    </div>
  </div>
</template>
