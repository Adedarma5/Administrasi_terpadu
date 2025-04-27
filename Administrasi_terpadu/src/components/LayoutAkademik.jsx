import React from "react";
import SidebarAkademikComponents from "./SidebarAkademikComponents";
import { Outlet } from "react-router-dom";
import FooterEnd from "./FooterEnd";

const LayoutAkademik = () => {
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(to top,rgb(255, 255, 255) 70%,rgb(19, 120, 235) 30%)"
        }}>
            <SidebarAkademikComponents>
                <Outlet />
            </SidebarAkademikComponents>
        </div>
    )
}

export default LayoutAkademik;