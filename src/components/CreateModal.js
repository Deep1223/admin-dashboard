import { useEffect, useState } from "react";
import Modal from "./modal";
import Config from "@/config/config";
import RightSidebarFormField from "@/components/RightSidebarFormField";
import validateField from "@/components/Validation";
import IISMethods from '@/utils/IISMethods';

const CreateModal = (props) => {
    const hasTabs = props.rightSidebarData.some(tab => tab.tabname); // ✅ Move outside try block
    const [dynamicOptions, setDynamicOptions] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let updatedOptions = {};

            try {
                // Import localStorage utilities
                const { masterDataStorage, initializeStorage } = await import('@/utils/localStorage');
                
                // Initialize storage if needed
                initializeStorage();

                // Process all fields with masterdata
                props.rightSidebarData.flatMap(tab =>
                    tab.fields
                        .filter(field => field.masterdata) // Only process fields with masterdata
                        .forEach((field) => {
                            try {
                                // Get data from localStorage instead of API
                                const dataArray = masterDataStorage.getMasterData(field.masterdata);

                                setData(dataArray);

                                if (dataArray.length > 0 && Array.isArray(field.masterdatafields) && field.masterdatafields.length === 2) {
                                    const [labelField, valueField] = field.masterdatafields;

                                    updatedOptions[field.field] = dataArray.map(item => ({
                                        label: item[labelField],
                                        value: item[valueField]
                                    }));
                                }

                            } catch (error) {
                                console.error(`Error fetching data for ${field.masterdata}:`, error);
                                IISMethods.errormsg(`Failed to load ${field.text}`, 1);
                            }
                        })
                );

                setDynamicOptions(updatedOptions);
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };

        if (props.modalOpen) {
            fetchData();
        }
    }, [props.modalOpen, props.rightSidebarData, props.token]); // ✅ Add `props.token` dependency

        const handleFieldChange = (e, field) => {
            const { name, value } = e.target;
            props.handleChange(e, field); 
        
            const dependentField = props.rightSidebarData
                .flatMap(tab => tab.fields)
                .find(f => f.field === field.onchange);
        
            if (dependentField) {
                const selectedItem = data?.find(item => item._id === value.value);

                if (selectedItem) {
                    const dependentValue = selectedItem[dependentField.onchangevalue];
                    if (dependentValue) {
                        props.handleChange(
                            { target: { name: dependentField.field, value: dependentValue } },
                            { field: dependentField.field }
                        );
                    }
                }
            }
        };

        const updatedRightSidebarData = props.rightSidebarData.map(tab => ({
            ...tab,
            fields: tab.fields.map(field => ({
                ...field,
                options: field.masterdata ? (dynamicOptions[field.field] || []) : field.options
            }))
        }));

        const handleNextButtonClick = async (tabfield, activeIndex) => {
            let newErrors = {};
            let emptyFields = false;

            tabfield.forEach((field) => {
                const fieldValue = props.formData[field.field] || '';

                if (field.type === "checkbox" && field.required) {
                    if (!props.formData[field.field] || props.formData[field.field].length === 0) {
                        emptyFields = true;
                        newErrors[field.field] = Config.thisfieldrequirederror;
                    }
                } else {
                    const errorMessage = validateField(field.text, fieldValue, { required: field.required, type: field.regextype });

                    if (field.required && !fieldValue) {
                        emptyFields = true;
                        newErrors[field.field] = Config.thisfieldrequirederror;
                    } else if (errorMessage) {
                        newErrors[field.field] = errorMessage;
                    }
                }
            });

            if (emptyFields) {
                props.setErrors(newErrors);
                IISMethods.errormsg(Config.fillallfieldserror, 1);
                return;
            }

            if (Object.keys(newErrors).length > 0) {
                props.setErrors(newErrors);
                IISMethods.errormsg(IISMethods.getFirstError(newErrors), 1);
                return;
            }

            props.setErrors({});

            if (activeIndex + 1 < props.rightSidebarData.length) {
                props.setActiveTab(props.rightSidebarData[activeIndex + 1].tabname);
            }
        };

        return (
            <Modal
                width={'w-160'}
                open={props.modalOpen}
                onClose={() => props.setModalOpen(false)}
                header={<h2 className="text-lg font-semibold">{props.title}</h2>}
                body={
                    <form>
                        {hasTabs && (
                            <div className="w-full border-b border-border">
                                <div className="flex space-x-5">
                                    {props.rightSidebarData.map((tab, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                props.setActiveTab(tab.tabname);
                                            }}
                                            className={`relative py-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                                                ${props.activeTab === tab.tabname ? "!text-blue-700" : "text-gray-500 hover:text-gray-800"}`}
                                        >
                                            {tab.tabname}
                                            <span
                                                className={`absolute bottom-0 left-0 h-[2px] bg-blue-700 transition-all duration-300 
                                                    ${props.activeTab === tab.tabname ? "w-full scale-x-100" : "w-0 scale-x-0"}`}
                                            ></span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-2">
                            {(hasTabs
                                ? updatedRightSidebarData
                                    .filter((tab) => tab.tabname === props.activeTab)
                                    .flatMap((tab) => tab.fields)
                                : updatedRightSidebarData.flatMap((tab) => tab.fields)
                            ).map((field, index) => (
                                <RightSidebarFormField
                                    key={index}
                                    field={field}
                                    errors={props.errors}
                                    handleChange={props.handleChange}
                                    formData={props.formData}
                                    setErrors={props.setErrors}
                                    handleFieldChange={handleFieldChange}
                                />
                            ))}
                        </div>
                    </form>
                }
                footer={
                    <>
                        {hasTabs ? (() => {
                            const activeIndex = props.rightSidebarData.findIndex((tab) => tab.tabname === props.activeTab);
                            const isFirstTab = activeIndex === 0;
                            const isLastTab = activeIndex === props.rightSidebarData.length - 1;

                            return (
                                <>
                                    {!isFirstTab && (
                                        <button
                                            onClick={() => props.setActiveTab(props.rightSidebarData[activeIndex - 1].tabname)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                        >
                                            {Config.previousbtn}
                                        </button>
                                    )}

                                    {!isLastTab && (
                                        <button
                                            onClick={() => handleNextButtonClick(props.rightSidebarData[activeIndex].fields, activeIndex)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                        >
                                            {Config.nextbtn}
                                        </button>
                                    )}

                                    {isLastTab && (
                                        <button
                                            onClick={props.handleAddButtonClick}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            {Config.createbtn}
                                        </button>
                                    )}
                                </>
                            );
                        })() : (
                            <button
                                onClick={props.handleAddButtonClick}
                                className="px-4 py-2 bg-blue-500 text-white cursor-pointer rounded hover:bg-blue-600"
                            >
                                {Config.createbtn}
                            </button>
                        )}

                        <button
                            onClick={() => props.setModalOpen(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded hover:bg-gray-300"
                        >
                            {Config.closebtn}
                        </button>
                    </>
                }
            />
        );
    } 


export default CreateModal;
