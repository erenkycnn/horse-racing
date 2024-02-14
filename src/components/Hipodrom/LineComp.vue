<script>
export default {
  name: "LineComp",
  props: {
    tempPosition: Number,
    horseFrame: Number,
  },
};
</script>

<template>
  <div class="line__point" :style="{ left: tempPosition + '%' }">
    <img
      :src="require(`@/assets/horse/${horseFrame}.png`)"
      alt="horse"
      width="45"
    />
  </div>
</template>

<style scoped lang="scss">
.line__point {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3px;
}
</style>
