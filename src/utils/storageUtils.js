/* 
操作storage数据的工具函数模块
*/
import UUID from 'uuidjs'

/* 
获取UUID值
  将生成的UUID保存到localStorage中
  读取从localStorage中读取
*/
// const USER_INFO_KEY = 'user_info_key'
// export function saveUserInfo (user) {
//   store.set(USER_INFO_KEY, user)
// }
export function getUUID() {
  // 从localStorage中读取
  let uuid = localStorage.getItem('UUID_KEY')
  // 如果没有, 生成一个新的, 并保存到localStorage
  if (!uuid) {
    uuid = UUID.generate() // da0450cb-3984-49af-880d-00c5745796b5
    localStorage.setItem('UUID_KEY', uuid)  
  }

  return uuid
}