<template>
  <div>
    <el-container>
      <el-aside
        width="200px"
        style="background-color: rgb(238, 241, 246); height: 100vh"
      >
        <el-menu
          unique-opened
          :default-openeds="defaultOpened"
          :default-active="$route.path"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>
              管理系统
            </template>
            <el-menu-item-group>
              <template slot="title">主页</template>
              <el-menu-item index="/swiper">轮播图</el-menu-item>
              <el-menu-item index="/videoTemplate">视频打卡模板</el-menu-item>
              <el-menu-item index="/videoTemplateList"
                >视频打卡模板列表</el-menu-item
              >
              <el-menu-item index="/imgTemplate">图片打卡模板</el-menu-item>
              <el-menu-item index="/imgTemplateList"
                >图片打卡模板列表</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="height: 100vh">
          <div class="userBox">
            <span>您来啦~{{ username }}</span>
            <el-dropdown @command="onExit">
              <i class="el-icon-setting" style="margin-left: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <transition name="slide-fade">
            <router-view :key="$route.path" />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { logout } from '@/service/api'
export default {
  data() {
    return { defaultOpened: ['1'], username: localStorage.username }
  },

  methods: {
    userDrop() {
      console.log('userd')
    },
    async onExit() {
      // console.log('exit')
      await logout()
      localStorage.removeItem('username')
      this.$router.push({ path: '/login', replace: true })
      this.$message({
        type: 'success',
        message: '退出登录成功',
      })
    },
  },
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-20px);
  opacity: 0;
}

.userBox {
  float: right;
  font-size: 0.8rem;
  color: #666;
}

.el-icon-setting:hover {
  cursor: pointer;
}
</style>
