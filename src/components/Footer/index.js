import React from "react";
import './style.css'

function Footer({controlsContent}) {
    return (
        <footer style={{ flexGrow: 1 }}>
            <strong>FLAPPY BIRD</strong>
            <hr/>
            <div>
                {controlsContent.map((t, i) => 
                    <p key={i}>{t}</p>
                )}
            </div>
        </footer>
    )
}

export default Footer