"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = (props) => {
    // ---------------------------- modal Width Start ---------------------------- //

    // Extra Small	    w-48	    192px
    // Small	        w-64	    256px	
    // Medium (Default)	w-96	    384px
    // normal Modal     w-120       480px
    // Large	        w-160	    640px	
    // Extra Large	    w-[50rem]	800px	
    // Full Width	    w-full	    100%	

    // ---------------------------- modal Width Start ---------------------------- //

    try {
        return (
            <AnimatePresence>
                {props.open && (
                    <>
                        {/* Background Overlay */}
                        <motion.div
                            className="position-fixed top-0 start-0 w-100 h-100 bg-dark z-3"
                            style={{opacity: 0.6}}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                        />

                        {/* Modal Container */}
                        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start z-3">
                            <motion.div
                                className={`bg-white p-4 rounded shadow-custom-lg position-relative z-3 modal-custom ${props.width ? props.width : ''}`}
                                style={{width: props.width ? props.width : '480px'}}
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 30, opacity: 1 }}
                                exit={{ y: -50, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Header */}
                                <div className="d-flex justify-content-between align-items-center pb-2">
                                    {
                                        props.header ?
                                            props.header
                                            :
                                            <></>
                                    }
                                    <button onClick={props.onClose} className="btn btn-link text-danger p-0 fs-3">
                                        <IoIosCloseCircleOutline />
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="pb-2">
                                    {
                                        props.body ?
                                            props.body
                                            :
                                            <></>
                                    }
                                </div>

                                {/* Footer */}
                                <div className="d-flex justify-content-end gap-3 mt-3">
                                    {
                                        props.footer ?
                                            props.footer
                                            :
                                            <></>
                                    }
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        );
    }
    catch (e) {
        console.log(e);
        return <></>;
    }
};

export default Modal;
