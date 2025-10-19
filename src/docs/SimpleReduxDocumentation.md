# Simple State-Based Redux Documentation

## Overview
This is a simplified Redux setup with only the data slice containing all the required keys as specified. It provides easy state management for your application with a clean, focused structure.

## State Structure

```javascript
// Redux State Structure (All keys at root level):
{
  data: [],                    // Store API data or localStorage gridlist data
  rightsidebarformdata: [],    // Set rightsidebarformdata for rightsidebar field set from masterjson
  formdata: [],               // Set rightsidebar fields value in formdata
  filterdata: {},             // Set filter rightsidebar value same as formdata
  masterdata: [],             // Store API data in label and value array of object
  masterdatalist: [],      // Store API data
  pageno: 1,                  // Set current page no
  pagename: '',               // Set current page name
  nextpage: 0,                // (1 and 0) if more data available so 1 else 0
  logininfo: {},              // Login information
  loading: false,
  error: null
}
```

## Available Actions

### Data Management Actions
- `setData(data)` - Set main data array
- `setRightSidebarFormData(formData)` - Set right sidebar form data from master JSON
- `setDataFormData(formData)` - Set form data object
- `setFilterData(filterData)` - Set filter data object
- `setMasterData(masterData)` - Set master data with label/value pairs
- `setMasterDataList(listing)` - Set master data listing array
- `setPageNo(pageNo)` - Set current page number
- `setPageName(pageName)` - Set current page name
- `setNextPage(nextPage)` - Set next page availability (1 or 0)
- `setLoginInfo(loginInfo)` - Set login information

### Clear Actions
- `clearData()` - Clear all data
- `clearFormData()` - Clear form data
- `clearFilterData()` - Clear filter data

### Loading & Error Actions
- `setDataLoading(loading)` - Set loading state
- `setDataError(error)` - Set error state
- `clearDataError()` - Clear error state

## Available Selectors

```javascript
// Data Selectors
selectData(state)                    // Get main data array
selectRightSidebarFormData(state)    // Get right sidebar form data
selectFormData(state)                // Get form data object
selectFilterData(state)              // Get filter data object
selectMasterData(state)              // Get master data object
selectMasterDataList(state)       // Get master data listing array
selectPageNo(state)                  // Get current page number
selectPageName(state)                // Get current page name
selectNextPage(state)                // Get next page availability
selectLoginInfo(state)               // Get login information
selectDataLoading(state)             // Get loading state
selectDataError(state)               // Get error state
```

## Usage Examples

### 1. Using the Data Hook

```javascript
import { useData } from '@/store/hooks';

const MyComponent = () => {
  const { 
    data, 
    rightsidebarformdata, 
    formdata, 
    filterdata, 
    masterdata, 
    masterdatalist, 
    pageno, 
    pagename, 
    nextpage, 
    logininfo,
    loading, 
    error, 
    dispatch 
  } = useData();

  return (
    <div>
      <p>Data Count: {data.length}</p>
      <p>Page: {pageno}</p>
      <p>Page Name: {pagename}</p>
      <p>User: {logininfo?.user?.userName || 'Not logged in'}</p>
    </div>
  );
};
```

### 2. Setting Data with Dispatch

```javascript
import { 
  setData,
  setRightSidebarFormData,
  setDataFormData,
  setFilterData,
  setMasterData,
  setMasterDataList,
  setPageNo,
  setPageName,
  setNextPage,
  setLoginInfo
} from '@/store/reducer';

// Set main data
dispatch(setData([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]));

// Set right sidebar form data from master JSON
dispatch(setRightSidebarFormData(MasterJson.leads[0].fields));

// Set form data
dispatch(setDataFormData({
  fullname: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  role: 'admin'
}));

// Set filter data
dispatch(setFilterData({
  status: 'Active',
  role: 'admin',
  search: 'john'
}));

// Set master data (label and value pairs)
dispatch(setMasterData({
  roles: [
    { label: 'Admin', value: 'admin' },
    { label: 'Sales Person', value: 'salesperson' }
  ],
  statuses: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ]
}));

// Set master data listing
dispatch(setMasterDataList([
  { _id: '1', name: 'Admin Role', type: 'role' },
  { _id: '2', name: 'Sales Role', type: 'role' }
]));

// Set pagination
dispatch(setPageNo(2));
dispatch(setPageName('Users Management'));
dispatch(setNextPage(1));

// Set login info
dispatch(setLoginInfo({
  user: {
    _id: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userRole: 'admin'
  },
  token: 'sample-token-123',
  isAuthenticated: true,
  loginTime: new Date().toISOString()
}));
```

### 3. Using Utility Functions

```javascript
import { 
  getCurrentState,
  getData,
  getFormData,
  getFilterData,
  getMasterData,
  getPageNo,
  getPageName,
  getNextPage,
  getLoginInfo,
  setData,
  setDataFormData,
  setLoginInfo,
  setAuthUser,
  clearAuth
} from '@/utils/reduxUtils';

// Get current state
const currentState = getCurrentState();
const currentData = getData();
const currentFormData = getFormData();
const currentFilterData = getFilterData();
const currentMasterData = getMasterData();
const currentPageNo = getPageNo();
const currentPageName = getPageName();
const hasNextPage = getNextPage();
const currentLoginInfo = getLoginInfo();

// Set data using utility functions
setData(apiData);
setDataFormData({ name: 'John', email: 'john@example.com' });

// Set login info using utility functions
setLoginInfo({
  user: { userName: 'John', userRole: 'admin' },
  token: 'token123',
  isAuthenticated: true
});

// Set authentication user (convenience function)
setAuthUser(userData, token);

// Clear authentication
clearAuth();
```

### 4. Working with Master JSON

```javascript
import MasterJson from '@/config/masterJSON';

// Set right sidebar form data from master JSON
const handleSetFormData = () => {
  if (MasterJson.leads && MasterJson.leads.length > 0) {
    dispatch(setRightSidebarFormData(MasterJson.leads[0].fields));
  }
  
  if (MasterJson.users && MasterJson.users.length > 0) {
    dispatch(setRightSidebarFormData(MasterJson.users[0].fields));
  }
};
```

### 5. Form Data Management

```javascript
// Set form data
const handleFormSubmit = (formValues) => {
  dispatch(setDataFormData(formValues));
};

// Update specific form field
const handleFieldChange = (fieldName, value) => {
  const currentFormData = getFormData();
  dispatch(setDataFormData({
    ...currentFormData,
    [fieldName]: value
  }));
};

// Clear form data
const handleClearForm = () => {
  dispatch(clearFormData());
};
```

### 6. Filter Data Management

```javascript
// Set filter data
const handleApplyFilters = (filters) => {
  dispatch(setFilterData(filters));
};

// Update specific filter
const handleFilterChange = (filterName, value) => {
  const currentFilterData = getFilterData();
  dispatch(setFilterData({
    ...currentFilterData,
    [filterName]: value
  }));
};

// Clear filters
const handleClearFilters = () => {
  dispatch(clearFilterData());
};
```

### 7. Master Data Management

```javascript
// Set master data with label/value pairs
const handleSetMasterData = (apiResponse) => {
  const masterData = {
    roles: apiResponse.roles.map(role => ({
      label: role.name,
      value: role.id
    })),
    statuses: apiResponse.statuses.map(status => ({
      label: status.name,
      value: status.id
    }))
  };
  
  dispatch(setMasterData(masterData));
};

// Set master data listing
const handleSetMasterDataList = (apiResponse) => {
  dispatch(setMasterDataList(apiResponse.data));
};
```

### 8. Pagination Management

```javascript
// Set pagination
const handleSetPagination = (pageNo, pageName, hasNextPage) => {
  dispatch(setPageNo(pageNo));
  dispatch(setPageName(pageName));
  dispatch(setNextPage(hasNextPage ? 1 : 0));
};

// Navigate to next page
const handleNextPage = () => {
  const currentPage = getPageNo();
  const hasNext = getNextPage();
  
  if (hasNext) {
    dispatch(setPageNo(currentPage + 1));
  }
};

// Navigate to previous page
const handlePreviousPage = () => {
  const currentPage = getPageNo();
  
  if (currentPage > 1) {
    dispatch(setPageNo(currentPage - 1));
  }
};
```

### 9. Login Information Management

```javascript
// Set login info
const handleLogin = (userData, token) => {
  const loginInfo = {
    user: userData,
    token: token,
    isAuthenticated: true,
    loginTime: new Date().toISOString()
  };
  
  dispatch(setLoginInfo(loginInfo));
};

// Get current user
const getCurrentUser = () => {
  const loginInfo = getLoginInfo();
  return loginInfo?.user || null;
};

// Check if user is authenticated
const isAuthenticated = () => {
  const loginInfo = getLoginInfo();
  return loginInfo?.isAuthenticated || false;
};

// Get authentication token
const getToken = () => {
  const loginInfo = getLoginInfo();
  return loginInfo?.token || null;
};

// Logout
const handleLogout = () => {
  dispatch(setLoginInfo({}));
};
```

## Integration with Existing Components

### Update CreateModal Component

```javascript
import { useData } from '@/store/hooks';
import { setRightSidebarFormData, setDataFormData } from '@/store/reducer';

const CreateModal = (props) => {
  const { rightsidebarformdata, formdata, dispatch } = useData();
  
  // Set right sidebar form data from props
  useEffect(() => {
    if (props.rightSidebarData) {
      dispatch(setRightSidebarFormData(props.rightSidebarData));
    }
  }, [props.rightSidebarData, dispatch]);
  
  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDataFormData({ [name]: value }));
  };
  
  // Rest of component logic...
};
```

### Update Table Component

```javascript
import { useData } from '@/store/hooks';
import { setData, setPageNo, setNextPage } from '@/store/reducer';

const Table = (props) => {
  const { data, pageno, nextpage, dispatch } = useData();
  
  // Load data
  useEffect(() => {
    // Load data from API or localStorage
    const loadData = async () => {
      const response = await fetch('/api/data');
      const result = await response.json();
      
      dispatch(setData(result.data));
      dispatch(setPageNo(result.pageNo));
      dispatch(setNextPage(result.hasNextPage ? 1 : 0));
    };
    
    loadData();
  }, [dispatch]);
  
  // Rest of component logic...
};
```

### Update Login Component

```javascript
import { useData } from '@/store/hooks';
import { setLoginInfo } from '@/store/reducer';

const LoginComponent = () => {
  const { logininfo, dispatch } = useData();
  
  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const result = await response.json();
      
      if (result.success) {
        dispatch(setLoginInfo({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
          loginTime: new Date().toISOString()
        }));
        
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  // Rest of component logic...
};
```

## Best Practices

1. **Use the Data Hook**: Always use `useData()` hook to access data slice state
2. **Consistent Naming**: Use the exact property names as specified
3. **Clear Data**: Always clear data when navigating between different sections
4. **Error Handling**: Use the error state to handle data loading errors
5. **Loading States**: Use loading state to show loading indicators
6. **Master Data**: Store master data in label/value format for dropdowns
7. **Pagination**: Always set nextpage to 1 or 0 based on data availability
8. **Login Info**: Store all authentication information in logininfo object
9. **Utility Functions**: Use utility functions for easy state access outside components

## Demo

Visit `/simple-state-example` to see all the simplified Redux functions in action with interactive examples.

## Key Benefits

1. **Simplified Structure**: Only one data slice with all required keys
2. **Easy to Use**: Simple dispatch actions and utility functions
3. **State-Based**: Easy state management with `getCurrentState()`
4. **Login Integration**: Built-in login information management
5. **Master JSON Support**: Easy integration with master JSON configuration
6. **Pagination Ready**: Built-in pagination support
7. **Filter Support**: Easy filter data management
8. **Form Support**: Built-in form data management
