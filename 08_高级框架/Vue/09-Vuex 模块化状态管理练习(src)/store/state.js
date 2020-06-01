export default {
  Task: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
}
