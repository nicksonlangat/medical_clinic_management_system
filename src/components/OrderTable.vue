<template>
  <div>
    <div class="mt-5 flex justify-between">
      <div class="relative">
        <input
          type="text"
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
        <button class="bg-blue-50 text-white py-1 inline-flex gap-2 items-center rounded-md px-3">
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

    <div class="mt-5 overflow-x-auto rounded-lg">
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
            <th scope="col" class="px-6 py-3">send email</th>
            <th scope="col" class="px-6 py-3"></th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                10 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 50,000</span>
              </p>
            </th>
            <td class="px-6 py-4">June 01, 2024</td>
            <td class="px-6 py-4">Maya Pharmacy</td>
            <td class="px-6 py-4">
              <span class="bg-gray-200 text-gray-400 py-1 text-xs px-3 rounded-full">Pending</span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 0%"
                  ></div>
                </div>
                <p>0/10</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button class="bg-blue-50 py-1 px-2 rounded text-xs text-white">Receive</button>
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
          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                5 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 10,000</span>
              </p>
            </th>
            <td class="px-6 py-4">May 31, 2024</td>
            <td class="px-6 py-4">Acme LLC</td>
            <td class="px-6 py-4">
              <span class="bg-emerald-100 text-emerald-500 py-1 text-xs px-3 rounded-full"
                >Complete</span
              >
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 100%"
                  ></div>
                </div>
                <p>5/5</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button disabled class="bg-light-200 py-1 px-2 rounded text-xs text-main-200">
                Received
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
          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                10 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 50,000</span>
              </p>
            </th>
            <td class="px-6 py-4">June 02, 2024</td>
            <td class="px-6 py-4">Sage Pharmacy</td>
            <td class="px-6 py-4">
              <span class="bg-violet-200 text-violet-500 py-1 text-xs px-3 rounded-full"
                >Partially received</span
              >
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 60%"
                  ></div>
                </div>
                <p>6/10</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button class="bg-blue-50 py-1 px-2 rounded text-xs text-white">Receive</button>
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
          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                10 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 50,000</span>
              </p>
            </th>
            <td class="px-6 py-4">June 01, 2024</td>
            <td class="px-6 py-4">Josh Pharmacy</td>
            <td class="px-6 py-4">
              <span class="bg-red-50 text-red-500 py-1 text-xs px-3 rounded-full">Cancelled</span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 60%"
                  ></div>
                </div>
                <p>0/10</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button disabled class="bg-light-200 py-1 px-2 rounded text-xs text-main-200">
                Cancelled
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

          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                10 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 50,000</span>
              </p>
            </th>
            <td class="px-6 py-4">June 01, 2024</td>
            <td class="px-6 py-4">Maya Pharmacy</td>
            <td class="px-6 py-4">
              <span class="bg-gray-200 text-gray-400 py-1 text-xs px-3 rounded-full">Pending</span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 0%"
                  ></div>
                </div>
                <p>0/10</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button class="bg-blue-50 py-1 px-2 rounded text-xs text-white">Receive</button>
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
          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                5 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 10,000</span>
              </p>
            </th>
            <td class="px-6 py-4">May 31, 2024</td>
            <td class="px-6 py-4">Acme LLC</td>
            <td class="px-6 py-4">
              <span class="bg-emerald-100 text-emerald-500 py-1 text-xs px-3 rounded-full"
                >Complete</span
              >
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 100%"
                  ></div>
                </div>
                <p>5/5</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button disabled class="bg-light-200 py-1 px-2 rounded text-xs text-main-200">
                Received
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
          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                10 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 50,000</span>
              </p>
            </th>
            <td class="px-6 py-4">June 02, 2024</td>
            <td class="px-6 py-4">Sage Pharmacy</td>
            <td class="px-6 py-4">
              <span class="bg-violet-200 text-violet-500 py-1 text-xs px-3 rounded-full"
                >Partially received</span
              >
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 60%"
                  ></div>
                </div>
                <p>6/10</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button class="bg-blue-50 py-1 px-2 rounded text-xs text-white">Receive</button>
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
          <tr
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
              <p>#ORD23456</p>
              <p class="text-main-100 font-normal text-xs items-center inline-flex gap-2">
                10 items
                <span class="h-1 w-1 bg-gray-400 rounded-full"></span>
                <span>KSH 50,000</span>
              </p>
            </th>
            <td class="px-6 py-4">June 01, 2024</td>
            <td class="px-6 py-4">Josh Pharmacy</td>
            <td class="px-6 py-4">
              <span class="bg-red-50 text-red-500 py-1 text-xs px-3 rounded-full">Cancelled</span>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center text-xs gap-2">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style="width: 60%"
                  ></div>
                </div>
                <p>0/10</p>
              </div>
            </td>
            <td class="px-6 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="text-emerald-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </td>
            <td class="px-6 py-4">
              <button disabled class="bg-light-200 py-1 px-2 rounded text-xs text-main-200">
                Cancelled
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
  </div>
</template>
