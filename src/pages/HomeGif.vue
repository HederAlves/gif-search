<template>
  <q-page class="q-page">
    <HomeGif />
  </q-page>
</template>

<script setup>

import HomeGif from "../components/organism/ListHomeGif.vue"

defineOptions({
  name: 'HomeGif',
  components: [
    { HomeGif }
  ]
});
</script>
