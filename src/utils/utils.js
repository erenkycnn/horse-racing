export const getUniqueHorses = (count, allHorses) => {
  const uniqueHorses = new Map();
  while (uniqueHorses.size < count) {
    const randomIndex = Math.floor(Math.random() * allHorses.length);
    const selectedHorse = allHorses[randomIndex];
    if (!uniqueHorses.has(selectedHorse.id)) {
      uniqueHorses.set(selectedHorse.id, {
        ...selectedHorse,
        rank: uniqueHorses.size + 1,
      });
    }
  }
  return Array.from(uniqueHorses.values());
};

export const calculateMeters = (currentRaceIndex, schedules) => {
  const baseMeters = 1200;
  const previousRaceRound = schedules[currentRaceIndex - 1]?.round || 0;
  return baseMeters + previousRaceRound * 200;
};

export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
