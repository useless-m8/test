<script setup>
import { nextTick, onMounted, ref } from "vue";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

const toasts = ref([]);

async function show(productName = "Item") {
  const id = uid();
  toasts.value.push({
    id,
    title: "Added to cart",
    body: `${productName} was added to your cart.`,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  await nextTick();

  const el = document.getElementById(`toast-${id}`);
  if (el && window.bootstrap?.Toast) {
    const t = window.bootstrap.Toast.getOrCreateInstance(el, { delay: 2200 });
    el.addEventListener(
      "hidden.bs.toast",
      () => {
        toasts.value = toasts.value.filter((x) => x.id !== id);
      },
      { once: true }
    );
    t.show();
  } else {
    setTimeout(() => {
      toasts.value = toasts.value.filter((x) => x.id !== id);
    }, 2400);
  }
}

function wireButtons() {
  document.querySelectorAll(".btn.purchase").forEach((btn) => {
    if (btn.dataset.toastWired) return;
    btn.dataset.toastWired = "1";
    btn.addEventListener("click", () => {
      const name = btn.dataset.product || "Bike";
      show(name);
    });
  });
}

onMounted(() => {
  wireButtons();
});
</script>

<template>
  <div
    class="toast-container position-fixed bottom-0 end-0 p-3"
    style="z-index: 9999"
  >
    <div
      v-for="t in toasts"
      :key="t.id"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      :id="`toast-${t.id}`"
    >
      <div class="toast-header">
        <strong class="me-auto">{{ t.title }}</strong>
        <small class="text-body-secondary">{{ t.time }}</small>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">{{ t.body }}</div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  border-radius: 14px;
}
</style>
