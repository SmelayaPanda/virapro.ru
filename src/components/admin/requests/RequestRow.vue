<template>
  <el-card>
    <el-row v-if="request" id="request_row">
      <el-col style="width: 56px">
        <el-button
          :icon="openInfo ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          circle plain @click="openInfo = !openInfo">
        </el-button>
      </el-col>
      <el-col style="width: 240px">
        <el-tag type="success" size="small">{{ request.date | date }}</el-tag>
      </el-col>
      <el-col :span="1">
        <img v-if="request.service" src="~/assets/icons/admin/round_red.svg" alt="">
        <img v-else src="~/assets/icons/admin/round_green.svg" alt="">
      </el-col>
      <el-col :span="10">
        {{ request.user.firstname }}
      </el-col>
      <el-col :span="8">
        {{ request.user.phone }}
      </el-col>
      <el-col style="width: 60px;">
        <UpdateRequest :requestId="request.id"/>
      </el-col>
    </el-row>
    <el-row v-if="openInfo" id="expand_description">
      <el-col :span="24">
        <span class="prop_name">ИД запроса: </span>
        <el-tag type="success" size="small">{{ request.id }}</el-tag>
        <br>
        <span class="prop_name">ИД пользователя: </span>
        <el-tag type="success" size="small">{{ request.user.id }}</el-tag>
      </el-col>
      <el-col :span="24" v-if="request.service" class="service_wrap">
        Заказ услуги: <el-tag type="primary">
        {{ $store.getters.SERVICE_TYPES[request.service] ?
        $store.getters.SERVICE_TYPES[request.service].title : 'error' }}</el-tag>
      </el-col>
      <el-col :span="24" id="request_text">
        <h4>Комментарии:</h4>
        <p v-if="request.comments.user">
          <el-tag type="success" size="small">Пользователя:</el-tag>
          {{ request.comments.user }}
        </p>
        <p v-if="request.comments.admin">
          <el-tag type="success" size="small">Ваш:</el-tag>
          <span v-html="request.comments.admin"></span>
        </p>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import UpdateRequest from './UpdateRequest'

  export default {
    name: 'RequestRow',
    components: {UpdateRequest},
    props: {
      request: {type: Object, required: true}
    },
    data() {
      return {
        openInfo: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #expand_description {
    margin-top: 20px;
    margin-left: 10px;
  }

  .prop_name {
    font-size: 14px;
    color: $color-info;
  }

  #request_text {
    margin-top: 10px;
    h4 {
      margin-bottom: 0;
    }
  }

  #request_row {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .service_wrap {
    margin-top: 20px;
  }
</style>
