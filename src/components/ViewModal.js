import Modal from "./modal";

const ViewModal = (props) => {
    try {
        return (
            <Modal
                open={props.modalViewOpen}
                onClose={() => props.setModalViewOpen(false)}
                header={<h2 className="h5 fw-semibold">{props.title}</h2>}
                body={
                    <div className="row g-3">
                        {props.fieldOrder.map((field) => (
                            <div key={field.field} className="col-md-6">
                                <label className="form-label fw-medium text-secondary">{field.label}</label>
                                <div className="text-secondary">{props.viewDetails?.[field.field] ?? "N/A"}</div>
                            </div>
                        ))}
                    </div>
                }
                footer={
                    <button
                        onClick={() => props.setModalViewOpen(false)}
                        className="btn btn-secondary"
                    >
                        Close
                    </button>
                }
            />
        );
    } catch (e) {
        console.log(e);
        return <></>;
    }
};

export default ViewModal;
