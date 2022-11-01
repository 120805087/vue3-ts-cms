import oRequest from '../index';

import { IAccount, ILoginResult, IDataType } from './types';

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  userMenus = '/role/'
}

export function accountLoginResult(account: IAccount) {
  return oRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return oRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}

export function requestUserMenusByRoleId(id: number) {
  return oRequest.get<IDataType>({
    url: LoginAPI.userMenus + id + '/menu',
    showLoading: false
  });
}
