import Footer from './Footer';

function DefaultLayout({children}) {
    return (
        <>
            <Footer />
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </>
    );
}

export default DefaultLayout;
