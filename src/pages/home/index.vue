<template>
  <div v-if="!loading">
    <h1>Hello From Home</h1>
    <v-btn color="red">Hi</v-btn>
    <v-divider></v-divider>
    <v-btn id="hello_btn">Hello</v-btn>
    <v-chip id="chip" text-color="white">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      Ranee
    </v-chip>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: true
    }),
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    },
    created () {
      setTimeout(() => {
        this.loading = false
      }, 1000)
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
