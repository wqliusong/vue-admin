import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
/**
 * Vuex全局状态管理
 */
Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    editableTabsValue: '1',
    editableTabs: [{
        title: '首页',
        name: '1',
        closable:false,
        content:"/"
    }],
    tabIndex: 1
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    // 添加tabs
    ADD_TABS (state,child) {
        //判断是否已存在
        var count = 0;
        var item = {};
        for(item in state.editableTabs){
            if(child.name != state.editableTabs[item].name)
            count ++;
        }
        if(count == state.editableTabs.length){
            state.editableTabs.push({
                title: child.name,
                name: child.name,
                content: child.path,
                closable: true
                });
        }
        state.editableTabsValue = child.name;
    },
    // 删除tabs
    DELETE_TABS (state, targetName) {
        let tabs = state.editableTabs;
        let activeName = state.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        state.editableTabsValue = activeName;
        state.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    // 设置当前激活的tab
    SET_ACTIVE_INDEX (state, name) {
      state.editableTabsValue = name
    },
    // 设置详情信息
    SAVE_DETAIL_INFO (state, info) {
      this.state.userInfo = info;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})