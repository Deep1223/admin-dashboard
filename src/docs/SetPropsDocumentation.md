# SetProps Documentation

## Overview
The `setProps()` function allows you to set any Redux state property using a simple syntax like `props.setProps({key: value})`. This provides an easy way to manage all Redux state without using dispatch.

## Usage

### Import
```javascript
import { setProps, getProps } from '@/utils/reduxUtils';
import IISMethods from '@/utils/IISMethods';
```

### Basic Syntax
```javascript
// Set single property
setProps({ data: IISMethods.getcopy(newData) });

// Set multiple properties
setProps({
  data: IISMethods.getcopy(newData),
  formdata: IISMethods.getcopy(formData),
  pageno: 2
});
```

## All Available Redux Keys

### 1. Data Management
```javascript
// Set main data array
setProps({ data: IISMethods.getcopy(apiData) });

// Set right sidebar form data from master JSON
setProps({ rightsidebarformdata: IISMethods.getcopy(MasterJson.leads[0].fields) });

// Set form data array
setProps({ formdata: IISMethods.getcopy(formDataArray) });

// Set filter data object
setProps({ filterdata: IISMethods.getcopy(filterData) });

// Set master data array
setProps({ masterdata: IISMethods.getcopy(masterDataArray) });

// Set master data listing array
setProps({ masterdatalist: IISMethods.getcopy(listingData) });
```

### 2. Pagination
```javascript
// Set page number
setProps({ pageno: 2 });

// Set page name
setProps({ pagename: 'Users Management' });

// Set next page availability (1 or 0)
setProps({ nextpage: 1 });

// Set all pagination at once
setProps({
  pageno: 3,
  pagename: 'Products Page',
  nextpage: 0
});
```

### 3. Login Information
```javascript
// Set login info
setProps({
  logininfo: IISMethods.getcopy({
    user: {
      _id: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userRole: 'admin'
    },
    token: 'sample-token-123',
    isAuthenticated: true,
    loginTime: new Date().toISOString()
  })
});

// Clear login info
setProps({ logininfo: {} });
```

### 4. Loading and Error States
```javascript
// Set loading state
setProps({ loading: true });

// Set error state
setProps({ error: 'Something went wrong' });

// Clear error
setProps({ error: null });
```

## Real-world Examples

### 1. Loading Data from API
```javascript
const loadUserData = async () => {
  try {
    setProps({ loading: true });
    
    const response = await fetch('/api/users');
    const result = await response.json();
    
    setProps({
      data: IISMethods.getcopy(result.users),
      pageno: result.pageNo,
      nextpage: result.hasNextPage ? 1 : 0,
      loading: false
    });
    
  } catch (error) {
    setProps({
      error: error.message,
      loading: false
    });
  }
};
```

### 2. Form Submission
```javascript
const handleFormSubmit = (formData) => {
  setProps({
    formdata: IISMethods.getcopy(formData),
    loading: true
  });
  
  // Process form...
  setTimeout(() => {
    setProps({ loading: false });
  }, 1000);
};
```

### 3. User Login
```javascript
const handleLogin = async (credentials) => {
  try {
    setProps({ loading: true });
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const result = await response.json();
    
    if (result.success) {
      setProps({
        logininfo: IISMethods.getcopy({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
          loginTime: new Date().toISOString()
        }),
        loading: false
      });
    }
  } catch (error) {
    setProps({
      error: error.message,
      loading: false
    });
  }
};
```

### 4. Filtering Data
```javascript
const handleApplyFilters = (filters) => {
  setProps({
    filterdata: IISMethods.getcopy(filters),
    pageno: 1 // Reset to first page when filtering
  });
};

const handleClearFilters = () => {
  setProps({
    filterdata: {},
    pageno: 1
  });
};
```

### 5. Pagination
```javascript
const handleNextPage = () => {
  const currentPage = getProps().pageno;
  const hasNext = getProps().nextpage;
  
  if (hasNext) {
    setProps({ pageno: currentPage + 1 });
  }
};

const handlePreviousPage = () => {
  const currentPage = getProps().pageno;
  
  if (currentPage > 1) {
    setProps({ pageno: currentPage - 1 });
  }
};
```

### 6. Master Data Management
```javascript
const loadMasterData = async () => {
  try {
    setProps({ loading: true });
    
    const response = await fetch('/api/master-data');
    const result = await response.json();
    
    setProps({
      masterdata: IISMethods.getcopy(result.data),
      masterdatalist: IISMethods.getcopy(result.listing),
      loading: false
    });
  } catch (error) {
    setProps({
      error: error.message,
      loading: false
    });
  }
};
```

### 7. Right Sidebar Form Data
```javascript
const loadRightSidebarData = (pageName) => {
  let formData = [];
  
  switch (pageName) {
    case 'users':
      formData = MasterJson.users[0].fields;
      break;
    case 'leads':
      formData = MasterJson.leads[0].fields;
      break;
    default:
      formData = [];
  }
  
  setProps({
    rightsidebarformdata: IISMethods.getcopy(formData),
    pagename: pageName
  });
};
```

### 8. Complete Page Setup
```javascript
const setupPage = async (pageName) => {
  try {
    setProps({ loading: true });
    
    // Load page data
    const response = await fetch(`/api/${pageName}`);
    const result = await response.json();
    
    // Load right sidebar form data
    const formData = MasterJson[pageName]?.[0]?.fields || [];
    
    setProps({
      data: IISMethods.getcopy(result.data),
      rightsidebarformdata: IISMethods.getcopy(formData),
      pagename: pageName,
      pageno: result.pageNo || 1,
      nextpage: result.hasNextPage ? 1 : 0,
      loading: false
    });
    
  } catch (error) {
    setProps({
      error: error.message,
      loading: false
    });
  }
};
```

## Getting Current State

### Get All Props
```javascript
const currentProps = getProps();
console.log(currentProps);
```

### Get Specific Properties
```javascript
import { 
  getData, 
  getFormData, 
  getFilterData, 
  getLoginInfo,
  getPageNo,
  getPageName 
} from '@/utils/reduxUtils';

const currentData = getData();
const currentFormData = getFormData();
const currentFilterData = getFilterData();
const currentLoginInfo = getLoginInfo();
const currentPageNo = getPageNo();
const currentPageName = getPageName();
```

## Component Integration

### Using with useData Hook
```javascript
import { useData } from '@/store/hooks';
import { setProps } from '@/utils/reduxUtils';

const MyComponent = () => {
  const { data, formdata, loading, error } = useData();
  
  const handleUpdateData = (newData) => {
    setProps({ data: IISMethods.getcopy(newData) });
  };
  
  return (
    <div>
      <p>Data Count: {data.length}</p>
      <p>Loading: {loading ? 'Yes' : 'No'}</p>
      {error && <p>Error: {error}</p>}
      <button onClick={() => handleUpdateData([...data, { id: Date.now(), name: 'New Item' }])}>
        Add Item
      </button>
    </div>
  );
};
```

### Using without Hooks (Direct)
```javascript
import { setProps, getProps } from '@/utils/reduxUtils';

const MyComponent = () => {
  const handleUpdateData = (newData) => {
    setProps({ data: IISMethods.getcopy(newData) });
  };
  
  const handleGetCurrentData = () => {
    const currentData = getProps().data;
    console.log('Current data:', currentData);
  };
  
  return (
    <div>
      <button onClick={() => handleUpdateData([{ id: 1, name: 'Test' }])}>
        Set Data
      </button>
      <button onClick={handleGetCurrentData}>
        Get Data
      </button>
    </div>
  );
};
```

## Best Practices

1. **Always use IISMethods.getcopy()** when setting data to ensure proper copying
2. **Set loading states** before async operations
3. **Handle errors** by setting error state
4. **Reset pagination** when filtering or searching
5. **Use getProps()** to get current state when needed
6. **Set multiple properties** at once when they're related
7. **Clear states** when navigating between pages

## Demo

Visit `/setprops-example` to see all setProps functions in action with interactive examples.

## Key Benefits

1. **Simple Syntax**: Easy to use like `props.setProps()`
2. **No Dispatch**: No need to use Redux dispatch
3. **All Keys Supported**: Can set any Redux state property
4. **Multiple Properties**: Set multiple properties at once
5. **Type Safe**: Works with all data types
6. **Consistent**: Same pattern for all state updates
7. **Flexible**: Can be used in any component or utility function
