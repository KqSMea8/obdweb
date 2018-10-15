import { isResOK } from '@/utils/BizUtil';
import { getCarPage, createCar, getCarInfo, modifyCar, delCar } from '@/services/equip';
import { pageBindUser, addBindUser, delBindUser, editBindUser, getBindUser } from '@/services/cars';

const servToReduce = {
  addCar: { method: createCar, reduce: null },
  editCar: { method: modifyCar, reduce: null },
  delCar: { method: delCar, reduce: null },
  queryCarList: { method: getCarPage, reduce: 'queryList' },
  getCarInfo: { method: getCarInfo, reduce: 'queryCarInfo' },
  pageBindUser: { method: pageBindUser, reduce: 'pageBindUser' },
  addBindUser: { method: addBindUser, reduce: null },
  delBindUser: { method: delBindUser, reduce: null },
  editBindUser: { method: editBindUser, reduce: null },
  getBindUser: { method: getBindUser, reduce: 'getBindUser' },
};
//
export default {
  namespace: 'car',

  state: {
    carPageList: {},
    carInfo: {},
    pageBindUser: {},
    bindUser: {},
  },

  effects: {
    *reqCommon({ service, payload, callback }, { call, put }) {
      const postParamObj = servToReduce[service];
      const response = yield call(postParamObj.method, payload);
      //
      if (isResOK(response)) {
        const { reduce } = postParamObj;
        if (reduce) {
          yield put({
            type: reduce,
            payload: response,
          });
        }
        if (callback) callback();
      }
    },
    *clearBindUser({ payload }, { put }) {
      yield put({
        type: 'queryBindUser',
        payload,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        carPageList: action.payload,
      };
    },
    queryCarInfo(state, action) {
      return {
        ...state,
        carInfo: action.payload,
      };
    },
    pageBindUser(state, action) {
      return {
        ...state,
        pageBindUser: action.payload,
      };
    },
    getBindUser(state, action) {
      return {
        ...state,
        bindUser: action.payload,
      };
    },
  },
};
