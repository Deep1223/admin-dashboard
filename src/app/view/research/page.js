'use client';

import { useState, useEffect } from 'react';
import MasterJson from '@/config/masterJSON';
import IISMethods from '@/utils/IISMethods';
import { setProps } from '@/utils/reduxUtils';
import ResearchController from '@/app/controller/ResearchController';

const Research = (props) => {
    useEffect(() => {
        const fetchData = async () => {
            const data = MasterJson('research')
            console.log('data data rightsidebarformdata', data)
            await setProps({ rightsidebarformdata: IISMethods.getcopy(data) })
        }
        fetchData();
    }, []);

    try {
        return (
            <>
                <ResearchController />
            </>
        );
    }
    catch (e) {
        console.log('error', e);
        return <></>;
    }
};

export default Research;