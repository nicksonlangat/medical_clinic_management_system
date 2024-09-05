<script setup></script>
<template>
  <div>
    <div class="mt-5 flex justify-between">
      <div class="flex gap-3 items-center">
        <span class="bg-blue-10 text-blue-50 py-2 px-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"
            />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
            <path d="M8 14v4" />
            <path d="M12 14v4" />
            <path d="M16 14v4" />
          </svg>
        </span>
        <p class="text-main text-xl">
          16 <span class="text-sm text-main-100">total appointments</span>
        </p>
      </div>
      <div class="flex gap-5 items-center">
        <span class="bg-light-200 px-1.5 py-1.5 rounded-md text-main-100 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </span>
        <p class="text-xl text-main">Mon, 8 July 2024</p>
        <span class="bg-light-200 px-1.5 py-1.5 rounded-md text-main-100 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-5"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </span>
      </div>
      <div>
        <button class="bg-blue-50 text-white text-xs py-2 rounded-md px-4">All</button>
      </div>
    </div>
    <hr class="mt-5 border-gray-100" />
    <div class="">
      <div class="grid grid-cols-4 divide-x divide-gray-100">
        <div v-for="i in 4" :key="i" class="h-96"></div>
      </div>
    </div>
  </div>
</template>
