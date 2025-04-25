import React from "react";
import SidebarAkademikComponents from "./SidebarAkademikComponents";
import { Outlet } from "react-router-dom";
import FooterEnd from "./FooterEnd";

const LayoutAkademik = () => {
    return (
        <div>
            <SidebarAkademikComponents>
                <Outlet />
            </SidebarAkademikComponents>
        </div>
    )
}

export default LayoutAkademik;