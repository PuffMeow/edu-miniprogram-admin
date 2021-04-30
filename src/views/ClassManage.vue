<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">
      分类{{ id ? '更新' : '管理' }}
    </h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="一级分类">
        <el-input v-model="classificationName" />
      </el-form-item>
      <el-form-item
        label="标签"
        v-for="(tag, index) in tagBeansList"
        :key="tag.tagId"
      >
        <el-input
          style="width: 200px"
          show-word-limit
          maxlength="15"
          v-model="tag.tagName"
        />
        <el-button
          type="danger"
          size="mini"
          style="margin-left: 30px"
          @click="handleDeleteTag(index)"
          >删除该标签</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAddTag">增加标签</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addClassification } from '@/service/api'
import { message } from '../utils/utils'
export default {
  props: {
    id: String,
  },
  data() {
    return {
      classificationId: '',
      classificationName: '',
      tagBeansList: [
        {
          tagName: '',
          tagId: Date.now(),
        },
      ],
    }
  },
  created() {
    if (!this.id) {
      return
    }
  },
  methods: {
    async onSubmit() {
      const res = await addClassification(
        this.classificationId,
        this.classificationName,
        this.tagBeansList
      )
      console.log(res)
      if (res.data.code === 200) {
        this.classificationId = ''
        this.classificationName = ''
        this.tagBeansList = []
      }
    },

    handleAddTag() {
      this.tagBeansList.push({
        tagName: '',
        tagId: Date.now(),
      })
    },

    handleDeleteTag(idx) {
      this.tagBeansList.splice(idx, 1)
    },
  },
}
</script>

<style>
</style>