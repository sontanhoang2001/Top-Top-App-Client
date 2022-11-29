import { useEffect } from "react";

function Title({ titleString }) {
    useEffect(() => {
        document.title = `TopTop - ${titleString}`;
    }, []);
}

export default Title;