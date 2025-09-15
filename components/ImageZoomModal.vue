<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-[100] overflow-hidden bg-black bg-opacity-90 flex items-center justify-center"
    @click="closeModal"
    @keydown.esc="closeModal"
  >
    <!-- Close button -->
    <button
      @click="closeModal"
      class="absolute top-4 right-4 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Navigation buttons -->
    <button
      v-if="images.length > 1"
      @click.stop="previousImage"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      v-if="images.length > 1"
      @click.stop="nextImage"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Main image container -->
    <div
      class="relative flex items-center justify-center"
      :class="{
        'w-[95vw] h-[95vh]': true,
        'max-w-4xl max-h-4xl': !isMobile
      }"
      @click.stop
    >
      <div
        ref="imageContainer"
        class="relative overflow-hidden flex items-center justify-center"
        :style="{
          width: containerWidth + 'px',
          height: containerHeight + 'px',
          transform: `scale(${zoomLevel})`,
          transformOrigin: transformOrigin
        }"
        @mousedown="startPan"
        @mousemove="onMouseMove"
        @mouseup="endPan"
        @mouseleave="endPan"
        @wheel.prevent="onWheel"
        @touchstart="startTouchPan"
        @touchmove.prevent="onTouchMove"
        @touchend="endTouchPan"
      >
        <img
          ref="zoomImage"
          :src="currentImage"
          :alt="altText"
          class="max-w-full max-h-full object-contain select-none"
          :style="{
            transform: `translate(${panX}px, ${panY}px)`,
            cursor: zoomLevel > 1 ? (isPanning ? 'grabbing' : 'grab') : (isMobile ? 'default' : 'zoom-in')
          }"
          @load="onImageLoad"
          @dragstart.prevent
        />
      </div>
    </div>

    <!-- Image counter -->
    <div
      v-if="images.length > 1"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm"
    >
      {{ currentIndex + 1 }} / {{ images.length }}
    </div>

    <!-- Zoom controls -->
    <div
      class="absolute flex gap-2 transition-all"
      :class="isMobile ? 'bottom-20 right-4 flex-row' : 'bottom-4 right-4 flex-col'"
    >
      <button
        @click.stop="zoomIn"
        class="text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all touch-manipulation"
        :class="isMobile ? 'p-3' : 'p-2'"
        :disabled="zoomLevel >= maxZoom"
      >
        <svg :class="isMobile ? 'w-6 h-6' : 'w-5 h-5'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      <button
        @click.stop="zoomOut"
        class="text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all touch-manipulation"
        :class="isMobile ? 'p-3' : 'p-2'"
        :disabled="zoomLevel <= minZoom"
      >
        <svg :class="isMobile ? 'w-6 h-6' : 'w-5 h-5'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </button>

      <button
        @click.stop="resetZoom"
        class="text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all touch-manipulation"
        :class="isMobile ? 'p-3' : 'p-2'"
        :disabled="zoomLevel === 1"
      >
        <svg :class="isMobile ? 'w-6 h-6' : 'w-5 h-5'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <!-- Thumbnails -->
    <div
      v-if="images.length > 1"
      class="absolute left-4 flex gap-2 overflow-x-auto touch-manipulation"
      :class="isMobile ? 'bottom-4 max-w-[calc(100vw-8rem)]' : 'bottom-4 max-w-xs'"
    >
      <button
        v-for="(image, index) in images"
        :key="index"
        @click.stop="setCurrentImage(index)"
        class="flex-shrink-0 rounded border-2 overflow-hidden transition-all touch-manipulation"
        :class="[
          isMobile ? 'w-16 h-16' : 'w-12 h-12',
          index === currentIndex ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'
        ]"
      >
        <img
          :src="getThumbImage(image)"
          :alt="`Thumbnail ${index + 1}`"
          class="w-full h-full object-cover"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  images: string[]
  currentImageIndex?: number
  altText?: string
}

const props = withDefaults(defineProps<Props>(), {
  currentImageIndex: 0,
  altText: 'Zoom da imagem'
})

const emit = defineEmits<{
  close: []
}>()

// Composables
const { getProductImage } = useCloudinary()

// Refs
const imageContainer = ref<HTMLElement>()
const zoomImage = ref<HTMLImageElement>()

// State
const currentIndex = ref(props.currentImageIndex)
const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const lastPanPoint = ref({ x: 0, y: 0 })
const containerWidth = ref(800)
const containerHeight = ref(600)
const transformOrigin = ref('center center')
const isMobile = ref(false)
const lastTouchDistance = ref(0)
const initialTouchDistance = ref(0)

// Constants
const minZoom = 1
const maxZoom = 5
const zoomStep = 0.5

// Computed
const currentImage = computed(() => {
  if (!props.images.length) return ''
  return getProductImage(props.images[currentIndex.value], 'large')
})

// Methods
const closeModal = () => {
  resetZoom()
  emit('close')
}

const previousImage = () => {
  if (props.images.length > 1) {
    currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
    resetZoom()
  }
}

const nextImage = () => {
  if (props.images.length > 1) {
    currentIndex.value = currentIndex.value === props.images.length - 1 ? 0 : currentIndex.value + 1
    resetZoom()
  }
}

const setCurrentImage = (index: number) => {
  currentIndex.value = index
  resetZoom()
}

const getThumbImage = (image: string) => {
  return getProductImage(image, 'small')
}

const zoomIn = () => {
  if (zoomLevel.value < maxZoom) {
    zoomLevel.value = Math.min(zoomLevel.value + zoomStep, maxZoom)
  }
}

const zoomOut = () => {
  if (zoomLevel.value > minZoom) {
    zoomLevel.value = Math.max(zoomLevel.value - zoomStep, minZoom)

    // Reset pan when zooming out completely
    if (zoomLevel.value === minZoom) {
      panX.value = 0
      panY.value = 0
    }
  }
}

const resetZoom = () => {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
  transformOrigin.value = 'center center'
}

const onWheel = (event: WheelEvent) => {
  const rect = imageContainer.value?.getBoundingClientRect()
  if (!rect) return

  // Calculate mouse position relative to image container
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  // Set transform origin based on mouse position
  const originX = (mouseX / rect.width) * 100
  const originY = (mouseY / rect.height) * 100
  transformOrigin.value = `${originX}% ${originY}%`

  if (event.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

const startPan = (event: MouseEvent) => {
  if (zoomLevel.value > 1) {
    isPanning.value = true
    lastPanPoint.value = { x: event.clientX, y: event.clientY }
  } else if (zoomLevel.value === 1) {
    // Zoom in at click position
    const rect = imageContainer.value?.getBoundingClientRect()
    if (!rect) return

    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    const originX = (mouseX / rect.width) * 100
    const originY = (mouseY / rect.height) * 100
    transformOrigin.value = `${originX}% ${originY}%`

    zoomIn()
  }
}

const onMouseMove = (event: MouseEvent) => {
  if (isPanning.value && zoomLevel.value > 1) {
    const deltaX = event.clientX - lastPanPoint.value.x
    const deltaY = event.clientY - lastPanPoint.value.y

    panX.value += deltaX
    panY.value += deltaY

    lastPanPoint.value = { x: event.clientX, y: event.clientY }
  }
}

const endPan = () => {
  isPanning.value = false
}

// Touch events for mobile
const getTouchDistance = (touches: TouchList) => {
  if (touches.length < 2) return 0
  const touch1 = touches[0]
  const touch2 = touches[1]
  return Math.sqrt(
    Math.pow(touch2.clientX - touch1.clientX, 2) +
    Math.pow(touch2.clientY - touch1.clientY, 2)
  )
}

const getTouchCenter = (touches: TouchList) => {
  if (touches.length === 1) {
    return { x: touches[0].clientX, y: touches[0].clientY }
  } else if (touches.length === 2) {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    }
  }
  return { x: 0, y: 0 }
}

const startTouchPan = (event: TouchEvent) => {
  event.preventDefault()

  if (event.touches.length === 1) {
    // Single touch - pan
    isPanning.value = true
    const touch = event.touches[0]
    lastPanPoint.value = { x: touch.clientX, y: touch.clientY }
  } else if (event.touches.length === 2) {
    // Two fingers - zoom
    initialTouchDistance.value = getTouchDistance(event.touches)
    lastTouchDistance.value = initialTouchDistance.value

    // Set transform origin to pinch center
    const rect = imageContainer.value?.getBoundingClientRect()
    if (rect) {
      const center = getTouchCenter(event.touches)
      const originX = ((center.x - rect.left) / rect.width) * 100
      const originY = ((center.y - rect.top) / rect.height) * 100
      transformOrigin.value = `${originX}% ${originY}%`
    }
  }
}

const onTouchMove = (event: TouchEvent) => {
  event.preventDefault()

  if (event.touches.length === 1 && isPanning.value && zoomLevel.value > 1) {
    // Single touch pan
    const touch = event.touches[0]
    const deltaX = touch.clientX - lastPanPoint.value.x
    const deltaY = touch.clientY - lastPanPoint.value.y

    panX.value += deltaX
    panY.value += deltaY

    lastPanPoint.value = { x: touch.clientX, y: touch.clientY }
  } else if (event.touches.length === 2 && initialTouchDistance.value > 0) {
    // Two finger zoom
    const currentDistance = getTouchDistance(event.touches)
    const scaleChange = currentDistance / initialTouchDistance.value
    const newZoomLevel = Math.max(minZoom, Math.min(maxZoom, scaleChange))

    if (newZoomLevel !== zoomLevel.value) {
      zoomLevel.value = newZoomLevel

      // Reset pan when zooming out completely
      if (zoomLevel.value === minZoom) {
        panX.value = 0
        panY.value = 0
      }
    }
  }
}

const endTouchPan = (event: TouchEvent) => {
  event.preventDefault()
  isPanning.value = false
  initialTouchDistance.value = 0
  lastTouchDistance.value = 0
}

const onImageLoad = () => {
  if (zoomImage.value) {
    const img = zoomImage.value
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Mobile-specific adjustments
    const maxWidth = isMobile.value ? viewportWidth * 0.95 : Math.min(viewportWidth * 0.9, 1200)
    const maxHeight = isMobile.value ? viewportHeight * 0.85 : Math.min(viewportHeight * 0.9, 800)

    const aspectRatio = img.naturalWidth / img.naturalHeight
    const viewportAspectRatio = maxWidth / maxHeight

    if (aspectRatio > viewportAspectRatio) {
      // Image is wider than viewport - fit by width
      containerWidth.value = maxWidth
      containerHeight.value = maxWidth / aspectRatio
    } else {
      // Image is taller than viewport - fit by height
      containerHeight.value = maxHeight
      containerWidth.value = maxHeight * aspectRatio
    }

    // Ensure minimum sizes on mobile
    if (isMobile.value) {
      containerWidth.value = Math.max(containerWidth.value, 200)
      containerHeight.value = Math.max(containerHeight.value, 200)
    }
  }
}

// Watch for image changes
watch(currentIndex, () => {
  resetZoom()
})

// Watch for prop changes
watch(() => props.currentImageIndex, (newIndex) => {
  currentIndex.value = newIndex
})

// Detect mobile and setup event listeners
onMounted(() => {
  // Detect mobile device
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                   window.innerWidth <= 768

  // Handle window resize
  const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
    if (zoomImage.value) {
      onImageLoad()
    }
  }

  // Keyboard shortcuts (desktop only)
  const handleKeydown = (event: KeyboardEvent) => {
    if (!props.isOpen || isMobile.value) return

    switch (event.key) {
      case 'Escape':
        closeModal()
        break
      case 'ArrowLeft':
        previousImage()
        break
      case 'ArrowRight':
        nextImage()
        break
      case '+':
      case '=':
        zoomIn()
        break
      case '-':
        zoomOut()
        break
      case '0':
        resetZoom()
        break
    }
  }

  document.addEventListener('keydown', handleKeydown)
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<style scoped>
/* Prevent scrolling when modal is open */
.fixed {
  touch-action: manipulation;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Hide scrollbar for thumbnails */
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .fixed {
    padding: 0;
  }

  /* Improve touch targets */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  /* Disable user select on mobile */
  .select-none {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }

  /* Better overflow handling */
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
}

/* Prevent image dragging */
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
</style>