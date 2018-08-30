import React from 'react'
import { connect } from 'react-redux'
import Search from './search'
import css from 'Css2/nav2'
import { Link } from 'react-router-dom'


class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let incomingIndex = this.props.index
    let { data } = this.props.search
    let logoStyle = {}
    if (data) logoStyle = { cursor: 'pointer'}
    let isLogin = false
    if (this.props.view.user) isLogin = true
    let { toggle } = this.props.search
    let fontStyle = { color: 'rgba(0, 0, 0, 87)' }
    return (
      <div className={css.frame} style={toggle?{}:{marginTop: '30px'}}>
        <nav>
          <ul>
            {toggle?(
              <li style={incomingIndex == 0?fontStyle:{}}><Link to={'/'}>在线查词</Link></li>
            ): (
              <li><Search style={logoStyle}/></li>
            )}
            <li style={incomingIndex == 1?fontStyle:{}}><Link to={'/download'}>客户端下载</Link></li>
          </ul>

          <ul>
            {isLogin ? (
              <li>
                <img src={require('Image3/3.png')} alt="" />
                <Link to='/person' style={incomingIndex == 3?fontStyle:{}}>个人中心</Link>
              </li>
            ) : (
                <li>
                  <img src={require('Image3/3.png')} alt="" />
                  <Link to='/login'>登录</Link>
                  <span>|</span>
                  <Link to='/register'>注册</Link>
                </li>
              )
            }

            <li style={{display: 'none'}}>
              <img src={require('Image3/7.png')} alt="" />
              <span style={{ cursor: 'pointer' }} onClick={this.fav.bind(this)}>收藏本站</span>
            </li>
          </ul>


        </nav>

      </div>
    )
  }

  fav() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) { alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！"); }
    else if (ua.indexOf("msie 8") > -1) {
      window.external.AddToFavoritesBar(url, title);
    }
    else if (document.all) { 
      try { window.external.addFavorite(url, title); } 
      catch (e) { alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!'); } } 
    else if (window.sidebar) { window.sidebar.addPanel(title, url, ""); } 
    else { alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!'); }
  }
}


const mapStateToProps = state => {
  return {
    view: state.view,
    search: state.search
  }
}

export default connect(mapStateToProps)(Navigation)