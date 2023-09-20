import { useState, useEffect } from 'react';
import { Modal } from 'antd';

function PDFModal({ pdfHandler, open, setVisible }) {
    const [pdfSrc, setPdfSrc] = useState("");

    useEffect(() => {
        if (open) {
            setPdfSrc(pdfHandler(false));
        }
    }, [open])

    const handleCancel = () => {
        setVisible(false);
    };


    return (
        <div>
            <Modal
                title=""
                open={open}
                width={1000}
                onCancel={handleCancel}
            >
                <iframe
                    src={pdfSrc}
                    style={{ width: '100%', height: '500px' }}
                    title="PDF Viewer"
                >
                </iframe>
            </Modal>
        </div>
    )
}
export default PDFModal;