<script setup>
  // This file should just be a wrapper for style
  const props = defineProps({
    class: { type: String, default: "" }
  });
</script>

<template>
  <div class="flex-1 overflow-y-auto" :class="props.class">
    <slot />
  </div>
</template>