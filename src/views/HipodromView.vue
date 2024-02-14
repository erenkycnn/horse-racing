<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import HeaderComp from "@/components/HeaderComp.vue";
import ListComp from "@/components/ListComp/ListComp.vue";
import HipodromComp from "@/components/Hipodrom/HipodromComp.vue";
import ResultView from "@/views/ResultView.vue";

export default {
  components: {
    HeaderComp,
    ListComp,
    HipodromComp,
    ResultView,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      horses: computed(() => store.state.horses),
      schedules: computed(() => store.state.schedules),
      isRaceStarted: computed(() => store.state.isRaceStarted),
      currentRound: computed(() => store.state.currentRound),
      results: computed(() => store.state.raceResults),
    });

    store.commit("generateHorses");

    return {
      state,
    };
  },
};
</script>

<template>
  <HeaderComp />
  <section>
    <div class="main-wrapper">
      <div class="horse-list">
        <ListComp
          :listTitle="'Horse List'"
          :listItems="state?.horses"
          :listHeaders="['Name', 'Condition', 'Color']"
          :listKeys="['name', 'startedCondition', 'color']"
        />
      </div>
      <div class="race-track-wrapper">
        <div class="race-round" v-if="state.schedules[state.currentRound]">
          Round {{ state.currentRound + 1 }} -
          {{ state.schedules[state.currentRound].meters }}m
        </div>
        <div v-if="state.currentRound !== 6">
          <div class="line-wrapper">
            <div class="line-wrapper__start"></div>
            <div class="line-wrapper__finish"></div>
            <HipodromComp
              v-for="(horse, index) in state.schedules[state.currentRound]
                ?.horses"
              :meters="state.schedules[state.currentRound].meters"
              :horse="horse"
              :key="`${state.currentRound}-${index}`"
              :background="horse.color"
              :isStart="state.isRaceStarted"
            />
          </div>
        </div>
        <div v-else>Race Finished</div>
      </div>
      <div class="result-wrapper">
        <ResultView />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main-wrapper {
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding: 1rem;
  background-color: #f0f0f0;

  .horse-list {
    display: flex;
    justify-content: center;
    flex: 1;
    background-color: white;
    padding: 1rem;
    max-width: 275px;
  }

  .race-track-wrapper {
    flex: 3;
    background-color: white;
    padding: 1rem;
    width: 500px;
    max-height: 550px;

    .race-round {
      padding: 1rem;
      font-weight: bold;
    }

    .line-wrapper {
      display: flex;
      flex-direction: column;
      background-color: #f0f0f0;
      position: relative;

      &__start {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 5%;
        height: 100%;
        width: 2px;
        background-color: red;
      }

      &__finish {
        z-index: 1;
        position: absolute;
        top: 0;
        right: 4%;
        height: 100%;
        width: 2px;
        background-color: red;
      }
    }
  }

  .result-wrapper {
    background-color: white;
    padding: 1rem;
    max-height: 550px;
    overflow: scroll;
  }
}
</style>
