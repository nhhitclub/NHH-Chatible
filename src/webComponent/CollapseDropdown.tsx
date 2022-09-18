import React, { SetStateAction, useEffect, useId, useRef, useState } from "react";

export default function (props: any) {
    const id = useId().replace(/:/g, '');
    const ref = useRef(null);
    const [icon, setIcon] = useState(<i className="bi bi-caret-down"></i> as any);
    const [isOpen, setOpen] = useState(true);

    const toggleIcon = () => {
        toggleEvent(null)
    }

    const toggleEvent = (e: any) => {

        if (isOpen) {
            setIcon(<i className="bi bi-caret-up"></i> as any)
            setOpen(false)
            return
        }
        setIcon(<i className="bi bi-caret-down"></i> as any)
        setOpen(true)
    }

    return (
        <>
            <a className="border-start border-dark border-4 
                        d-flex text-dark text-decoration-none display-6 fs-3
                        ps-3 py-2" data-bs-toggle="collapse"
                href={"#" + id} role="button" aria-expanded="true" aria-controls={id} onDoubleClick={() => { }} onClick={toggleEvent} >
                {props.title}
                <span className="d-block ms-auto">{icon}</span>
            </a>
            <div className="collapse show mt-2 ps-2 ms-4" id={id} ref={ref}>
                {props?.children}
            </div>
        </>
    );
}
