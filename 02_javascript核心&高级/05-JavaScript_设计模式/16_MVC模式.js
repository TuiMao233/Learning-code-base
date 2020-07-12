/* 
MVC全名是Model View Controller，
是模型(model)－视图(view)－控制器(controller)的缩写，
一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，
将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，
不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、
处理和输出功能在一个逻辑的图形化用户界面的结构中。
*/
class MVC {
  // 创建数据模型
  model = (function (context) {
    const data = {
      sidebar: [
        { title: 'sixx', href: './a.html' },
        { title: 'sixx', href: './a.html' },
        { title: 'sixx', href: './a.html' }
      ]
    }
    return {
      getData: function (key) {
        return data[key]
      },
      setData: function (key, value) {
        data[key] = value
        context.view('createSidebar')
      }
    }
  })(this)
  // 创建视图模型
  view = (function (context) {
    const model = context.model
    const view = {
      createSidebar: function () {
        const data = model.getData('sidebar')
        const html = `
<div #id='#sidebar'>
${data.reduce((total, item) => {
          return total += `<a href='${item.href}'>${item.title}</a>`
        }, '')}
</div>`
        console.log(html)
      }
    }
    return v => view[v]()
  })(this)
  // 创建控制器模型
  ctrl = (function (context) {
    const model = context.model
    const view = context.view
    const ctrl = {
      initSideBar: function () {
        view('createSidebar')
      },
      updataSideBar: function () {
        model.setData('sidebar', [{ title: '', href: '' }])
      }
    }
    return ctrl
  })(this)
}

const mvc = new MVC()
// 视图->数据模型->更新
mvc.view('createSidebar')
// 控制器->数据模型->视图->更新
mvc.ctrl.updataSideBar()

/* 
MVVM是Model-View-ViewModel的简写。它本质上就是MVC 的改进版。
MVVM 就是将其中的View 的状态和行为抽象化，
让我们将视图 UI 和业务逻辑分开。
当然这些事 ViewModel 已经帮我们做了，
它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。
 */

class MVVM {
  view = {

  }
  viewModel = {

  }
  model = {

  }
}