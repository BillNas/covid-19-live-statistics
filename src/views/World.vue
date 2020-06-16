<template>
    <div class="container">
        <h1 class="text-primary text-center">COVID-19 World Live Statistics</h1>
        <form>
            <div class="form-group">
                <label>Country Name</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Enter a country name."
                    v-model="searchTerm"
                />
            </div>
            <div class="form-group" v-if="filteredCountries == null">
                <select class="form-control" v-model="sort">
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
                <tr v-for="country in filteredCountries" v-bind:key="country.id">
                    <td>{{ country.country }}</td>
                    <td class="cases">{{ country.cases }}</td>
                    <td>{{ country.todayCases }}</td>
                    <td>{{ country.active }}</td>
                    <td class="deaths">{{ country.deaths }}</td>
                    <td>{{ country.todayDeaths }}</td>
                    <td class="recovered">{{ country.recovered }}</td>
                    <td>{{ country.critical }}</td>
                </tr>
            </tbody>
            <tbody v-if="searchTerm == ''">
                <tr v-for="country in countries" v-bind:key="country.id">
                    <td>{{ country.country }}</td>
                    <td class="cases">{{ country.cases }}</td>
                    <td>{{ country.todayCases }}</td>
                    <td>{{ country.active }}</td>
                    <td class="deaths">{{ country.deaths }}</td>
                    <td>{{ country.todayDeaths }}</td>
                    <td class="recovered">{{ country.recovered }}</td>
                    <td>{{ country.critical }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            searchTerm: "", 
            sort: "cases",
            loading: false,
            error: false,
            countries: []
        };
    },
    mounted() {
        this.getStats();
    },
    watch: {
        sort: function() {
            this.getStats();
        }
    },
    computed: {
        filteredCountries() {
            if (this.searchTerm) {
                const regexp = new RegExp(this.searchTerm, "gi");
                return this.countries.filter(filteredCountry =>
                    filteredCountry.country.match(regexp)
                );
            }

            return this.country;
        }
    },
    methods: {
        async getStats() {
            const url =
                "https://corona.lmao.ninja/v2/countries/" + this.searchTerm + "?sort=" + this.sort;

            const response = await axios.get(url);
            const data = response.data;
            this.loading = true;
            if (data) {
                this.countries = data;
                this.loading = false;
            } else {
                this.error = true;
            }
        }
    }
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
