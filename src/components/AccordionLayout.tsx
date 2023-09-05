import { useState } from "react";
import './accordian.css'

const AccordionLayout = ({ title, children ,onClick}: any) => {
    const [isOpen, setOpen] = useState(false);
    return (
        <div className="shadow-md py-2  mt-4 bg-gray-50 rounded-none " onClick={onClick}>
            <div
                className={`accordion-title ${isOpen ? "open" : ""}`}
                onClick={() => setOpen(!isOpen)}
            >
                {title}
            </div>
            <div className={`accordion-item bg-white ${!isOpen ? "collapsed" : ""}`}>
                <div className="accordion-content">{children}</div>
            </div>
        </div>
    );
};

export default AccordionLayout;

