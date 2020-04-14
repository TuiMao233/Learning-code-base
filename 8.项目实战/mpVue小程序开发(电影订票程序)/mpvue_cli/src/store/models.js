import {
    RECEIVE_LIST_DATAS,
    RECEIVE_SUBJECTS
} from './models-types'
import { reqSubjects } from "../api";
export default {
    state: {
        listDatas:[], // list数据
        subjects: []  // 电影列表
    },
    mutations: {
        [RECEIVE_LIST_DATAS]: (state, listDatas) => state.listDatas = listDatas,
        [RECEIVE_SUBJECTS]: (state, subjects) => state.subjects = subjects
    },
    actions: {
        // 接收list数据
        receiveListDatas: ({commit}, listDatas) => commit(RECEIVE_LIST_DATAS, listDatas),
        // 获取电影列表
        async getSubjects ({commit}) {
            const result = await reqSubjects()
            result.start === 0 ? commit(RECEIVE_SUBJECTS, result.subjects) : null
        }
    },
    getters: {
    }
}