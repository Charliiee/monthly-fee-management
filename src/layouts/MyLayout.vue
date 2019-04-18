<template>
  <q-layout view="lHh Lpr lff">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

        <q-tabs>
          <q-route-tab to="/payments/category" icon="fas fa-yin-yang" />
          <q-route-tab to="/payments/date" icon="fas fa-calendar-day" />
          <q-route-tab to="/payments/user" icon="fa fa-user" />
          <q-route-tab to="/payments/status" icon="fa fa-barcode" />
        </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
