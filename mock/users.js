export default {
  'POST /api/users/login': (req, res) => {
    const {username, password} = req.body
    if (username === 'admin' && password === '123456') {
      return res.send({
        status: 'success',
        msg: "登录成功",
        token: {
          userId: "admin",
          type: 0
        }
      })
    }
    return res.send({
      status: 'error',
      msg: "账号或密码错误",
    })
  }
}
