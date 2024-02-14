<script>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ListComp from "@/components/ListComp/ListComp.vue";
export default {
  components: {
    ListComp,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      schedules: computed(() => store.state.schedules),
      currentRound: computed(() => store.state.currentRound),
      results: computed(() => store.state.raceResults),
    });

    const listHeaders = ["Rank", "Name"];
    const listKeys = ["rank", "name"];

    return { router, state, listHeaders, listKeys };
  },
};
</script>
<template>
  <div class="results">
    <div
      v-for="i in (0, state.currentRound + 1)"
      v-bind:key="i"
      class="results__item"
    >
      <ListComp
        :listTitle="'Program ' + i"
        :list-items="state.schedules[i - 1]?.horses"
        :listHeaders="listHeaders"
        :listKeys="listKeys"
      />
      <ListComp
        :listTitle="'Race ' + i"
        :listItems="state.results[i - 1]"
        :listHeaders="listHeaders"
        :listKeys="listKeys"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.results {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 1rem;

  &__item {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
}
</style>
