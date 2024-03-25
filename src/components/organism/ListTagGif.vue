<template>
  <q-page>
    <section>
      <BaseSearch v-model="query" />
  
      <q-list>
        <q-item v-for="tag in filteredTag" :key="tag.searchterm" clickable @click="openModal(tag.image)">
          <q-item-section avatar>
            <q-avatar>
              <img :src="tag.image" :alt="tag.searchterm" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ tag.searchterm }}</q-item-label>
          </q-item-section>
  
          <q-item-section side>
            <router-link :to="tag.path">
              <q-icon name="open_in_new" />
            </router-link>
          </q-item-section>
        </q-item>
      </q-list>
  
      <q-banner v-if="filteredTag.length === 0">
        No gif found
      </q-banner>
    </section>
    <BaseModal :showModal="showModal" :modalGifUrl="modalImageUrl" :closeModal="closeModal" />
  </q-page>
</template>

<script setup>
import { useGifStore } from '../../store/giphy';
import { ref, onMounted, computed } from 'vue';
import BaseSearch from '../../components/atomic/BaseSearch.vue';
import BaseModal from '../../components/atomic/BaseModal.vue';

const query = ref('');
const gifStore = useGifStore();
const gifTag = ref([]);
const showModal = ref(false);
const modalImageUrl = ref('');

onMounted(() => {
  gifStore.fetchGifTag().then(() => {
    gifTag.value = gifStore.gifTag;
  });
});

const filteredTag = computed(() => {
  const searchTerm = query.value.toLowerCase().trim();
  if (!searchTerm || gifTag.value.length === 0) {
    return gifTag.value;
  } else {
    return gifTag.value.filter(tag => tag.searchterm.toLowerCase().includes(searchTerm));
  }
});

const openModal = (imageUrl) => {
  modalImageUrl.value = imageUrl;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>
