<template>
  <div v-if="!loading">
    <h1>Hello From Home</h1>
    <v-btn color="red">Hi</v-btn>
    <v-chip id="chip" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      Ranee
    </v-chip>
    <v-divider></v-divider>
    <v-btn @click="sayHi" id="hello_btn">Say Hi</v-btn>
    <br>
    {{ this.$store.getters.greeting }}
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: true
    }),
    // async fetch ({ store, params }) {
    //   await store.dispatch('sayHi')
    // },
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      },
      sayHi () {
        this.$store.dispatch('sayHi')
      }
    },
    created () {
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
</script>

<style scoped lang="scss">
  #hello_btn {
    color: #000;
    background: $color-secondary;
  }
  #chip {
    background: $color-primary;
  }
</style>
