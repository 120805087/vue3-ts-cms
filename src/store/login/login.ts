import { Module } from 'vuex';
import router from '@/router/router';
import { ILoginState } from './types';
import { IAccount } from '@/service/login/types';
import { IRootState } from '../types';
import {
  accountLoginResult,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login';
import localCache from '@/utils/cache';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //1.实现登录逻辑
      const loginResult = await accountLoginResult(payload);
      const { id, token } = loginResult.data;
      commit('changeToken', token);
      localCache.setLocalCache('token', token);

      //2.获取个人信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setLocalCache('userInfo', userInfo);

      //3.获取当前用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      localCache.setLocalCache('userMenus', userMenus);

      //4.跳转的首页
      router.push('/main');
    },
    loadLocalLogin({ commit }) {
      //页面重新加载的时候， 把local里面的数据，注入到store
      const token = localCache.getLocalCache('token');
      if (token) {
        commit('changeToken', token);
      }

      const userInfo = localCache.getLocalCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }

      const userMenus = localCache.getLocalCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
