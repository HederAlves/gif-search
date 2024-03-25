<template>
  <section v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-content">
      <img :src="modalGifUrl" alt="Gif" class="modal-gif">
    </div>
  </section>
</template>

<script setup>

defineProps({
  showModal: Boolean,
  modalGifUrl: String,
  closeModal: Function
});
</script>

<style scoped>
.modal-overlay {
  @apply fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50;
}

.modal-content {
  @apply p-10 bg-white max-w-4xl max-h-[32rem] overflow-hidden;
}

.modal-gif {
  @apply w-56 cursor-pointer transition-transform duration-300 ease-in-out;
}

.modal-gif:hover {
  @apply transform scale-125;
}
</style>
