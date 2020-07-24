import axios from 'axios'


export const fetchData = fn => {
  axios.get('http://a.jspang.com/jestTest.json')
    .then(response => fn(response.data))
}
export const pmsFetchData = () => (
  axios.get('http://a.jspang.com/jestTest.json')
    .then(response => response.data)
)
export const fetchThreeData = () => (
  axios.get('http://a.jspang.com/jestTest.json')
    .then(response => response.data)
)