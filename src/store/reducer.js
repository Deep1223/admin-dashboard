import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import IISMethods from '@/utils/IISMethods';
import Config from '@/config/config';

// ==================== ASYNC THUNKS ====================

// Authentication Thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const { userStorage, sessionStorage, initializeStorage } = await import('@/utils/localStorage');
      initializeStorage();

      const user = userStorage.authenticateUser(email, password);
      if (!user) {
        throw new Error(Config.invalidCredentialserror);
      }

      const token = "local_token_" + Date.now();
      sessionStorage.setSession(user, token);

      if (rememberMe) {
        IISMethods.setLocalStorage("rememberedEmail", email);
        IISMethods.setLocalStorage("rememberedPassword", password);
        IISMethods.setLocalStorage("rememberMe", "true");
      } else {
        IISMethods.removeLocalStorage("rememberedEmail");
        IISMethods.removeLocalStorage("rememberedPassword");
        IISMethods.removeLocalStorage("rememberMe");
      }

      return { user, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { sessionStorage } = await import('@/utils/localStorage');
      sessionStorage.clearSession();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ==================== SLICES ====================

// Main Data Slice - All keys at root level
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [], // Store API data or localStorage gridlist data
    rightsidebarformdata: [], // Set rightsidebarformdata for rightsidebar field set from masterjson
    formdata: {}, // Set rightsidebar fields value in formdata
    filterdata: {}, // Set filter rightsidebar value same as formdata
    oldfilterdata: {}, // Set old filter rightsidebar value same as formdata
    masterdata: [], // Store API data in label and value array of object
    masterdatalist: [], // Store API data
    pageno: 1, // Set current page no
    pagename: '', // Set current page name
    nextpage: 0, // (1 and 0) if more data available so 1 else 0
    logininfo: {}, // Login information
    loading: false,
    error: null,
    modal: {},
    totalcount: 0, // Total number of records
    pagelimit: 10, // Number of records per page
    sortdata: { field: 'createdAt', order: -1 }, // Sort data: field and order (1, -1, 0)
  },

  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setRightSidebarFormData: (state, action) => {
      state.rightsidebarformdata = action.payload;
    },
    setDataFormData: (state, action) => {
      state.formdata = { ...state.formdata, ...action.payload };
    },
    setFilterData: (state, action) => {
      state.filterdata = { ...state.filterdata, ...action.payload };
    },
    setOldFilterData: (state, action) => {
      state.oldfilterdata = { ...state.oldfilterdata, ...action.payload };
    },
    setMasterData: (state, action) => {
      state.masterdata = { ...state.masterdata, ...action.payload };
    },
    setMasterDataList: (state, action) => {
      state.masterdatalist = { ...state.masterdatalist, ...action.payload };
    },
    setPageNo: (state, action) => {
      state.pageno = action.payload;
    },
    setPageName: (state, action) => {
      state.pagename = action.payload;
    },
    setNextPage: (state, action) => {
      state.nextpage = action.payload;
    },
    setLoginInfo: (state, action) => {
      state.logininfo = action.payload;
    },
    clearData: (state) => {
      state.data = [];
      state.formdata = {};
      state.filterdata = {};
      state.oldfilterdata = {};
      state.pageno = 1;
      state.nextpage = 0;
      state.masterdata = [];
      state.masterdatalist = [];
      state.modal = {};
      state.totalcount = 0;
      state.pagelimit = 20;
    },
    clearFormData: (state) => {
      state.formdata = {};
    },
    clearFilterData: (state) => {
      state.filterdata = {};
    },
    clearOldFilterData: (state) => {
      state.oldfilterdata = {};
    },
    setDataLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDataError: (state, action) => {
      state.error = action.payload;
    },
    clearDataError: (state) => {
      state.error = null;
    },
    // Modal actions
    setModal: (state, action) => {
      state.modal = { ...state.modal, ...action.payload };
    },
    // Total count actions
    setTotalCount: (state, action) => {
      state.totalcount = action.payload;
    },
    // Page limit actions
    setPageLimit: (state, action) => {
      state.pagelimit = action.payload;
    },
    // Sort data actions
    setSortData: (state, action) => {
      state.sortdata = action.payload;
    },
    clearSortData: (state) => {
      state.sortdata = { field: 'createdAt', order: -1 };
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     // Add any async thunks here if needed
  //     .addCase(fetchUsers.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(fetchUsers.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.data = action.payload;
  //     })
  //     .addCase(fetchUsers.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});


// ==================== ROOT REDUCER ====================

const rootReducer = dataSlice.reducer;

// ==================== EXPORT ACTIONS ====================

// Data Actions
export const {
  setData,
  setRightSidebarFormData,
  setDataFormData,
  setFilterData,
  setOldFilterData,
  setMasterData,
  setMasterDataList,
  setPageNo,
  setPageName,
  setNextPage,
  setLoginInfo,
  clearData,
  clearFormData,
  clearFilterData,
  clearOldFilterData,
  setDataLoading,
  setDataError,
  clearDataError,
  setModal,
  openModal,
  closeModal,
  setTotalCount,
  setPageLimit,
  setSortData,
  clearSortData,
} = dataSlice.actions;

// ==================== SELECTORS ====================

// Data Selectors - All keys at root level
export const selectData = (state) => state.data;
export const selectRightSidebarFormData = (state) => state.rightsidebarformdata;
export const selectFormData = (state) => state.formdata;
export const selectFilterData = (state) => state.filterdata;
export const selectOldFilterData = (state) => state.oldfilterdata;
export const selectMasterData = (state) => state.masterdata;
export const selectMasterDataList = (state) => state.masterdatalist;
export const selectPageNo = (state) => state.pageno;
export const selectPageName = (state) => state.pagename;
export const selectNextPage = (state) => state.nextpage;
export const selectLoginInfo = (state) => state.logininfo;
export const selectDataLoading = (state) => state.loading;
export const selectDataError = (state) => state.error;
export const selectModal = (state) => state.modal;
export const selectTotalCount = (state) => state.totalcount;
export const selectPageLimit = (state) => state.pagelimit;
export const selectSortData = (state) => state.sortdata;

// ==================== UTILITY FUNCTIONS ====================

// Get current state utility function
export const getCurrentState = () => {
  return (dispatch, getState) => {
    return getState();
  };
};

// Get specific state slice
export const getStateSlice = (sliceName) => {
  return (dispatch, getState) => {
    return getState()[sliceName];
  };
};

// Check if user is authenticated
export const isUserAuthenticated = () => {
  return (dispatch, getState) => {
    return getState().auth.isAuthenticated;
  };
};

// Get current user
export const getCurrentUser = () => {
  return (dispatch, getState) => {
    return getState().auth.user;
  };
};

// Get filtered leads
export const getFilteredLeads = () => {
  return (dispatch, getState) => {
    const { leads, filters } = getState().leads;
    let filteredLeads = leads;

    if (filters.status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === filters.status);
    }
    if (filters.source) {
      filteredLeads = filteredLeads.filter(lead => lead.source === filters.source);
    }
    if (filters.owner) {
      filteredLeads = filteredLeads.filter(lead => lead.owner === filters.owner);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredLeads = filteredLeads.filter(lead =>
        lead.name?.toLowerCase().includes(searchTerm) ||
        lead.email?.toLowerCase().includes(searchTerm) ||
        lead.phone?.toLowerCase().includes(searchTerm)
      );
    }

    return filteredLeads;
  };
};

export default rootReducer;
