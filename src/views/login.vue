<template>
  <div class="login-con" @keyup.enter="enter" tabindex="1">
    <div class="form-con">
      <template v-if="type==='signIn'">
        <p class="title">sign in</p>
        <i class="iconfont icon-zhuceyouli" @click="type='signUp'"></i>
        <el-form ref="signIn" :model="signIn">
          <el-form-item>
            <el-input v-model="signIn.username" placeholder="username" clearable maxLength="16"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="signIn.password" placeholder="password" clearable maxLength="16" type="password" show-password></el-input>
            <div class="tips">
              <a>forget?</a>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signInAction">Next</el-button>
          </el-form-item>
        </el-form>
      </template>

      <template v-else>
        <p class="title">sign up</p>
        <i class="iconfont icon-denglu" @click="type='signIn'"></i>
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
      },
      signInAction() {
        if (!this.signIn.username) return;
        axios.post("/user/signIn", this.signIn).then(res => {
          this.$message[res.data.flag ? "success" : "error"](res.data.message);
          if (!res.data.flag) return;
          this.$router.push("/");
          Object.assign(this.$data.signIn, this.$options.data().signIn);
        }).catch(err => {
          console.log(err);
        });
      },
      signUpAction() {
        if (!this.signUp.username) return;
        axios.post("/user/signUp", this.signUp).then(res => {
          this.$message[res.data.flag ? "success" : "error"](res.data.message);
          if (!res.data.flag) return;
          this.type = "signIn";
        }).catch(err => {
          console.log(err);
        });
      },
      enter() {
        this[`${this.type}Action`]();
      }
    },
    created() {
    },
    mounted() {
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
