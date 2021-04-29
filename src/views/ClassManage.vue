<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">分类管理</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="一级分类">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="typeName" />
      </el-form-item>
      <el-form-item>
        <el-button>增加标签</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {} from '@/service/api'
import { message } from '../utils/utils'
export default {
  data() {
    return {
      imageId: '',
      photoUrl: '',
      typeName: '',
      title: '',
    }
  },
  created() {},
  methods: {},
}
</script>

<style>
</style>