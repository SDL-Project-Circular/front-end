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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
          <li class="nav-item">
            <router-link class="icon" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="icon" to="/templatepage">Template</router-link>
          </li>
          <li class="nav-item">
            <router-link class="icon" to="/settings">Settings</router-link>
          </li>
        </ul>
        <input
          v-if="$route.path === '/'"
          class="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style="width: 500px"
        />
      </div>
    </div>
  </nav>
</template>
