'use client';

import { useEffect } from 'react';
import MasterJson from '@/config/masterJSON';
import IISMethods from '@/utils/IISMethods';
import { setProps } from '@/utils/reduxUtils';
import ResearchTypeController from '@/app/controller/MasterController';

const ResearchType = (props) => {

    useEffect(() => {
        const fetchData = async () => {
            const data = MasterJson('researchtype')

            await setProps({ rightsidebarformdata: IISMethods.getcopy(data) })
        }
        fetchData();
    }, []);

    try {
        return (
            <>
                <ResearchTypeController />
            </>
        );
    }
    catch (e) {
        console.log('error', e);
        return <></>;
    }
};

export default ResearchType;