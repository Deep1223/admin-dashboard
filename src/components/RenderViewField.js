'use client';

import IISMethods from '@/utils/IISMethods';

const RenderViewField = (props) => {
    if (props.field.type === 'text') {
        return (
            <div className={props.field.size}>
                <div className="form-group validate-input">
                    <label className="label-form-control text-black font-weight-600 text-14">{props.field.text}</label>
                    <span className="text-14 fw-semibold text-secondary render-view-description text-break">
                        {props.viewDetails[props.field.field] ? props.viewDetails[props.field.field] : '-'}
                    </span>
                </div>

            </div>
        )
    }
    else if (props.field.type === 'checkbox') {
        return (
            <div className={props.field.size}>
                <div className="form-group validate-input">
                    <label className="checkbox checkbox-outline-primary mb-0">
                        <input type="checkbox"
                            id={`form-${props.field.field}`}
                            name={props.field.field}
                            checked={props.viewDetails[props.field.field] && (props.viewDetails[props.field.field] == 1 || props.viewDetails[props.field.field] == '1') ? 1 : 0} disabled />
                        <span className="text-14 fw-semibold text-black render-view-description text-break">{props.field.text}</span>
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        )
    }
    else if (props.field.type === 'textarea') {
        return (
            <div className={props.field.size}>
                <div className="form-group validate-input">
                    <label className="label-form-control text-black font-weight-600 text-14 mb-0">{props.field.text}</label>
                    <span className="text-14 fw-semibold text-secondary render-view-description text-break">
                        {props.viewDetails[props.field.field] ? props.viewDetails[props.field.field] : '-'}
                    </span>
                </div>
            </div>
        )
    }
    else if (props.field.type === 'html-editor') {
        return (
            <div className={props.field.size}>
                <div className="form-group validate-input">
                    <label className="label-form-control text-black font-weight-600 text-14 mb-0">{props.field.text}</label>
                    <div className="text-14 fw-semibold text-secondary render-view-description text-break">
                        {props.viewDetails[props.field.field] ? (
                            <div 
                                dangerouslySetInnerHTML={{ 
                                    __html: props.viewDetails[props.field.field] 
                                }}
                                style={{
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '4px',
                                    padding: '12px',
                                    backgroundColor: '#f9fafb',
                                    minHeight: '100px'
                                }}
                            />
                        ) : '-'}
                    </div>
                </div>
            </div>
        )
    }
    else if (props.field.type === 'datepicker') {
        return (
            <div className={props.field.size}>
                <div className="form-group validate-input">
                    <label className="label-form-control text-black font-weight-600 text-14 mb-0">{props.field.text}</label>
                    <span className="text-14 fw-semibold text-secondary render-view-description text-break">
                        {props.viewDetails[props.field.field] ? IISMethods.getDateFormate(props.viewDetails[props.field.field]) : '-'}
                    </span>
                </div>
            </div>
        )
    }
    else if (props.field.type === 'dropdown') { 
        return (
            <div className={props.field.size}>  
                <div className="form-group validate-input"> 
                    <label className="label-form-control text-black font-weight-600 text-14 mb-0">{props.field.text}</label>
                    <span className="text-14 fw-semibold text-secondary render-view-description text-break">
                        {
                            props.field.takeformdatafield ? 
                            props.viewDetails[props.field.formdatafield] ? props.viewDetails[props.field.formdatafield] : '-' :
                            props.viewDetails[props.field.field] ? props.viewDetails[props.field.field] : '-'
                        }
                    </span>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={props.field.size}>
                <div className="form-group validate-input">
                    <label className="label-form-control text-black font-weight-600 text-14 mb-0">{props.field.text}</label>
                    <span className="text-14 fw-semibold text-secondary render-view-description text-break">
                        {props.viewDetails[props.field.field] ? props.viewDetails[props.field.field] : '-'}
                    </span>
                </div>
            </div>
        );
    }
}

export default RenderViewField;