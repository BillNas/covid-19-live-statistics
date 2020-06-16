<template>
  <div class="container">
    <h1 class="text-primary text-center">
      COVID-19 Continents Live Statistics
    </h1>
    <form>
      <div class="form-group">
        <label>Continent Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter a continent name."
          v-model="searchTerm"
        />
      </div>
      <div class="form-group">
        <select
          class="form-control"
          v-model="sort"
          v-if="filteredContinents == null"
        >
          <option>cases</option>
          <option>deaths</option>
          <option>recovered</option>
          <option>critical</option>
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
          <th scope="col">Country</th>
          <th scope="col" v-on:click="sort = 'cases'">Total Cases</th>
          <th scope="col">Today Cases</th>
          <th scope="col" v-on:click="sort = 'active'">Active Cases</th>
          <th scope="col" v-on:click="sort = 'deaths'">Total Deaths</th>
          <th scope="col">Today Deaths</th>
          <th scope="col" v-on:click="sort = 'recovered'">Recovered</th>
          <th scope="col" v-on:click="sort = 'critical'">Critical</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="continent in filteredContinents" v-bind:key="continent.id">
          <td>{{ continent.continent }}</td>
          <td class="cases">{{ continent.cases }}</td>
          <td>{{ continent.todayCases }}</td>
          <td>{{ continent.active }}</td>
          <td class="deaths">{{ continent.deaths }}</td>
          <td>{{ continent.todayDeaths }}</td>
          <td class="recovered">{{ continent.recovered }}</td>
          <td>{{ continent.critical }}</td>
        </tr>
      </tbody>
      <tbody v-if="searchTerm == ''">
        <tr v-for="continent in continents" v-bind:key="continent.id">
          <td>{{ continent.continent }}</td>
          <td class="cases">{{ continent.cases }}</td>
          <td>{{ continent.todayCases }}</td>
          <td>{{ continent.active }}</td>
          <td class="deaths">{{ continent.deaths }}</td>
          <td>{{ continent.todayDeaths }}</td>
          <td class="recovered">{{ continent.recovered }}</td>
          <td>{{ continent.critical }}</td>
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
      sort: 'cases',
      continents: [],
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
    filteredContinents() {
      if (this.searchTerm) {
        const regexp = new RegExp(this.searchTerm, 'gi');
        return this.continents.filter((filteredContinent) =>
          filteredContinent.continent.match(regexp)
        );
      }

      return this.continent;
    },
  },
  methods: {
    async getStats() {
      const url =
        'https://corona.lmao.ninja/v2/continents/' +
        this.searchTerm +
        '?sort=' +
        this.sort;
      const response = await axios.get(url);
      const data = response.data;
      this.loading = true;
      if (data) {
        this.continents = data;
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
