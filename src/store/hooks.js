import { useDispatch, useSelector } from 'react-redux';

// Custom hooks for Redux
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Main Data hook - All keys at root level
export const useData = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.data);
  const rightsidebarformdata = useAppSelector(state => state.rightsidebarformdata);
  const formdata = useAppSelector(state => state.formdata);
  const filterdata = useAppSelector(state => state.filterdata);
  const masterdata = useAppSelector(state => state.masterdata);
  const masterdatalist = useAppSelector(state => state.masterdatalist);
  const pageno = useAppSelector(state => state.pageno);
  const pagename = useAppSelector(state => state.pagename);
  const nextpage = useAppSelector(state => state.nextpage);
  const logininfo = useAppSelector(state => state.logininfo);
  const loading = useAppSelector(state => state.loading);
  const error = useAppSelector(state => state.error);

  return {
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
    dispatch,
  };
};
