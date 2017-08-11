const app = getApp()

Page({
  data: {
    helpStatus: false,
    username: '',
    password: '',
  },
  onInput (e) {
    const type = e.target.dataset.type
    this.setState({
      [type]: e.detail.value
    })
  },
  login () {
    const username = this.data.username
    const password = this.data.password
    if(!username || !password) {
      return wx.showModal({
        title: '错误',
        content: '账号以及密码不能为空',
        showCancel: false
      })
    }

    app.fetch({
      url: app.API('login'),
      data: {
        username,
        password
      },
      showError: true,
      method: 'POST',
      success: (res) => {
        const data = res.data.data
        const token = data.token
        const userInfo = data.user
        app.$store.setFieldState('common', {
          token,
          userInfo
        })
        wx.showToast({
          duration: 2000,
          title: '登录成功'
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        },2000)
      }
    })
  },
  onLoad () {
    let _this = this
    app.$store.connect(this, 'login')
  },
  showHelp() {
    this.setState({
      helpStatus: true
    })
  },
  hideHelp() {
    this.setState({
      helpStatus: false
    })
  }
})
