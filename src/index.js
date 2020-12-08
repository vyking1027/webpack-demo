import _ from 'lodash';  //index.js 显式要求引入的 lodash 必须存在，然后将它绑定为 _（没有全局作用域污染）

function component() {
  var element = document.createElement('div');

  // 现在，由于通过打包来合成脚本，我们必须更新 index.html 文件。因为现在是通过 import 引入 lodash，所以将 lodash <script> 删除，然后修改另一个 <script> 标签来加载 bundle，而不是原始的 /src 文件：dist/index.html
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());