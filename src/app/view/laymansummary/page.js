'use client';

import { useEffect } from 'react';
import MasterJson from '@/config/masterJSON';
import IISMethods from '@/utils/IISMethods';
import { setProps } from '@/utils/reduxUtils';
import MasterController from '@/app/controller/MasterController';

const LaymanSummary = (props) => {

    useEffect(() => {
        const fetchData = async () => {
            const data = MasterJson('laymansummary')

            await setProps({ rightsidebarformdata: IISMethods.getcopy(data) })
        }
        fetchData();
    }, []);

    try {
        return (
            <>
                <MasterController />
            </>
        );
    }
    catch (e) {
        console.log('error', e);
        return <></>;
    }
};

export default LaymanSummary;