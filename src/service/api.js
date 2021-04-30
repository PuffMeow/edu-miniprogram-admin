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

//新增一篇文章
export function addArtical() {
  return request.get(`/article/addArticle`)
}

/**
 * 新增分类
 * 
 * @param {String} classificationId 传空字符是新增，传id是更新
 * @param {String} classificationName 一级分类名称
 * @param {Array} tagBeansList 标签数组
 * @returns 
 */
export function addClassification(classificationId, classificationName, tagBeansList) {
  return request.post(`/classification/addClassificationAndTags`, {
    classificationId,
    classificationName,
    tagBeansList
  })
}

/**
 * 查询分类
 * 
 * @param {String} classificationId 分类的id
 */
export function getClassification(classificationId) {
  const queryAll = classificationId ? `/${classificationId}` : ''
  return request.get(`/classification/listAllCategories${queryAll}`)
}