<script setup>
import AsideNav from '@/components/AsideNav.vue'
import TopNav from '@/components/TopNav.vue'
import { ref } from 'vue';

const title = ref("Stock")

</script>

<template>
  <div id="app" class="h-screen flex flex-col overflow-hidden">
    <!-- Main content -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Fixed sidebar -->
      <AsideNav />
      <!--  -->
      <!-- Scroll wrapper -->
      <div class="flex-1 flex bg-light-200 font-base text-main flex-col">
        <TopNav :title="title" />
        <!-- Scrollable container -->
        <div class="px-2 py-4 flex-1 overflow-y-auto">
          <!-- Your content -->
          <div>
            <p>Good morning Allan</p>
            <p class="text-main-100 text-sm">Monday, 03 June 2024</p>
          </div>
          <div class="mt-5 flex gap-2">
            <div class="w-2/3 bg-white rounded-md h-80"></div>
            <div class="w-1/3 rounded-md bg-white h-80"></div>
          </div>
          <div class="mt-5 flex gap-2">
            <div class="w-2/3 grid grid-cols-2 gap-2">
              <div class="bg-white rounded-md"></div>
              <div class="flex flex-col gap-2">
                <div class="bg-white rounded-md h-40"></div>
                <div class="bg-white rounded-md h-40"></div>
              </div>
            </div>
            <div class="w-1/3 rounded-md bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
