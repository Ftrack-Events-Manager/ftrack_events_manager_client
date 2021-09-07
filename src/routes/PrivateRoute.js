import {router} from "umi";

export default ({children, match, route}) => {
  if (!localStorage.username && match.path !== '/login') {
    router.push('/login')
  }

  if (localStorage.username && match.path === '/login') {
    router.push('/')
  }

  // 权限不够就返回主页
  if (route.authority && localStorage.authority && !route.authority.includes(localStorage.authority)) {
    router.push('/')
  }

  return children
}
