<template>
<div class="home-contanier">
<el-container>
  <el-header>
      <img src="../assets/images/logo.png" >
      <h3>电商后台管理系统</h3>
       <el-button type="info" @click="loginOut">退出</el-button>
  </el-header>
  <el-container>

    <el-aside :style="{width:isCollapse? '65px':'200px'}" >
        <div class="sllobox" @click="isCollapse=!isCollapse">|||</div>
<el-row class="tac">
    <el-menu :router="true" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false"
      default-active="1"
      class="el-menu-vertical-demo"

      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu :index="(i+1).toString()" v-for="(item,i) in menuList" :key="item.id" :style="{width:isCollapse? '65px':'200px'}">
        <template slot="title">
          <i :class="['iconfont',iconList[i]]" ></i>
          <span style="margin-left:10px; font-size:13px">{{item.authName}}</span>
        </template>
        <el-menu-item-group v-for="iteminner in item.children" :key="iteminner.id">

          <el-menu-item :index="iteminner.path" style="font-size:13px">
             <i class="el-icon-menu"></i>
              {{iteminner.authName}}</el-menu-item>

        </el-menu-item-group>

      </el-submenu>
    </el-menu>
</el-row>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
<!-- 根容器 -->

</template>

<script>
import mix from './Home-mixins'
export default {
  mixins: [mix]
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  background-color: #373d41;
  height: 60px;

  img {
    float: left;
  }
  h3 {
    user-select: none;
    font-weight: 200;
    font-size: 19px;
    float: left;
    color: #fff;
    margin-left: 15px;
  }
  .el-button {
    float: right;
    margin: 10px 20px 0 0;
  }
}
.el-container,
.home-contanier {
  height: 100%;
}
.el-aside {
  background-color: #333744;
  height: 100%;
}
.sllobox {
  background-color: #4a5064;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ccc;
  user-select: none;
  letter-spacing: 0.3em;
  font-size: 12px;
  &:hover {
    cursor: pointer;
    color: #fff;
  }
}
</style>
