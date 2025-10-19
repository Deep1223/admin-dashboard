import { store } from '@/store/store';

/**
 * Redux Utility Functions
 * Centralized functions for Redux state management
 */

// ==================== STATE GETTERS ====================

/**
 * Get current Redux state
 * @returns {Object} Current Redux state
 */
export const getCurrentState = () => {
  return store.getState();
};

/**
 * Get specific state slice
 * @param {string} sliceName - Name of the state slice
 * @returns {Object} State slice
 */
export const getStateSlice = (sliceName) => {
  const state = store.getState();
  return state[sliceName];
};

/**
 * Get right sidebar form data from state
 * @returns {Array} Right sidebar form data array
 */
export const getRightSidebarFormData = () => {
  const state = getCurrentState();
  return state?.rightsidebarformdata || [];
};

/**
 * Get main data from state
 * @returns {Array} Data array
 */
export const getData = () => {
  const state = getCurrentState();
  return state?.data || [];
};

/**
 * Get form data from state
 * @returns {Array} Form data array
 */
export const getFormData = () => {
  const state = getCurrentState();
  return state?.formdata || [];
};

/**
 * Get filter data from state
 * @returns {Object} Filter data object
 */
export const getFilterData = () => {
  const state = getCurrentState();
  return state?.filterdata || {};
};

/**
 * Get old filter data from state
 * @returns {Object} Old filter data object
 */
export const getOldFilterData = () => {
  const state = getCurrentState();
  return state?.oldfilterdata || {};
};

/**
 * Get master data from state
 * @returns {Array} Master data array
 */
export const getMasterData = () => {
  const state = getCurrentState();
  return state?.masterdata || [];
};

/**
 * Get master data listing from state
 * @returns {Array} Master data listing array
 */
export const getMasterDataList = () => {
  const state = getCurrentState();
  return state?.masterdatalist || [];
};

/**
 * Get current page number from state
 * @returns {number} Current page number
 */
export const getPageNo = () => {
  const state = getCurrentState();
  return state?.pageno || 1;
};

/**
 * Get current page name from state
 * @returns {string} Current page name
 */
export const getPageName = () => {
  const state = getCurrentState();
  return state?.pagename || '';
};

/**
 * Get next page availability from state
 * @returns {number} Next page availability (1 or 0)
 */
export const getNextPage = () => {
  const state = getCurrentState();
  return state?.nextpage || 0;
};

/**
 * Get login info from state
 * @returns {Object} Login info object
 */
export const getLoginInfo = () => {
  const state = getCurrentState();
  return state?.logininfo || {};
};

/**
 * Check if any loading is in progress
 * @returns {boolean} Loading status
 */
export const isLoading = () => {
  const state = getCurrentState();
  return state?.loading || false;
};

/**
 * Get modal state from state
 * @returns {Object} Modal state object
 */
export const getModal = () => {
  const state = getCurrentState();
  return state?.modal || {
    isOpen: false,
    type: '',
    data: null,
    title: ''
  };
};

/**
 * Get total count from state
 * @returns {number} Total count
 */
export const getTotalCount = () => {
  const state = getCurrentState();
  return state?.totalcount || 0;
};

/**
 * Get page limit from state
 * @returns {number} Page limit
 */
export const getPageLimit = () => {
  const state = getCurrentState();
  return state?.pagelimit || 10;
};

/**
 * Get sort data from state
 * @returns {Object} Sort data object with field and order
 */
export const getSortData = () => {
  const state = getCurrentState();
  return state?.sortdata || { field: 'createdAt', order: -1 };
};

// ==================== STATE UPDATERS ====================

/**
 * Dispatch action to store
 * @param {Object} action - Redux action
 */
export const dispatchAction = (action) => {
  store.dispatch(action);
};

/**
 * Set main data in state
 * @param {Array} data - Data array
 */
export const setData = (data) => {
  const { setData: setDataAction } = require('@/store/reducer');
  dispatchAction(setDataAction(data));
};

/**
 * Set right sidebar form data in state
 * @param {Array} rightsidebarformdata - Right sidebar form data array
 */
export const setRightSidebarFormData = (rightsidebarformdata) => {
  const { setRightSidebarFormData: setRightSidebarFormDataAction } = require('@/store/reducer');
  dispatchAction(setRightSidebarFormDataAction(rightsidebarformdata));
};

/**
 * Set form data in state
 * @param {Object} formdata - Form data object
 */
export const setFormData = (formdata) => {
  const { setDataFormData: setDataFormDataAction } = require('@/store/reducer');
  dispatchAction(setDataFormDataAction(formdata));
};

/**
 * Set filter data in state
 * @param {Object} filterdata - Filter data object
 */
export const setFilterData = (filterdata) => {
  const { setFilterData: setFilterDataAction } = require('@/store/reducer');
  dispatchAction(setFilterDataAction(filterdata));
};

/**
 * Set old filter data in state
 * @param {Object} oldfilterdata - Old filter data object
 */
export const setOldFilterData = (oldfilterdata) => {
  const { setOldFilterData: setOldFilterDataAction } = require('@/store/reducer');
  dispatchAction(setOldFilterDataAction(oldfilterdata));
};

/**
 * Set master data in state
 * @param {Object} masterdata - Master data object
 */
export const setMasterData = (masterdata) => {
  const { setMasterData: setMasterDataAction } = require('@/store/reducer');
  dispatchAction(setMasterDataAction(masterdata));
};

/**
 * Set master data listing in state
 * @param {Array} masterdatalist - Master data listing array
 */
export const setMasterDataList = (masterdatalist) => {
  const { setMasterDataList: setMasterDataListAction } = require('@/store/reducer');
  dispatchAction(setMasterDataListAction(masterdatalist));
};

/**
 * Set page number in state
 * @param {number} pageno - Page number
 */
export const setPageNo = (pageno) => {
  const { setPageNo: setPageNoAction } = require('@/store/reducer');
  dispatchAction(setPageNoAction(pageno));
};

/**
 * Set page name in state
 * @param {string} pagename - Page name
 */
export const setPageName = (pagename) => {
  const { setPageName: setPageNameAction } = require('@/store/reducer');
  dispatchAction(setPageNameAction(pagename));
};

/**
 * Set next page availability in state
 * @param {number} nextpage - Next page availability (1 or 0)
 */
export const setNextPage = (nextpage) => {
  const { setNextPage: setNextPageAction } = require('@/store/reducer');
  dispatchAction(setNextPageAction(nextpage));
};

/**
 * Set login info in state
 * @param {Object} logininfo - Login information
 */
export const setLoginInfo = (logininfo) => {
  const { setLoginInfo: setLoginInfoAction } = require('@/store/reducer');
  dispatchAction(setLoginInfoAction(logininfo));
};

/**
 * Set data loading state
 * @param {boolean} loading - Loading state
 */
export const setDataLoading = (loading) => {
  const { setDataLoading: setDataLoadingAction } = require('@/store/reducer');
  dispatchAction(setDataLoadingAction(loading));
};

/**
 * Set data error state
 * @param {string} error - Error message
 */
export const setDataError = (error) => {
  const { setDataError: setDataErrorAction } = require('@/store/reducer');
  dispatchAction(setDataErrorAction(error));
};

/**
 * Set modal state
 * @param {Object} modal - Modal state object
 */
export const setModal = (modal) => {
  const { setModal: setModalAction } = require('@/store/reducer');
  dispatchAction(setModalAction(modal));
};

/**
 * Open modal with data
 * @param {Object} modalData - Modal data {type, data, title}
 */
export const openModal = (modalData) => {
  const { openModal: openModalAction } = require('@/store/reducer');
  dispatchAction(openModalAction(modalData));
};

/**
 * Close modal
 */
export const closeModal = () => {
  const { closeModal: closeModalAction } = require('@/store/reducer');
  dispatchAction(closeModalAction());
};

/**
 * Set total count
 * @param {number} totalcount - Total count
 */
export const setTotalCount = (totalcount) => {
  const { setTotalCount: setTotalCountAction } = require('@/store/reducer');
  dispatchAction(setTotalCountAction(totalcount));
};

/**
 * Set page limit
 * @param {number} pagelimit - Page limit
 */
export const setPageLimit = (pagelimit) => {
  const { setPageLimit: setPageLimitAction } = require('@/store/reducer');
  dispatchAction(setPageLimitAction(pagelimit));
};

/**
 * Set sort data
 * @param {Object} sortdata - Sort data object with field and order
 */
export const setSortData = (sortdata) => {
  const { setSortData: setSortDataAction } = require('@/store/reducer');
  dispatchAction(setSortDataAction(sortdata));
};

// ==================== PROPS SETTER FUNCTIONS ====================

/**
 * Set props function - works like props.setProps()
 * @param {Object} props - Object containing data to set
 */
export const setProps = (props) => {
  if (props.data !== undefined) {
    setData(props.data);
  }
  if (props.rightsidebarformdata !== undefined) {
    setRightSidebarFormData(props.rightsidebarformdata);
  }
  if (props.formdata !== undefined) {
    setFormData(props.formdata);
  }
  if (props.filterdata !== undefined) {
    setFilterData(props.filterdata);
  }
  if (props.oldfilterdata !== undefined) {
    setOldFilterData(props.oldfilterdata);
  }
  if (props.masterdata !== undefined) {
    setMasterData(props.masterdata);
  }
  if (props.masterdatalist !== undefined) {
    setMasterDataList(props.masterdatalist);
  }
  if (props.pageno !== undefined) {
    setPageNo(props.pageno);
  }
  if (props.pagename !== undefined) {
    setPageName(props.pagename);
  }
  if (props.nextpage !== undefined) {
    setNextPage(props.nextpage);
  }
  if (props.logininfo !== undefined) {
    setLoginInfo(props.logininfo);
  }
  if (props.loading !== undefined) {
    setDataLoading(props.loading);
  }
  if (props.error !== undefined) {
    setDataError(props.error);
  }
  if (props.modal !== undefined) {
    setModal(props.modal);
  }
  if (props.totalcount !== undefined) {
    setTotalCount(props.totalcount);
  }
  if (props.pagelimit !== undefined) {
    setPageLimit(props.pagelimit);
  }
  if (props.sortdata !== undefined) {
    setSortData(props.sortdata);
  }
};

/**
 * Get props function - works like props.getProps()
 * @returns {Object} Current state as props
 */
export const getProps = () => {
  return {
    data: getData(),
    rightsidebarformdata: getRightSidebarFormData(),
    formdata: getFormData(),
    filterdata: getFilterData(),
    oldfilterdata: getOldFilterData(),
    masterdata: getMasterData(),
    masterdatalist: getMasterDataList(),
    pageno: getPageNo(),
    pagename: getPageName(),
    nextpage: getNextPage(),
    logininfo: getLoginInfo(),
    loading: isLoading(),
    error: getCurrentState()?.error || null,
    modal: getModal(),
    totalcount: getTotalCount(),
    pagelimit: getPageLimit(),
    sortdata: getSortData()
  };
};