<template>
  <nav
    id="nav"
    class="navbar navbar-expand-md navbar-light py-4 mb-3"
    style="background-color: #86a789"
  >
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="icon" to="/home">Home</router-link>
          </li>
          <li class="nav-item" v-if="$route.path === '/home'">
            <router-link class="icon" to="/templatepage">Template</router-link>
          </li>
          <li class="nav-item" v-if="$route.path === '/homepageforhod'">
            <router-link class="icon" to="/pending">Approval</router-link>
          </li>
          <li class="nav-item">
            <router-link class="icon" to="/settings">Settings</router-link>
          </li>
          <li style="float: right">
            <router-link class="icon" to="/">
              <v-btn @click="window.localStorage.removeItem('auth-token')"
                >Logout</v-btn
              >
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "FrontendNavBar",
  data() {
    return {};
  },
};
</script>
