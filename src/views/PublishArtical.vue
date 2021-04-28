<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">
      文章{{ id ? '更新' : '发表' }}
    </h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          :action="$axios.defaults.baseURL + '/file/upload'"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="photoUrl" :src="photoUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input
          type="text"
          show-word-limit
          v-model="title"
          placeholder="请输入文章的标题"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="一级分类">
        <el-dropdown :hide-on-click="false" split-button>
          <span class="el-dropdown-link">分类列表</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>前端</el-dropdown-item>
            <el-dropdown-item>后端</el-dropdown-item>
            <el-dropdown-item>计算机科普</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
      <el-form-item label="文章标签">
        <el-checkbox-group v-model="tagList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文章内容">
        <mavon-editor v-model="content" />
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
  props: {
    id: { type: String },
  },
  data() {
    return {
      imageId: '',
      photoUrl: '',
      typeName: '',
      title: '',
      content: '',
      tagList: [],
    }
  },
  created() {
    //如果有传id过来那就是更新操作
    if (this.id) {
      let row = this.$route.query.row
      this.imageId = row.photoTemplateId
      this.photoUrl = row.imageUrl
      this.typeName = row.type
      this.title = row.title
    }
  },
  methods: {
    async onSubmit() {
      if (!this.imageId || !this.typeName || !this.title) {
        message('warning', '请先将数据完善再保存')
        return
      }

      if (this.id) {
        //点击保存执行更新操作
        let updateObj = {
          photoUrl: this.photoUrl,
          title: this.title,
          type: this.typeName,
          photoTemplateId: this.imageId,
        }
        const res = await updateTemplate(2, updateObj)
        console.log(res)
        this.$router.push('/imgTemplateList')
      } else {
        //否则执行上传操作
        const res = await addPhotoTemplate(
          this.imageId,
          this.title,
          this.typeName
        )
        console.log(res)
      }
      message('success', '保存成功')
      this.imageId = ''
      this.photoUrl = ''
      this.typeName = ''
      this.title = ''
    },

    handleSuccess(res, file, fileList) {
      console.log(res)

      if (this.id) {
        this.photoUrl = res.data.photo.link
      } else {
        //这里是上传新模板的操作
        this.imageId = res.data.fileId
        this.photoUrl = res.data.photo.link
      }
    },

    async deleteTemplate(item, index) {
      const res = await deleteTemplate()
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 110px;
  height: 110px;
  display: block;
}
</style>