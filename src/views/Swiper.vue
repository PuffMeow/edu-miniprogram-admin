<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">轮播图上传</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item
        v-for="(option, index) in swiperOptions"
        :label="'轮播图 ' + (index + 1)"
        :key="option.key"
      >
        <el-upload
          class="avatar-uploader"
          :action="$axios.defaults.baseURL + '/file/upload'"
          :show-file-list="false"
          :on-success="handleSuccess"
        >
          <img v-if="option.imgUrl" :src="option.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input
          placeholder="点击轮播图跳转的路径，若不需跳转，则不需要填写此项"
          v-model="option.routeUrl"
        ></el-input>
        <el-button
          style="margin-top: 12px"
          type="danger"
          size="small"
          @click="handleRemoveOption(index)"
          >删除该项</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button @click="handleAddSwiper">继续添加轮播图</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getSwiper, uploadSwiper, deleteSwiper } from '@/service/api'
import { message } from '../utils/utils'
export default {
  data() {
    return {
      photoIds: [],
      swiperOptions: [
        {
          imgUrl: '',
          routeUrl: '',
          key: Date.now(),
        },
      ],
    }
  },
  async mounted() {
    const res = await getSwiper()
  },
  methods: {
    async onSubmit() {
      const res = await uploadSwiper(this.photoIds)
      console.log(res)
      message('success', '保存成功')
    },

    async handleRemove(file) {
      console.log(file)
      const res = await deleteSwiper(file.id)
      console.log(res)
    },

    handleSuccess(response, file) {
      console.log(response)
      console.log(file)
    },

    handleAddSwiper() {
      this.swiperOptions.push({
        imgUrl: '',
        routeUrl: '',
        key: Date.now(),
      })
    },

    handleRemoveOption(idx) {
      if (this.swiperOptions.length === 1) {
        message('warning', '至少要有一张轮播图')
        return
      }
      this.swiperOptions.splice(idx, 1)
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
