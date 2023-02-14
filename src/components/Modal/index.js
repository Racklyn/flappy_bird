import React from "react"

import "./style.css"

function Modal({title, content, transparent = false, children}) {
    return (
        <div className={`modal ${!transparent ? 'dark-bg' : ''}`}>
            <h2>{title}</h2>
            {children}
            <p>{content}</p>
        </div>
    )
}

export default Modal