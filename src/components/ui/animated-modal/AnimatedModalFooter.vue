<script setup>
const props = defineProps({
  class: { type: String, required: false, default: "" },
});
</script>

<template>
  <div
    class="flex justify-end bg-gray-100 p-4 dark:bg-neutral-900"
    :class="[props.class]"
  >
    <slot />
  </div>
</template>
