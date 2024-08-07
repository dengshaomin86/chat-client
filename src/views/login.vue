<template>
  <div class="login-con" @keyup.enter="enter" tabindex="1">
    <div class="form-con">
      <template v-if="type==='signIn'">
        <p class="title">sign in</p>
        <i class="iconfont icon-signup" @click="type='signUp'"></i>
        <el-form ref="signIn" :model="signIn">
          <el-form-item>
            <el-input v-model="signIn.username" placeholder="username" clearable maxLength="16"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="signIn.password" placeholder="password" clearable maxLength="16" type="password" show-password></el-input>
            <div class="tips">
              <a @click="err">forget?</a>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signInAction">Next</el-button>
          </el-form-item>
        </el-form>
      </template>

      <template v-else>
        <p class="title">sign up</p>
        <i class="iconfont icon-signin" @click="type='signIn'"></i>
        <el-form ref="signUp" :model="signUp">
          <el-form-item>
            <el-input v-model="signUp.username" placeholder="username" clearable maxLength="16" title="username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="signUp.password" placeholder="password" clearable maxLength="16" title="password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="signUp.cfPassword" placeholder="password" clearable maxLength="16" title="confirm password" type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signUpAction">Next</el-button>
          </el-form-item>
        </el-form>
      </template>
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  import apiUser from "@/api/user";
  import storage from "@/utils/storage";
  import {mapMutations} from "vuex";

  export default {
    name: "login",
    data() {
      return {
        type: "signIn",
        signIn: {
          username: "",
          password: ""
        },
        signUp: {
          username: "",
          password: "",
          cfPassword: ""
        }
      };
    },
    methods: {
      init() {
        this.$socket.disconnect();
        storage.local.removeUser();
        this.changeUserInfoVisible(false);
      },
      signInAction() {
        if (!this.signIn.username) return;
        // 使用 qs 库编码数据，以 application / x-www-form-urlencoded 格式发送数据
        apiUser.signIn(qs.stringify(this.signIn)).then(res => {
          this.$message.auto(res.data);
          if (!res.data.flag) return;
          this.connectSocket();
          this.setPersonal(res.data.user);
          Object.assign(this.$data.signIn, this.$options.data().signIn);
          this.$router.push("/");
        }).catch(e => {
        });
      },
      signUpAction() {
        if (!this.signUp.username) return;
        apiUser.signUp(qs.stringify(this.signUp)).then(res => {
          this.$message.auto(res.data);
          if (!res.data.flag) return;
          this.type = "signIn";
        }).catch(e => {
        });
      },
      enter() {
        this[`${this.type}Action`]();
      },
      connectSocket() {
        this.$socket.disconnect();
        this.$socket.connect();
      },
      err() {
        this.$message.error('暂未开放');
      },
      ...mapMutations(["setPersonal", "changeUserInfoVisible"])
    },
    created() {
    },
    mounted() {
      this.init();
    },
    watch: {
      type() {
        Object.assign(this.$data.signIn, this.$options.data().signIn);
        Object.assign(this.$data.signUp, this.$options.data().signUp);
      }
    }
  };
</script>

<style scoped lang="scss">
  .login-con {
    width: 100%;
    height: 100%;
    &:before, &:after {
      display: table;
      content: "";
    }
  }

  .form-con {
    width: 300px;
    margin: 200px auto 0;
    background-color: #fff;
    padding: 30px;
    position: relative;
    .title {
      text-transform: capitalize;
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .iconfont {
      font-size: 20px;
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
      &:hover {
        color: $--color-primary;
        transition: 0.2s;
      }
    }
    .tips {
      text-align: right;
      margin: 6px 0 0;
      line-height: normal;
      a {
        font-size: 12px;
        cursor: pointer;
        text-transform: uppercase;
        &:hover {
          color: $--color-primary;
          transition: 0.2s;
        }
      }
    }
    .el-button {
      width: 100%;
    }
  }

</style>
