# Redux Data Slice Documentation

## Overview
The Redux Data Slice provides centralized state management for your application with the exact structure you specified. It includes all the necessary properties for managing data, forms, filters, master data, and pagination.

## State Structure

```javascript
{
  data: [],                    // Store API data or localStorage gridlist data
  rightsidebarformdata: [],    // Set rightsidebarformdata for rightsidebar field set from masterjson
  formdata: {},               // Set rightsidebar fields value in formdata
  filterdata: {},             // Set filter rightsidebar value same as formdata
  masterdata: {},             // Store API data in label and value array of object
  masterdatalist: [],      // Store API data
  pageno: 1,                  // Set current page no
  pagename: '',               // Set current page name
  nextpage: 0                 // (1 and 0) if more data available so 1 else 0
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
    loading, 
    error, 
    dispatch 
  } = useData();

  return (
    <div>
      <p>Data Count: {data.length}</p>
      <p>Page: {pageno}</p>
      <p>Page Name: {pagename}</p>
    </div>
  );
};
```

### 2. Using Actions

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
  setNextPage
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
```

### 3. Using Utility Functions

```javascript
import { 
  getData,
  getFormData,
  getFilterData,
  getMasterData,
  getPageNo,
  getPageName,
  getNextPage,
  setData,
  setDataFormData,
  setPageNo
} from '@/utils/reduxUtils';

// Get current state
const currentData = getData();
const currentFormData = getFormData();
const currentPageNo = getPageNo();
const currentPageName = getPageName();
const hasNextPage = getNextPage();

// Set data using utility functions
setData(apiData);
setDataFormData({ name: 'John', email: 'john@example.com' });
setPageNo(3);
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

## Best Practices

1. **Use the Data Hook**: Always use `useData()` hook to access data slice state
2. **Consistent Naming**: Use the exact property names as specified
3. **Clear Data**: Always clear data when navigating between different sections
4. **Error Handling**: Use the error state to handle data loading errors
5. **Loading States**: Use loading state to show loading indicators
6. **Master Data**: Store master data in label/value format for dropdowns
7. **Pagination**: Always set nextpage to 1 or 0 based on data availability

## Demo

Visit `/data-slice-example` to see all the data slice functions in action with interactive examples.
