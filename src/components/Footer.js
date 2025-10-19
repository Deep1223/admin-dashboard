const Footer = () => {
    try {
        return (
            <footer className="text-center py-3 small w-100 border-top" style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                color: '#64748b',
                borderTop: '1px solid #cbd5e1'
            }}>
                © Copyright <span className="fw-bold" style={{color: '#1e293b'}}>DEMO</span>. All Rights Reserved
            </footer>
        );
    } catch (e) {
        console.log(e);
        return <></>;
    }
}

export default Footer;