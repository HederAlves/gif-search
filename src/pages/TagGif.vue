<template>
  <q-page class="q-page">
    <ListTagGif />
  </q-page>
</template>

<script setup>

import ListTagGif from "../components/organism/ListTagGif.vue"

defineOptions({
  name: 'TagGif',
  components: [
    { ListTagGif }
  ]
});
</script>
