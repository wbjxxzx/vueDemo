import Mock from 'mockjs'
import {Random} from 'mockjs'
import { param2Obj } from '@/utils'

// import Mock from 'mockjs' //引入mockjs，npm已安装
// import { Random } from 'mockjs' // 引入random对象,随机生成数据的对象，（与占位符@一样）
// Mock.setup({
//     timeout:1000  //设置请求延时时间
// })
// const getdata = function(option){ //定义请求数据方法
//     let datalist = []
//     for (let i = 0; i < 20; i += 1) {
//       const o = {  //mockjs模拟随机生成数据，生成20条
//        recipeId: Random.guid(),
//        billId: Random.string(10),
//        orgId: Random.string('number', 8, 10),
//        Date:Random.date('yyyy-MM-dd'),
//        time:Random.time('A HH:mm:ss'),
//        adress:Random.county(),
//        viewName: Random.cword(4, 16), // 随机生成任意名称
//        personName: Random.cname(),
//        reason: Random.csentence(10, 32),
//       }
//       datalist.push(o)
//      }
//     return{
//         data:datalist
//     }
// }
// Mock.mock('/user', /post|get/i,getdata) //调用模拟数据方法


const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    reviewer: Random.cname(),
    name: Random.csentence(5, 9),
    uid: Random.integer(10000, 20000),
    desc: Random.csentence(10, 20),
    iconUrl: Random.dataImage('300x250', 'mock的图片'),
    articleId: Random.guid(),
    createAt: new Date().getTime()
  }))
}

export default {
  getList: config => {
    const { name, uid, desc, articleId, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (uid && item.uid !== +uid) return false
      if (desc && item.desc !== +desc) return false
      if (articleId && item.articleId !== +articleId) return false
      if (name && item.name.indexOf(name) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: (config) => {
    const { id } = param2Obj(config.url)
    data: 'success'
  },
  deleteArticle: (config) => {
    const { id } = param2Obj(config.url)
    data: 'success'
  },
}
