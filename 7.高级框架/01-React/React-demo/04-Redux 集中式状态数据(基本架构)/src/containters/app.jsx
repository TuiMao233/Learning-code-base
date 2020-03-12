//! 6.定义react-redux接口组件容器
//!     该容器用来包装Counter组件(主组件)，
//!         并向其传入redux通知函数，与store
//? 引入连接函数
import { connect } from 'react-redux'
//? 引入 action 通知改变方法
import { inCrement, inCrementAsync } from '../redux/actions'
//? 引入主组件
import Counter from '../components/counter'
//? 向外暴露连接 App 组件的包装组件
export default connect(
    state => ({ count: state }),
    { inCrement, inCrementAsync }
)(Counter)