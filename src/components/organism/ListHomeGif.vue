<template>
  <q-page>
    <section>
      <BaseSearch v-model="query" />
  
      <q-list>
        <q-item v-for="gif in filteredGif" :key="gif.id" clickable @click="openModal(gif)">
          <q-item-section avatar>
            <q-avatar>
              <img :src="gif.media[0].mediumgif.url" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ gif.content_description }}</q-item-label>
          </q-item-section>
  
          <q-item-section side>
            <q-button>
              <q-icon name="open_in_new" />
            </q-button>
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
import { useGifStore } from "../../store/app";
import { ref, onMounted, computed } from 'vue';
import BaseSearch from "../atomic/BaseSearch.vue";
import BaseModal from "../atomic/BaseModal.vue";

const store = useGifStore();
const gifHome = ref([]);
const query = ref('');
const showModal = ref(false);
const modalGifUrl = ref('');

onMounted(async () => {
  await store.fetchGif();
  gifHome.value = store.gif;
});

const filteredGif = computed(() => {
  const queryValue = query.value.toLowerCase().trim();
  if (!queryValue) {
    return gifHome.value;
  } else {
    return gifHome.value.filter(gif => gif.content_description.toLowerCase().includes(queryValue));
  }
});

const openModal = (gif) => {
  modalGifUrl.value = gif.media[0].mediumgif.url;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>
