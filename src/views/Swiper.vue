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
          :on-success="(response, file) => handleSuccess(response, file, index)"
        >
          <img v-if="option.imgUrl" :src="option.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input
          placeholder="点击轮播图跳转的路径，若不需跳转，则不需要填写此项"
          v-model="option.routingAddress"
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
        <el-button @click="handleAddSwiper">添加轮播图</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { uploadSwiper, getAllSwiper, deleteSwiper } from '@/service/api'
import { message } from '../utils/utils'
export default {
  data() {
    return {
      swiperOptions: [],
    }
  },
  async mounted() {
    const res = await getAllSwiper()
    const data = res.data.data
    const swiperOptions = []
    data.forEach((item) => {
      swiperOptions.push({
        imgUrl: item.carouselUrl,
        carouselId: item.carouselId,
        fileId: item.fileId,
        routingAddress: item.routingAddress,
        key: item.carouselId,
      })
    })
    this.swiperOptions = swiperOptions
  },
  methods: {
    async onSubmit() {
      const carouselReqs = []
      this.swiperOptions.forEach((item) => {
        carouselReqs.push({
          fileId: item.fileId,
          carouselId: item.carouselId,
          routingAddress: item.routingAddress,
        })
      })
      const res = await uploadSwiper(carouselReqs)
      if (res.data.code === 200) {
        message('success', '上传轮播图成功')
      }
    },

    handleSuccess(response, file, idx) {
      if (response.code === 200) {
        const data = response.data
        this.swiperOptions[idx].imgUrl = data.fileLink
        this.swiperOptions[idx].fileId = data.fileId
        message('success', '图片上传成功')
      }
    },

    handleAddSwiper() {
      if (this.swiperOptions.length > 6) {
        message('warning', '最多只能上传六张轮播图')
        return
      }
      this.swiperOptions.push({
        imgUrl: '',
        routingAddress: '',
        key: Date.now(),
      })
    },

    async handleRemoveOption(idx) {
      if (this.swiperOptions.length === 1) {
        message('warning', '至少要有一张轮播图')
        return
      }
      const carouselId = this.swiperOptions[idx].carouselId
      this.swiperOptions.splice(idx, 1)
      try {
        const res = await deleteSwiper(carouselId)
        if (res.data.code === 200) {
          message('success', '删除成功')
        } else {
          message('error', '删除失败')
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>

<style scoped>
.avatar-uploader-icon {
  width: 200px;
  height: 120px;
  line-height: 120px;
}
.avatar {
  width: 200px;
  height: 120px;
  display: block;
}
</style>
