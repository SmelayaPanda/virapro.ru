<template>
  <div v-if="data" @click="setWatchedUserId" :class="$store.getters.watchedUserId === id ? 'active_user' : ''">
    <el-row class="user_row" v-if="type === 'register' && data.email">
      <el-col :span="5" class="event_count">{{ data.events ? Object.keys(data.events).length : 0 }}</el-col>
      <el-col :span="19">{{ data.firstname + ' ' + data.lastname }} <br> {{ data.email }}</el-col>
    </el-row>
    <el-row class="user_row" v-if="type === 'anonymous' && !data.email">
      <el-col :span="5">{{ data.events ? Object.keys(data.events).length : 0 }}</el-col>
      <el-col :span="19">{{ id }}</el-col>
    </el-row>
  </div>
</template>

<script>
  import {db, fs} from "@/services/fireinit";

  export default {
    name: "UserListRow",
    props: {
      id: {type: String, required: true},
      data: {type: Object, required: true},
      type: {type: String, required: true}
    },
    data() {
      return {
        events: ''
      }
    },
    methods: {
      setWatchedUserId() {
        this.$store.commit('setWatchedUserId', this.id)
      }
    }
  }
</script>

<style scoped lang="scss">
  .user_row {
    font-size: 14px;
    transition: all .2s;
    display: flex;
    border: 1px solid $color-primary;
    border-radius: 30px;
    padding: 5px 15px;
    margin: 3px;
  }

  .user_row:hover {
    background: $color-primary;
    color: white;
    cursor: pointer;
  }

  .active_user {
    background: $color-primary;
    color: white;
    border-radius: 30px;
  }

  .event_count {
    padding-top: 9px;
    padding-left: 5px;
  }
</style>
