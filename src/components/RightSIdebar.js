'use client'

import { useAppSelector } from "@/store/hooks";
import ModalRsuite from "@/components/modalrsuite";
import IISMethods from "@/utils/IISMethods";
import JsCall from "@/utils/JsCall";
import { getCurrentState } from "@/utils/reduxUtils";
import RenderViewField from "./RenderViewField";
import SelectPickerRsuite from "./SelectPickerRsuite";
import JoditEditorComponent from "./JoditEditor";
import { DatePicker } from "rsuite";

const RightSidebar = (props) => {
    const modal = useAppSelector(s => s.modal);
    const rightSidebarFormData = useAppSelector(s => s.rightsidebarformdata);
    const masterdata = useAppSelector(s => s.masterdata);

    const formData = useAppSelector(s => s.formdata);
    const title = rightSidebarFormData?.[0]?.pagename ? `Create ${rightSidebarFormData[0].pagename}` : 'Create';

    const checkValidation = (field, value) => {
        const newRightSidebarFormData = IISMethods.createRightSidebarData(field, rightSidebarFormData)
        const formData = IISMethods.createFormData(field, value)
        JsCall.ValidateForm(formData, newRightSidebarFormData)
    }

    try {
        return (
            <>
                <ModalRsuite
                    open={modal?.rightsidebar}
                    onClose={() => { IISMethods.handleGrid(false, 'rightsidebar', 0) }}
                    title={title}
                    size={rightSidebarFormData?.[0]?.rightsidebarsize}
                    body={
                        <form method="post">
                            <div className="row">
                                {
                                    rightSidebarFormData?.length > 1 ?
                                        <>
                                            {
                                                rightSidebarFormData?.map((tab, index) => (
                                                    <div key={`tab-${index}-${tab.tabname}`}>
                                                        <span>{tab.tabname}</span>
                                                    </div>
                                                ))
                                            }
                                        </>
                                        :
                                        <>
                                            {rightSidebarFormData?.[0]?.fields.map((fields, index) => (
                                                <div
                                                    key={fields.field || index}
                                                    className={`${fields.size} overflow-y-hidden`}
                                                >
                                                    {fields.type === 'text' ? (
                                                        <div
                                                            className={`form-group validate-input ${fields.required ? 'required-input' : ''
                                                                } ${fields.hasError ? 'error' : ''}`}
                                                        >
                                                            <label className="label-form-control">
                                                                {fields.text}
                                                                {fields.required && <span className="text-danger"> * </span>}
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id={`form-${fields.field}`}
                                                                name={fields.field}
                                                                autoComplete="off"
                                                                placeholder={fields.placeholder || `Enter ${fields.text}`}
                                                                defaultValue={formData[fields.field]}
                                                                onChange={(e) => checkValidation(fields.field, e.target.value)}
                                                                onBlur={(e) =>
                                                                    props.handleFormData(fields.type, fields.field, e.target.value)
                                                                }
                                                                disabled={fields.disabled}
                                                            />
                                                        </div>
                                                    ) : fields.type === 'checkbox' ? (
                                                        <label className="checkbox checkbox-outline-primary mb-0">
                                                            <input
                                                                type="checkbox"
                                                                id={`form-${fields.field}`}
                                                                name={fields.field}
                                                                checked={formData[fields.field] === 1}
                                                                onChange={(e) =>
                                                                    props.handleFormData(
                                                                        fields.type,
                                                                        fields.field,
                                                                        e.target.checked ? 1 : 0
                                                                    )
                                                                }
                                                            />
                                                            <span>{fields.text}</span>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    ) : fields.type === 'textarea' ? (
                                                        <div
                                                            className={`form-group validate-input ${fields.required ? 'required-input' : ''
                                                                } ${fields.hasError ? 'error' : ''}`}
                                                        >
                                                            <label className="label-form-control">
                                                                {fields.text}
                                                                {fields.required && <span className="text-danger"> * </span>}
                                                            </label>
                                                            <textarea
                                                                className="form-control"
                                                                id={`form-${fields.field}`}
                                                                name={fields.field}
                                                                autoComplete="off"
                                                                placeholder={fields.placeholder || `Enter ${fields.text}`}
                                                                defaultValue={formData[fields.field]}
                                                                onChange={(e) => checkValidation(fields.field, e.target.value)}
                                                                onBlur={(e) =>
                                                                    props.handleFormData(fields.type, fields.field, e.target.value)
                                                                }
                                                                disabled={fields.disabled}
                                                                rows={3}
                                                            />
                                                        </div>
                                                    ) :
                                                        fields.type === 'dropdown' ? (
                                                            <div className={`form-group validate-input ${fields.required ? 'required-input' : ''} ${fields.hasError ? 'error' : ''}`}>
                                                                <label className="label-form-control">
                                                                    {fields.text}
                                                                    {fields.required && <span className="text-danger"> * </span>}
                                                                </label>

                                                                <SelectPickerRsuite
                                                                    data={getCurrentState().masterdata[fields.masterdata]}
                                                                    placeholder={fields.placeholder}
                                                                    onChange={(value) => props.handleFormData(fields.type, fields.field, value)}
                                                                    disabled={fields.disabled}
                                                                    value={formData[fields.field]}
                                                                    className="col-12 h-35p"
                                                                    id={`form-${fields.field}`}
                                                                    name={fields.field}
                                                                />
                                                            </div>

                                                        ) :
                                                            fields.type === 'html-editor' ?
                                                            (
                                                                <div
                                                                    className={`form-group validate-input ${fields.required ? 'required-input' : ''
                                                                        } ${fields.hasError ? 'error' : ''}`}
                                                                >
                                                                    <label className="label-form-control">
                                                                        {fields.text}
                                                                        {fields.required && <span className="text-danger"> * </span>}
                                                                    </label>
                                                                    <JoditEditorComponent
                                                                        value={formData[fields.field] || fields.defaultvalue || ""}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value;
                                                                            checkValidation(fields.field, value);
                                                                            props.handleFormData(fields.type, fields.field, value);
                                                                        }}
                                                                        placeholder={fields.placeholder || `Enter ${fields.text}`}
                                                                        disabled={fields.disabled}
                                                                        height={fields.height || 300}
                                                                        id={`form-${fields.field}`}
                                                                        name={fields.field}
                                                                        config={{
                                                                            toolbarPreset: fields.toolbarPreset || 'standard',
                                                                            ...fields.editorConfig
                                                                        }}
                                                                    />
                                                                </div>
                                                            )
                                                            :
                                                            fields.type === 'datepicker' ? (
                                                                <div className={`form-group validate-input ${fields.required ? 'required-input' : ''
                                                                    } ${fields.hasError ? 'error' : ''}`}
                                                                >
                                                                    <label className="label-form-control">
                                                                        {fields.text}
                                                                        {fields.required && <span className="text-danger"> * </span>}
                                                                    </label>
                                                                    <DatePicker
                                                                        defaultValue={formData[fields.field] ? new Date(formData[fields.field]) : null}
                                                                        onChange={(value) => props.handleFormData(fields.type, fields.field, value)}
                                                                        disabled={fields.disabled}
                                                                        id={`form-${fields.field}`}
                                                                        name={fields.field}
                                                                        placeholder={fields.placeholder || `Select ${fields.text}`}
                                                                        style={{ width: '100%' }}
                                                                        size="md"
                                                                        format="yyyy-MM-dd"
                                                                        cleanable={fields.cleanable || false}
                                                                    />
                                                                </div>
                                                            ) :
                                                            <></>
                                                            }
                                                </div>
                                            ))}
                                        </>

                                }
                            </div>
                        </form >
                    }
                    footer={
                        <div className="d-flex gap-10">
                            <button className="btn btn-primary" onClick={() => props.handleAddButtonClick()}>Save</button>
                            <button className="btn btn-secondary" onClick={() => { IISMethods.handleGrid(false, 'rightsidebar', 0) }}>Cancel</button>
                        </div>
                    }
                />

                <ModalRsuite
                    open={getCurrentState().modal.viewdetails}
                    onClose={() => { IISMethods.handleGrid(false, 'viewdetails', 0) }}
                    title="View Details"
                    size={getCurrentState().rightsidebarformdata?.[0]?.rightsidebarsize}
                    body={
                        <div className="row">
                            {
                                getCurrentState().rightsidebarformdata?.length > 1 ?
                                    getCurrentState().rightsidebarformdata.map((tab, tabindex) => (
                                        <>
                                            {

                                                <>
                                                    <div key={`tab-${tabindex}-${tab.tabname}`}>
                                                        <label className="form-label text-14p">{tab.tabname}</label>
                                                        <div>
                                                            {
                                                                tab.fields.map((field, fieldindex) => (
                                                                    <div key={`field-${tabindex}-${fieldindex}-${field.field || field.text}`}>
                                                                        <label className="form-label text-14p">{field.text}</label>
                                                                        <div>{props.viewDetails[field.field] ? props.viewDetails[field.field] : '-'}</div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </>
                                    ))

                                    :
                                    <>
                                        {getCurrentState().rightsidebarformdata?.[0]?.fields.map((field, index) => (
                                            <RenderViewField
                                                key={`field-${field.field}-${index}`}
                                                field={field}
                                                viewDetails={props.viewDetails}
                                                index={index}
                                            />
                                        ))}

                                    </>
                            }
                        </div >
                    }
                    footer={
                        <div className="d-flex gap-10">
                            <button className="btn btn-primary" onClick={() => IISMethods.handleGrid(false, 'viewdetails', 0)}>Close</button>
                        </div>
                    }
                />
            </>
        );
    } catch (e) {
        console.log('error', e);
        return <></>;
    }
}

export default RightSidebar;