<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">分类列表</h1>

    <el-table :data="tableData">
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="一级分类" prop="title"></el-table-column>
      <el-table-column label="对应标签" prop="type"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
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
import { getClassification } from '@/service/api'

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
      const res = await getClassification()
      console.log(res)
    },

    handleEdit(index, row) {},
    async handleDelete(index, { videoTemplateId }) {
      console.log(index, videoTemplateId)
      try {
        await this.$confirm(`此操作将永久删除当前模板, 是否继续? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })

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
