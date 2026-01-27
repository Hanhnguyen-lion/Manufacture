<template>
  <div class="page-container">
    <!-- Main Toolbar -->
    <md-toolbar class="md-primary">
      <div class="md-toolbar-section-start">
        <!-- Optional: Use a button to open a sidebar/drawer for mobile navigation -->
        <!-- <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button> -->
        <span class="md-title">My Application</span>
      </div>

      <div class="md-toolbar-section-end">
        <!-- Menu 1 Trigger -->
        <md-menu md-size="medium" md-direction="bottom-end">
          <md-button md-menu-trigger>File</md-button>

          <md-menu-content>
            <md-menu-item>New</md-menu-item>
            <md-menu-item>Open</md-menu-item>
            <md-menu-item>Save</md-menu-item>
          </md-menu-content>
        </md-menu>

        <!-- Menu 2 Trigger -->
        <md-menu md-size="medium" md-direction="bottom-end">
          <md-button md-menu-trigger>Help</md-button>

          <md-menu-content>
            <md-menu-item>Documentation</md-menu-item>
            <md-menu-item>About</md-menu-item>
          </md-menu-content>
        </md-menu>

        <!-- Standard Button (optional) -->
        <md-button>Logout</md-button>
      </div>
    </md-toolbar>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Your main application content goes here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBarExample',
  // data: () => ({
  //   showNavigation: false
  // })
};
</script>

<style scoped>
.page-container {
  /* Ensure the container takes up the full width/height as needed */
  min-height: 300px;
  overflow: hidden;
  position: relative;
  border: 1px solid #ddd;
}
.main-content {
  padding: 16px;
}
</style>