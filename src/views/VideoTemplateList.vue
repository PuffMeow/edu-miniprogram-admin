<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">视频打卡模板列表</h1>

    <el-table :data="tableData">
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板图片">
        <template slot-scope="scope">
          <img
            style="width: 110px; height: 110px"
            :src="scope.row.photoUrl"
            alt="模板图"
          />
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="分类" prop="type"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >更新</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { videoTemplateList, deleteTemplate } from '@/service/api'

export default {
  data() {
    return {
      tableData: [],
      total: 0,
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await videoTemplateList()
      let list = res.data.data.videoTemplates
      list.forEach((item, i) => {
        item.createTime = item.createTime.replace('T', ' ')
      })
      this.total = res.data.data.total
      this.tableData = list
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push({
        path: `/videoTemplate/${row.videoTemplateId}`,
        query: {
          row,
        },
      })
    },
    async handleDelete(index, { videoTemplateId }) {
      console.log(index, videoTemplateId)
      try {
        await this.$confirm(`此操作将永久删除当前模板, 是否继续? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        const res = await deleteTemplate(videoTemplateId, 1)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        this.fetch()
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
