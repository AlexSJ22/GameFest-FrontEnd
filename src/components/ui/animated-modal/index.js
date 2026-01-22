// ❌ OLD - This assumes files have "export default"
// export { default as AnimatedModal } from "./AnimatedModal.vue";

// ✅ NEW - Direct exports for Vue SFC with <script setup>
export { default as AnimatedModal } from "./AnimatedModal.vue";
export { default as AnimatedModalBody } from "./AnimatedModalBody.vue";
export { default as AnimatedModalContent } from "./AnimatedModalContent.vue";
export { default as AnimatedModalFooter } from "./AnimatedModalFooter.vue";
export { default as AnimatedModalTrigger } from "./AnimatedModalTrigger.vue";

// Also export the context key and composable
export { ANIMATED_MODAL_KEY } from "./AnimatedModalContext.js";
export { useAnimatedModal } from "./useAnimatedModal.js";