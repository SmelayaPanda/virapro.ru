<template>
  <div>
    <el-row type="flex">
      <el-col :span="12">
        <el-card>
          <el-row id="users_header">
            <el-col :span="8">
              <h4>Пользователи</h4>
            </el-col>
            <el-col :span="16">
              <el-radio-group fill="#67c23a" v-model="type" size="medium" id="user_type">
                <el-radio-button label="register">С аккаунтом</el-radio-button>
                <el-radio-button label="anonymous">Анонимные</el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <UserListRow id="123"></UserListRow>
        </el-card>
      </el-col>
      <el-col :span="12" style="margin-left: 10px;">
        <el-card>
          <h4>Действия</h4>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import UserListRow from "@/components/admin/users/UserListRow";

  export default {
    name: "index",
    components: {UserListRow},
    layout: 'admin',
    data() {
      return {
        type: 'register'
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  #users_list {
    width: 100%;
    height: 600px;
    overflow: scroll;
  }

  #user_type {
    text-align: center;
  }

  #users_header {
    display: flex;
    justify-content: start;
    align-items: center;
  }
</style>
