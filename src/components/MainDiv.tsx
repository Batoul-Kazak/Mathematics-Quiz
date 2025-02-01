import React from "react";

function MainDiv({ children }: React.FC<{ children?: React.ReactNode }>) {
    return <main className="main">
        {children}
    </main>
}

export default MainDiv;