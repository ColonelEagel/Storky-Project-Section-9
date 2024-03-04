import React from "react";

export default function Button({ children,...props }) {
    return (
        <button className="px-4 py-2 text-xs md:text-base rounded-md bg-sky-700 text-sky-50 hover:bg-sky-600 hover:text-sky-100"
            { ...props }
        >
            { children }
        </button>
    );
}
