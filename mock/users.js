import jwt from 'jwt-simple'

const jwtSecret = 'ftrack events manager'

export default {
  'POST /api/users/login': (req, res) => {
    const {username, password} = req.body
    if (username === 'admin' && password === '123456') {
      return res.send({
        status: 'success',
        msg: "登录成功",
        token: jwt.encode({
          userId: "admin",
          type: "0"
        }, jwtSecret)
      })
    }
    return res.send({
      status: 'error',
      msg: "账号或密码错误",
    })
  }
}
