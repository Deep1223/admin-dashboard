'use client';

import { useState, useEffect } from 'react';
import MasterJson from '@/config/masterJSON';
import IISMethods from '@/utils/IISMethods';
import { setProps } from '@/utils/reduxUtils';
import ResearchStudyController from '@/app/controller/ResearchStudyController';

const ResearchStudy = (props) => {
    useEffect(() => {
        const fetchData = async () => {
            const data = MasterJson('researchstudy')
            await setProps({ rightsidebarformdata: IISMethods.getcopy(data) })
        }
        fetchData();
    }, []);

    try {
        return (
            <>
                <ResearchStudyController />
            </>
        );
    }
    catch (e) {
        console.log('error', e);
        return <></>;
    }
};

export default ResearchStudy;