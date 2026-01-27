<template>
  <md-table v-model="users" md-sort="name" md-sort-order="asc" md-card>
    <md-table-toolbar>
      <h1 class="md-title">Users</h1>
    </md-table-toolbar>

    <md-table-row>
      <template v-slot:md-table-row="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
      </template>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  name: 'DataTable',
  data: () => ({
    users: [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', gender: 'Male' },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', gender: 'Female' },
      // ... more data
    ]
  })
};
</script>

<style>
  .md-table {
    /deep/ .md-table-head-container, /deep/ .md-table-cell-container {
      min-width: 150px; /* Example of using deep selectors for styling */
    }
  }
</style>