// 接口主文件, 定义接口并向外暴露
import axios from "./axios";
// 请求登录
export const reqLogin = (email, password) => axios.post('/login', { email, password })
// 请求注册
export const reqRegister = (name, email, password) => axios.post('/register', { name, email, password })
// 请求自动登录
export const reqAutoLogin = () => axios.get('/auto_login')
// 请求退出
export const reqOutLogin = () => axios.get('/out_login')
// 请求模糊搜索歌曲
export const reqSearchSong = (searchStr) => axios.get(`/search_song?audio_name=${searchStr}`)
// 请求最新十条数据
export const reqNewSong = () => axios.get(`/new_song`)
// 请求添加到用户歌曲中
export const reqAddMySong = (songItem) => axios.post('/add_my_song', { songItem })
// 请求添加到用户歌曲中
export const reqRemoteMySong = (audio_name) => axios.post('/remote_my_song', { audio_name })