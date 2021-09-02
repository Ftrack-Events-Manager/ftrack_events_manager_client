import {router} from "umi";

export default {
  namespace: 'detail',
  state: {},
  subscriptions: {
    setup({history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/detail') {
          router.push('/')
        }
      })
    }
  }
}
