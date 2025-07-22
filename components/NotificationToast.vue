<!-- components/NotificationToast.vue -->
<template>
  <Teleport to="body">
    <div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-3 w-full max-w-md px-4">
      <TransitionGroup
        name="toast"
        tag="div"
        class="space-y-3"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="w-full bg-white shadow-xl rounded-xl pointer-events-auto ring-1 ring-gray-200 overflow-hidden backdrop-blur-sm"
          :class="getNotificationClass(notification.type)"
        >
          <div class="p-5">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 mt-1">
                <!-- Success Icon -->
                <svg
                  v-if="notification.type === 'success'"
                  class="h-6 w-6 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <!-- Error Icon -->
                <svg
                  v-else-if="notification.type === 'error'"
                  class="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <!-- Warning Icon -->
                <svg
                  v-else-if="notification.type === 'warning'"
                  class="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>

                <!-- Info Icon -->
                <svg
                  v-else
                  class="h-6 w-6 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div class="flex-1 min-w-0">
                <p class="text-base font-semibold text-gray-900 leading-tight">
                  {{ notification.title }}
                </p>
                <p class="mt-2 text-sm text-gray-600 leading-relaxed">
                  {{ notification.message }}
                </p>
              </div>

              <div class="flex-shrink-0">
                <button
                  @click="remove(notification.id)"
                  class="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <span class="sr-only">Fechar</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Progress bar para mostrar tempo restante -->
          <div
            v-if="notification.duration"
            class="h-1.5 bg-gray-100"
          >
            <div
              class="h-full transition-all ease-linear rounded-b-xl"
              :class="getProgressClass(notification.type)"
              :style="{ 
                width: '100%',
                animation: `shrink ${notification.duration}ms linear`
              }"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { notifications, remove } = useNotifications()

const getNotificationClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'border-l-4 border-green-500 bg-green-50/30'
    case 'error':
      return 'border-l-4 border-red-500 bg-red-50/30'
    case 'warning':
      return 'border-l-4 border-yellow-500 bg-yellow-50/30'
    case 'info':
      return 'border-l-4 border-blue-500 bg-blue-50/30'
    default:
      return 'border-l-4 border-gray-500 bg-gray-50/30'
  }
}

const getProgressClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'info':
      return 'bg-blue-500'
    default:
      return 'bg-gray-500'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-100%) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-100%) scale(0.95);
}

.toast-move {
  transition: transform 0.3s ease;
}

@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style>