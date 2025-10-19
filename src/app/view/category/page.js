'use client';

import { useState, useEffect } from 'react';
import MasterJson from '@/config/masterJSON';
import IISMethods from '@/utils/IISMethods';
import { setProps } from '@/utils/reduxUtils';
import CategoryController from '@/app/controller/CategoryController';

const Category = (props) => {

    useEffect(() => {
        const fetchData = async () => {
            const data = MasterJson('category')

            console.log('data', IISMethods.getcopy(data), data)
            await setProps({ rightsidebarformdata: IISMethods.getcopy(data) })
            console.log('rightSidebarData', data)
        }
        fetchData();
    }, []);

    try {
        return (
            <>
                <CategoryController />
            </>
        );
    }
    catch (e) {
        console.log('error', e);
        return <></>;
    }
};

export default Category;