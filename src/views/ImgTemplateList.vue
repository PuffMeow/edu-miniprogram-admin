<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">图片打卡模板列表</h1>

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
            :src="scope.row.imageUrl"
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
import { photoTemplateList, deleteTemplate } from '@/service/api'

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
      const res = await photoTemplateList()
      console.log(res)
      let list = res.data.data.photoTemplates
      list.forEach((item, i) => {
        item.createTime = item.createTime.replace('T', ' ')
      })
      this.total = res.data.data.total
      this.tableData = list
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push({
        path: `/imgTemplate/${row.photoTemplateId}`,
        query: {
          row,
        },
      })
    },
    async handleDelete(index, { photoTemplateId }) {
      console.log(index, photoTemplateId)
      try {
        await this.$confirm(`此操作将永久删除当前模板, 是否继续? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        const res = await deleteTemplate(photoTemplateId, 2)
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
