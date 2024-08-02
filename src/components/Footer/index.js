import React from "react";
import './style.css'

function Footer({controlsContent}) {
    return (
        <footer style={{ flexGrow: 1 }}>
            <div>
                {controlsContent.map((t, i) => 
                    <p key={i}>{t}</p>
                )}
            </div>
        </footer>
    )
}

export default Footer