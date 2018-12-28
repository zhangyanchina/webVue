<template>
  <div class="login-container">
    <div class="box-card">
      <!-- logo部分 -->
      <div class="logo">
        <img src="../assets/logo.png">
      </div>

      <!-- 登陆框 -->
      <el-form :model="userForm" :rules="userRules" ref="userRuleForm" >
        <!-- 用户名 -->
        <el-form-item  prop="username">
          <el-input v-model="userForm.username" placeholder="登陆名称"> <i slot="prefix" class="el-input__icon iconfont icon-user "></i></el-input>
        </el-form-item>
        <!-- 密码 -->
         <el-form-item  prop="password">
          <el-input :type="isPwd? 'password':'text'" v-model="userForm.password" placeholder="登陆密码" prop="password"> <i slot="prefix" :class="['el-input__icon','iconfont',isPwd? 'icon-3702mima':'icon-showpassword']" @click="isPwd=!isPwd"></i></el-input>
         </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="24">
           <el-button type="primary" @click="login">登陆</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
        </el-col>
      </el-row>
      <!-- 下面按钮 -->

</div>
  </div>
</template>
<script>
import mix from './Login-mixins'
export default {
  mixins: [mix]
}
</script>
<style lang="less" scope>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  .box-card {
    width: 390px;
    height: 304px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 10px;
    padding: 0 30px;
    .logo {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      padding: 10px;
      border: 1px solid #eee;
      position: relative;
      top: -54px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background-color: #fff;
      > img {
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}
.el-form {
  margin-top: -30px;
}
.el-col {
  display: flex;
  justify-content: flex-end;
}

.icon-3702mima,
.icon-showpassword {
  cursor: pointer;
  transition: all 0.8s ease;
  &:hover {
    color: darkred;
  }
}
</style>
