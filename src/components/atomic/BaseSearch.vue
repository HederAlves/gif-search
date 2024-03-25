<template>
  <q-input v-model="query" outlined placeholder="Search..." />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});

const query = ref(props.modelValue || '');
const emit = defineEmits(['update:modelValue', 'filter']);

watch(query, () => {
  emit('update:modelValue', query.value);
  emit('filter', query.value);
});
</script>
