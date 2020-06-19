<template>
  <div class="user-info">
    <el-page-header @back="back" content="用户详情"></el-page-header>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input :value="form.username" readonly></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex" :disabled="readonly">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
          <el-radio label="0">保密</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好">
        <el-input v-model="form.hobby" :readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item label="加入时间">
        <el-input :value="getDate(form.createDate)" readonly></el-input>
      </el-form-item>
      <el-form-item>
        <template v-if="isSelf">
          <el-button @click="edit" v-if="readonly">编辑</el-button>
          <template v-else>
            <el-button @click="cancel">取消</el-button>
            <el-button @click="save" type="primary">保存</el-button>
          </template>
        </template>
        <el-button v-else>添加好友</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import _ from "lodash";
  import qs from "qs";
  import moment from "moment";

  export default {
    name: "user-info",
    data() {
      return {
        readonly: true,
        userInfo: {}, // 备份信息
        form: {
          username: "username",
          nickname: "nickname",
          sex: "0",
          hobby: "hobby",
          createDate: "createDate"
        }
      };
    },
    methods: {
      init() {
        this.getInfo();
      },
      back() {
        this.$router.back();
      },
      getDate(data) {
        data = Number(data);
        return moment(Number(data)).format('YYYY/MM/DD, HH:mm:ss');
      },
      getInfo() {
        axios.get("/user/getInfo").then(res => {
          if (!res.data.flag) {
            this.$message.error(res.data.message);
            return;
          }
          this.form = res.data.data;
          this.userInfo = JSON.parse(JSON.stringify(this.form));
        }).catch(err => {
          console.log(err);
        });
      },
      edit() {
        this.readonly = false;
      },
      cancel() {
        this.readonly = true;
        this.form = JSON.parse(JSON.stringify(this.userInfo));
      },
      save() {
        this.readonly = true;
        const data = _.pick(this.form, ["username", "nickname", "sex", "hobby"]);
        axios.post("/user/update", qs.stringify(data)).then(res => {
          this.$message[res.data.flag ? "success" : "error"](res.data.message);
        }).catch(err => {
          console.log(err);
        });
      }
    },
    mounted() {
      this.init();
    },
    computed: {
      isSelf() {
        const username = sessionStorage.getItem("username");
        return username === this.userInfo.username;
      }
    }
  };
</script>

<style scoped lang="scss">
  .user-info {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 10px 30px;

    .el-page-header {
      margin-bottom: 10px;
    }

    .el-form {
      width: 500px;

      .el-icon-edit {
        cursor: pointer;
      }

      .el-radio-group + .el-icon-edit {
        margin-left: 30px;
        color: #C0C4CC;
      }
    }
  }

</style>
