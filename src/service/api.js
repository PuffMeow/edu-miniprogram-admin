import request from './http'

//登录
export function login(username, password) {
  return request.post(`/admin/user/login`, {
    username,
    password
  })
}

//退出登录
export function logout() {
  return request.get(`/admin/user/signOut`)
}

//上传文件
export function uploadFile(file) {
  return request.post(`/file/upload`, { file })
}

/**
 * 上传轮播图
 * 先调用上传图片接口获取文件 ID
 * @param  swiperOptions 轮播图选项
 */
export function uploadSwiper(carouselReqs) {
  return request.post(`/admin/carousel/uploadCarousel`, {
    carouselReqs
  })
}

//删除轮播图
//carouselId-轮播图 ID
export function deleteSwiper(carouselId) {
  return request.delete(`/admin/carousel/deleteCarousel/${carouselId}`)
}

//获取轮播图
export function getAllSwiper() {
  return request.get(`/admin/carousel/listAllCarousels`)
}

//上传图片打卡模板
/**
 * @param {在上传图片时返回的图片 ID} imageId 
 * @param {模板标题} title 
 * @param {模板分类} typeName 
 */
export function addPhotoTemplate(imageId, title, typeName) {
  return request.post(`/admin/template/addPhotoTemplate`, { imageId, title, typeName })
}


//获取所有的视频打卡模板
export function videoTemplateList() {
  return request.get(`/admin/template/listAllVideoTemplates`)
}

//获取所有的照片打卡模板
export function photoTemplateList() {
  return request.get(`/admin/template/listAllPhotoTemplates`)
}


//更新模板
//templateType 1-视频 2-图片
export function updateTemplate(templateType, updateObj) {
  let templateObj
  if (templateType === 1) {
    templateObj = {
      videoTemplate: updateObj
    }
  } else if (templateType === 2) {
    templateObj = {
      photoTemplate: updateObj
    }
  }
  return request.put(`/admin/template/updateTemplate/${templateType}`, templateObj)
}

//删除模板
/**
 * @param {模板ID} templateId
 * @param {模板类型，视频模板1，图片模板2} templateType
 */
export function deleteTemplate(templateId, templateType) {
  return request.delete(`admin/template/deleteTemplate/${templateId}/${templateType}`)
}
