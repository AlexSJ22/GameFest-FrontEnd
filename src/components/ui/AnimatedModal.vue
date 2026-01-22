<script setup lang="ts">
import { ref } from "vue";

// ✅ ADD THESE IMPORTS - This was missing!
import { 
  AnimatedModal, 
  AnimatedModalBody, 
  AnimatedModalContent, 
  AnimatedModalFooter 
} from "./animated-modal";

const open = ref(false);
</script>

<template>
  <div class="flex w-full items-center justify-center gap-4 py-8">
    <!-- Method 1: Controlled Mode -->
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
      @click="open = true"
    >
      Open Modal (Controlled)
    </button>

    <!-- Method 2: Uncontrolled Mode -->
    <AnimatedModal
      v-slot="{ openModal, closeModal }"
      v-model:open="open"
    >
      <button
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
        @click="openModal"
      >
        Open Modal (Uncontrolled)
      </button>

      <AnimatedModalBody :lock-scroll="false">
        <AnimatedModalContent>
          <h3 class="text-xl font-semibold">How to Use</h3>
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Two ways to control the modal: controlled mode with v-model, or uncontrolled mode using
            slot methods.
          </p>
          <div class="mt-6 space-y-3">
            <div class="flex items-start gap-3">
              <div class="bg-blue-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Controlled Mode</p>
                <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Use v-model:open or :open with @update:open to manage state externally.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="bg-blue-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Uncontrolled Mode
                </p>
                <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Use v-slot to get openModal() and closeModal() methods. Recommended for most
                  cases.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="bg-blue-500 mt-1.5 h-2 w-2 shrink-0 rounded-full" />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Quick Start</p>
                <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Copy the code from this demo and customize the content inside
                  AnimatedModalContent.
                </p>
              </div>
            </div>
          </div>
        </AnimatedModalContent>
        <AnimatedModalFooter class="gap-2">
          <button
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            @click="closeModal"
          >
            Confirm
          </button>
        </AnimatedModalFooter>
      </AnimatedModalBody>
    </AnimatedModal>
  </div>
</template>