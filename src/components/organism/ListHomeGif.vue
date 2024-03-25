<template>
  <q-page>
    <section>
      <BaseSearch v-model="query" @filter="updateFilter" />
  
      <q-list>
        <q-item v-for="gif in filteredGif" :key="gif.id" clickable @click="openModal(gif)">
          <q-item-section avatar>
            <q-avatar>
              <img :src="getGifUrl(gif)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ gif.content_description }}</q-item-label>
          </q-item-section>
  
          <q-item-section side>
            <router-link :to="getGifUrl(gif)">
              <q-icon name="open_in_new" />
            </router-link>
          </q-item-section>
        </q-item>
      </q-list>
  
      <q-banner v-if="filteredGif.length === 0">
        No gif found
      </q-banner>
      <BaseModal :show-modal="showModal" :modal-gif-url="modalGifUrl" :close-modal="closeModal" />
    </section>
  </q-page>
</template>

<script setup>
import BaseModal from "../atomic/BaseModal.vue";
import BaseSearch from "../atomic/BaseSearch.vue";
import { useGifStore } from "../../store/giphy";
import { ref, computed, onMounted } from 'vue';

const query = ref("");
const showModal = ref(false);
const modalGifUrl = ref('');

onMounted(async () => {
  await useGifStore().fetchGif();
});

const getGifUrl = (gif) => {
  return gif.media[0].mediumgif.url;
};

const gifStore = computed(() => {
  return useGifStore().gif;
});

const filteredGif = computed(() => {
  const queryValue = query.value.toLowerCase().trim();
  if (!queryValue) {
    return gifStore.value;
  } else {
    return gifStore.value.filter(gif => gif.content_description.toLowerCase().includes(queryValue));
  }
});

const updateFilter = (value) => {
  query.value = value.trim();
}

const openModal = (gif) => {
  modalGifUrl.value = getGifUrl(gif);
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalGifUrl.value = null;
};
</script>
