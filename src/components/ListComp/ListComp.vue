<script>
export default {
  props: {
    listTitle: {
      type: String,
      required: true,
    },
    listItems: {
      type: Array,
      required: true,
    },
    listHeaders: {
      type: Array,
      required: true,
    },
    listKeys: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div class="list-container">
    <h5>{{ listTitle }}</h5>
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in listHeaders" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listItems" :key="index">
          <td v-for="(key, index) in listKeys" :key="index">{{ item[key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.list-container {
  width: max-content;

  h5 {
    margin-top: 0.5rem;
  }

  table {
    border-collapse: collapse;
    font-size: 12px;
  }

  th,
  td {
    border: 1px solid #dddddd;
    text-align: left;
    max-width: 90px;
    padding: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
    max-width: 50px;
  }
}
</style>
