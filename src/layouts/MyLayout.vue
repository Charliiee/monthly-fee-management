<template>
  <q-layout view="lHh Lpr lff">

    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-white no-underscore">
            <q-avatar icon="fas fa-hand-holding-usd" size="60px" />
            Controle de mensalidades
          </router-link>
        </q-toolbar-title>

        <q-tabs align="left">
          <q-route-tab to="/payments" icon="fas fa-file-invoice-dollar" />
          <q-route-tab to="/students" icon="fa fa-user" />
        </q-tabs>
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

<style scoped>
.no-underscore {
  text-decoration: none;
}
</style>
