'use client'

import React from 'react';
import { Drawer } from 'rsuite';
import IISMethods from '@/utils/IISMethods';
import { useAppSelector } from '@/store/hooks';

const DrawerRsuite = (props) => {
    const modal = useAppSelector(state => state.modal);
    
    return (
        <Drawer open={modal.filterdrawer} onClose={() => IISMethods.handleGrid(false, 'filterdrawer', 0)} size={props.size || 'xs'}>
            <Drawer.Header>
                <Drawer.Title>{props.title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                {props.body}
            </Drawer.Body>
        </Drawer>
    );
};

export default DrawerRsuite;
