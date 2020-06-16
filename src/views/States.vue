<template>
  <div class="container">
    <h1 class="text-primary text-center">COVID-19 USA Live Statistics</h1>
    <form>
      <div class="form-group">
        <label>State Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter a USA state name."
          v-model="searchTerm"
        />
      </div>
      <div class="form-group" v-if="filteredStates == null">
        <label>Sort By</label>
        <select class="form-control" v-model="sort">
          <option>cases</option>
          <option>deaths</option>
          <option>active</option>
        </select>
      </div>
    </form>

    <div class="alert alert-dismissible alert-danger" v-if="error">
      <strong>No data found!</strong>
    </div>

    <div class="spinner-border" role="status" v-if="loading"></div>
    <table class="table table-dark table-hover text-center" v-if="!loading">
      <thead>
        <tr>
          <th scope="col">State</th>
          <th scope="col" v-on:click="sort = 'cases'">Total Cases</th>
          <th scope="col">Today Cases</th>
          <th scope="col" v-on:click="sort = 'active'">Active Cases</th>
          <th scope="col" v-on:click="sort = 'deaths'">Total Deaths</th>
          <th scope="col">Today Deaths</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="state in filteredStates" v-bind:key="state.id">
          <td>{{ state.state }}</td>
          <td class="cases">{{ state.cases }}</td>
          <td>{{ state.todayCases }}</td>
          <td>{{ state.active }}</td>
          <td class="deaths">{{ state.deaths }}</td>
          <td>{{ state.todayDeaths }}</td>
        </tr>
      </tbody>
      <tbody v-if="searchTerm == ''">
        <tr v-for="state in states" v-bind:key="state.id">
          <td>{{ state.state }}</td>
          <td class="cases">{{ state.cases }}</td>
          <td>{{ state.todayCases }}</td>
          <td>{{ state.active }}</td>
          <td class="deaths">{{ state.deaths }}</td>
          <td>{{ state.todayDeaths }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: '',
      states: [],
      sort: 'cases',
      loading: false,
      error: false,
    };
  },
  mounted() {
    this.getStats();
  },
  watch: {
    sort: function() {
      this.getStats();
    },
  },
  computed: {
    filteredStates() {
      if (this.searchTerm != '') {
        const regexp = new RegExp(this.searchTerm, 'gi');
        return this.states.filter((filteredState) =>
          filteredState.state.match(regexp)
        );
      }

      return this.States;
    },
  },
  methods: {
    async getStats() {
      const url =
        'https://corona.lmao.ninja/v2/states/' +
        this.searchTerm +
        '?sort=' +
        this.sort;

      const response = await axios.get(url);
      const data = response.data;

      if (data) {
        this.states = data;
        this.loading = false;
      } else {
        this.error = true;
      }
    },
  },
};
</script>

<style>
.deaths {
  color: #fc4a0f;
}
.recovered {
  color: #2ead00;
}
.cases {
  color: #3466ed;
}
</style>
