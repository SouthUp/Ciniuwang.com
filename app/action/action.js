export default {
  setSize(width, height) {
    return {
      type: 'SET_SIZE',
      width, height
    }
  },

  setScroll(scrollTop) {
    return {
      type: 'SET_SCROLL',
      scrollTop
    }
  },

  openMenu() {
    return {
      type: 'OPEN_MENU'
    }
  },

  closeMenu() {
    return {
      type: 'CLOSE_MENU'
    }
  },

  setTutorial(part, line) {
    return {
      type: 'SET_TUTORIAL',
      part, line
    }
  },

  setUser(user) {
    return {
      type: 'SET_USER',
      user
    }
  },

  updateUser(user) {
    return {
      type: 'UPDATE_USER',
      user
    }
  },

  loginOut() {
    return {
      type: 'LOGIN_OUT'
    }
  }
}