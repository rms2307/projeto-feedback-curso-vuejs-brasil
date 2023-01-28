<template>
  <teleport to="body">
    <div
      v-if="state.isActive"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-block bg-opsvity-50"
      @click="handleModelToogle({ status: false })"
    ></div>
    <div class="fixed mx-10">
      <div
        class="flex flex-col overflow-hidden bg-write rounded-lg animate__animated anomate_fadeInDown__faster"
      >
        <div class="flex flex-col px-12 py-10 bg-write">
          <component :is="state.component" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { reactive } from "@vue/reactivity";

const DEFAULT_WIDTH = "w-3/4 lg:w-1/3";

export default {
  setup() {
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH,
    });

    function handleModelToogle({ status }) {}

    return {
      state,
    };
  },
};
</script>

<style></style>
