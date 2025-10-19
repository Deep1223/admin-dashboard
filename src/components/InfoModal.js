'use client';

import { useAppSelector } from "@/store/hooks";
import DrawerRsuite from "./DrawerRsuite";
import IISMethods from "@/utils/IISMethods";
import { getCurrentState, setProps } from "@/utils/reduxUtils";
import ModalRsuite from "@/components/modalrsuite";

const InfoModal = (props) => {
    const pagename = useAppSelector(state => state.pagename);
    const modalData = useAppSelector(state => state.modal);
    console.log('viewInfoData', props.viewInfoData)
    try {
        return (
            <ModalRsuite
                open={modalData.viewInfodatamodal}
                onClose={() => IISMethods.handleGrid(false, 'viewInfodatamodal', 0)}
                title={`Info ${pagename}`}
                body={
                    <div className="mt-12">
                        <div className="col-md-12 col-lg-12">
                            <div className="info-modal-data">
                                <p className="mb-4">
                                    Entry by :{" "}
                                    <span className="info-modal-ans font-weight-600">
                                        {props.viewInfoData.recordinfo?.entryBy ? `${props.viewInfoData.recordinfo.entryBy} at ${IISMethods.getDateTimeFormate(props.viewInfoData.recordinfo.entryTime)}` : '-'}
                                    </span>
                                </p>
                                <p className="mb-4">
                                    Update by :{" "}
                                    <span className="info-modal-ans font-weight-600">{(props.viewInfoData.recordinfo?.updateBy && props.viewInfoData.recordinfo.updateTime) ? `${props.viewInfoData.recordinfo.updateBy} at ${IISMethods.getDateTimeFormate(props.viewInfoData.recordinfo.updateTime)}` : '-'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                }
                footer={
                    <button
                        onClick={() => IISMethods.handleGrid(false, 'viewInfodatamodal', 0)}
                        className="btn btn-secondary"
                    >
                        Close
                    </button>
                }
            />
        )
    }
    catch (error) {
        console.log('error', error);
    }
}

export default InfoModal;