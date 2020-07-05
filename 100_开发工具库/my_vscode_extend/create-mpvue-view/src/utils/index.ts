const fs = require('fs')
const path = require('path')
export const logger = (type: string, msg = '', vscode: any) => {
  switch (type) {
    case 'success':
      return vscode.window.setStatusBarMessage(`Success: ${msg}`, 5000);
    case 'warning':
      return vscode.window.showWarningMessage(`Warning: ${msg}`);
    case 'error':
      return vscode.window.showErrorMessage(`Failed: ${msg}`);
  }
}
export const recursionGetFile = (catalog_path: string, file_name: string): Promise<unknown> => {
  return new Promise((resolve) => {
    // 递归调用
    function recursion(app_path: string) {
      const currentPath = path.resolve(app_path, file_name)
      if (currentPath.length == (3 + file_name.length)) { return resolve(false) }
      // 该文件是否存在 
      fs.access(currentPath, function (err: object) {
        if (!err) {
          // 文件存在读取该文件
          fs.readFile(currentPath, (err: unknown, data: string) => {
            if (!err) { resolve({ path: currentPath, data: data.toString() }) }
            else { resolve(false) }
          })
        } else { recursion(path.resolve(app_path, '../')) }
      });
    }
    recursion(catalog_path)
  })
}