import { createStore } from "vuex";
import { horseNames, horseColors } from "@/constants/constants.js";
import {
  getUniqueHorses,
  calculateMeters,
  getRandomElement,
  generateRandomNumber,
} from "@/utils/utils.js";

const HORSES_PER_RACE = 10;

export default createStore({
  state: {
    horses: [],
    currentRound: 0,
    currentRoundResults: [],
    isRaceStarted: false,
    schedules: [],
    raceResults: [],
  },
  getters: {
    horses: (state) => state.horses,
    schedules: (state) => state.schedules,
    raceResults: (state) => state.raceResults,
  },
  mutations: {
    generateHorses(state) {
      const TOTAL_HORSES = 20;
      const tempHorses = [];
      const horseNamesCopy = [...horseNames].sort(() => Math.random() - 0.5);
      const usedNames = new Set();

      for (let i = 0; i < TOTAL_HORSES; i++) {
        let name = horseNamesCopy.pop();
        usedNames.add(name);

        const startedCondition = generateRandomNumber(1, 100);
        const color = getRandomElement(horseColors);

        tempHorses.push({
          name,
          startedCondition,
          color,
          id: i,
        });
      }

      state.horses = tempHorses;
    },
    generateSchedule(state) {
      const RACE_COUNT = 6;

      if (state.schedules.length === 0) {
        state.raceResults = [];
        state.currentRound = 0;
      }

      for (let i = 0; i < RACE_COUNT; i++) {
        const uniqueHorses = getUniqueHorses(HORSES_PER_RACE, state.horses);

        state.schedules.push({
          round: state.currentRound + i + 1,
          meters: calculateMeters(i, state.schedules),
          horses: [...uniqueHorses],
        });
      }
    },
    setRaceResults(state, payload) {
      state.currentRoundResults.push({
        ...payload,
        rank: state.currentRoundResults.length + 1,
      });

      state.raceResults[state.currentRound] = [...state.currentRoundResults];
      if (state.currentRoundResults.length === HORSES_PER_RACE) {
        state.currentRound++;
        state.currentRoundResults = [];
        state.isRaceStarted = false;
      }
    },
    changeHorseCondition(state, payload) {
      const updatedHorses = state.horses.map((horse) =>
        horse.id === payload.id
          ? { ...horse, currentCondition: payload.condition }
          : horse
      );

      state.horses = updatedHorses;
    },
    startRace(state) {
      state.isRaceStarted = !state.isRaceStarted;
    },
  },
  actions: {
    setRaceResults({ commit }, payload) {
      commit("setRaceResults", payload);
    },
    changeHorseCondition({ commit }, payload) {
      commit("changeHorseCondition", payload);
    },
    startRace({ commit }) {
      commit("startRace");
    },
  },
});
