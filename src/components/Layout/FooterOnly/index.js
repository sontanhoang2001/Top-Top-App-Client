import Footer from '~/components/Layout/DefaultLayout/Footer';

function FooterOnly({ children }) {
    return (
        <>
            <Footer />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default FooterOnly;
