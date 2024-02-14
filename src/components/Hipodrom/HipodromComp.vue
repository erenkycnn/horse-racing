<script>
import { ref, reactive, computed, watch } from "vue";
import { useStore } from "vuex";
import LineComp from "@/components/Hipodrom/LineComp.vue";
import { generateRandomNumber } from "@/utils/utils.js";

const HORSE_MOVE_INTERVAL = 100;
const MAX_HORSE_FRAMES = 12;
const MAX_POSITION = 96;
const MOVEMENT_SPEED = 2;
const HORSE_DECREASE_RATIO = generateRandomNumber(0.5, 1);

export default {
  components: {
    LineComp,
  },
  props: {
    horse: Object,
    meters: Number,
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      horses: computed(() => store.state.horses),
      isRaceStarted: computed(() => store.state.isRaceStarted),
    });

    const tempPosition = ref(0);
    const horseFrame = ref(1);
    const tempBreakPoint = ref(1);
    let moveInterval = null;
    let frameInterval = null;

    const findHorse = (id) => {
      const horse = state.horses.find((horse) => horse.id === id);
      return horse?.currentCondition || horse.startedCondition;
    };

    const changeHorseFrame = (tempCondition) => {
      frameInterval = setInterval(() => {
        horseFrame.value = (horseFrame.value % MAX_HORSE_FRAMES) + 1;
      }, ((10000 / tempCondition) * HORSE_DECREASE_RATIO) / MOVEMENT_SPEED);
    };

    const moveHorse = () => {
      let tempCondition = findHorse(props.horse.id);
      changeHorseFrame(tempCondition);

      const updateHorseState = () => {
        tempPosition.value += (tempCondition / 100) * MOVEMENT_SPEED;
        if (
          tempPosition.value >=
          (100 / (props.meters / 100)) * tempBreakPoint.value
        ) {
          tempCondition -= (tempCondition * HORSE_DECREASE_RATIO) / 100;
          tempBreakPoint.value += 1;
        }

        if (tempPosition.value >= MAX_POSITION) {
          store.dispatch("changeHorseCondition", {
            ...props.horse,
            condition: tempCondition,
          });
          store.dispatch("setRaceResults", props.horse);
          tempPosition.value = 0;
          tempBreakPoint.value = 1;
          clearInterval(moveInterval);
          clearInterval(frameInterval);
        }
      };

      const moveInterval = setInterval(
        updateHorseState,
        (HORSE_MOVE_INTERVAL / props.meters) * 1000
      );
    };

    watch(
      () => state.isRaceStarted,
      (newValue) => {
        if (newValue) {
          moveHorse();
        } else {
          clearInterval(moveInterval);
          clearInterval(frameInterval);
        }
      }
    );

    return {
      props,
      tempPosition,
      findHorse,
      horseFrame,
    };
  },
};
</script>

<template>
  <div class="line" :style="{ backgroundColor: props.horse.color }">
    {{ props.horse.name }}
    <LineComp :horseFrame="horseFrame" :tempPosition="tempPosition" />
  </div>
</template>

<style scoped lang="scss">
.line {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 1rem;
  background-color: #f0f0f0;
  height: 15px;
  border-top: 1px dashed black;
  position: relative;

  &:last-child {
    border-bottom: 1px dashed black;
  }
}
</style>
