<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">Covid-19 </router-link>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              World 🌎
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/continents">
              Continents 🗺️
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/usa" class="nav-link">
              USA 🇺🇸
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
};
</script>
<style lang="scss"></style>
