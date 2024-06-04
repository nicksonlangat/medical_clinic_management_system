<script setup></script>

<template>
  <div class="bg-white font-base text-main">
    <div class="p-5 flex justify-between items-center">
      <p class="text-2xl font-semibold">Dashboard</p>
      <div>
        <input
          type="text"
          class="bg-light-200 py-2 rounded-md border-0 w-96 placeholder:text-main-100 text-sm focus:outline-none focus:ring-0"
          placeholder="Search anything..."
        />
      </div>
      <div>
        <div class="flex gap-2 items-center">
          <img src="../assets/1.png" class="h-10 w-10 rounded-full object-cover" alt="" />
          <div class="text-sm">
            <p>Allan Smith</p>
            <p class="text-xs text-main-100">Admin</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
