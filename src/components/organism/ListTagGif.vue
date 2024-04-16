<template>
  <q-page>
    <section>
      <BaseSearch v-model="query" />
  
      <q-list>
        <q-item v-for="tag in filteredGif" :key="tag.searchterm" clickable @click="openModal(tag.image)">
          <q-item-section avatar>
            <q-avatar>
              <img :src="tag.image" :alt="tag.searchterm" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ tag.searchterm }}</q-item-label>
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
    </section>
    <BaseModal :showModal="showModal" :modalGifUrl="modalGifUrl" :closeModal="closeModal" />
  </q-page>
</template>

<script setup>
import { useGifStore } from '../../store/app';
import { ref, onMounted, computed } from 'vue';
import BaseSearch from '../../components/atomic/BaseSearch.vue';
import BaseModal from '../../components/atomic/BaseModal.vue';

const store = useGifStore();
const gifTag = ref([]);
const query = ref('');
const showModal = ref(false);
const modalGifUrl = ref('');

onMounted(async () => {
  await store.fetchGifTag();
  gifTag.value = store.gifTag;
});

const filteredGif = computed(() => {
  const queryValue = query.value.toLowerCase().trim();
  if (!queryValue || gifTag.value.length === 0) {
    return gifTag.value;
  } else {
    return gifTag.value.filter(tag => tag.searchterm.toLowerCase().includes(queryValue));
  }
});

const openModal = (gif) => {
  modalGifUrl.value = gif;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>
