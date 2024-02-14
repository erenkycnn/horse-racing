<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "HeaderComp",
  setup() {
    const store = useStore();

    const state = reactive({
      schedules: computed(() => store.state.schedules),
      isRaceStarted: computed(() => store.state.isRaceStarted),
      raceResults: computed(() => store.state.raceResults),
    });

    return {
      state,
      store,
    };
  },
};
</script>
<template>
  <div class="header-container">
    <span class="title">
      <div>Horse Racing</div>
    </span>
    <div class="btn-group">
      <button
        class="btn btn-primary"
        @click="() => store.commit('generateSchedule')"
        :disabled="state.isRaceStarted"
      >
        {{ state.schedules.length ? "Regenerate Program" : "Generate Program" }}
      </button>
      <button
        class="btn btn-secondary"
        @click="() => store.commit('startRace')"
        :disabled="state.raceResults.length === state.schedules.length"
      >
        {{ state.isRaceStarted ? "Stop" : "Start" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: gray;

  .title {
    font-size: 24px;
    font-weight: bold;
    color: white;
  }

  .btn-group {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
}
</style>
