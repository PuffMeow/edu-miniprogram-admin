<template>
  <div>
    <h1 style="margin-bottom: 2rem; font-size: 1.5rem">轮播图上传</h1>
    <el-form ref="form" label-width="80px">
      <el-form-item label="轮播图">
        <el-upload
          :action="$axios.defaults.baseURL + '/file/upload'"
          :file-list="list"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          list-type="picture"
        >
          <el-button size="small" ref="my-upload">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getSwiper, uploadSwiper, deleteSwiper } from '@/service/api'
import message from '../utils/message'
export default {
  data() {
    return {
      list: [],
      photoIds: [],
    }
  },
  async mounted() {
    const res = await getSwiper()
    console.log(res)
    let arr = res.data.data
    arr.forEach((item, i) => {
      this.list.push({
        name: item.arouselId,
        url: item.imageUrl,
        id: item.arouselId,
      })
    })
  },
  methods: {
    async onSubmit() {
      if (!this.photoIds.length) {
        message('error', '请先上传图片再保存')
        return
      }
      const res = await uploadSwiper(this.photoIds)
      console.log(res)
      message('success', '保存成功')
    },
    async handleRemove(file) {
      console.log(file)
      const res = await deleteSwiper(file.id)
      console.log(res)
    },
    handleSuccess(response, file, fileList) {
      console.log(response)
      console.log(fileList)
      this.photoIds.push(response.data.fileId)
      console.log(this.photoIds)
      // this.model.swiper.push({
      //   name: response.originalname,
      //   url: response.url,
      // })
    },
  },
}
</script>
