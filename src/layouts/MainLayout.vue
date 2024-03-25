<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
  
        <q-toolbar-title>
          GIF APP
        </q-toolbar-title>
  
        <div>Version 1.0.0</div>
      </q-toolbar>
    </q-header>
  
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Navigation Menu
        </q-item-label>
        <div class="pt-4 flex flex-col gap-15 border-t-2 border-gray-300">
          <q-btn flat color="primary" label="Home" @click="$router.push('/')" />
          <q-btn flat color="primary" label="Tag" @click="$router.push('/tag')" />
        </div>
      </q-list>
    </q-drawer>
  
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({
  name: 'MainLayout',
})
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>