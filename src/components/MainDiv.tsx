import React, { ReactElement } from "react";

function MainDiv({ children }) {
    return <main className="main">
        {children}
    </main>
}

export default MainDiv;