import React from "react";
import SidebarComponents from "./SidebarComponents";
import { Outlet } from "react-router-dom";
import FooterEnd from "./FooterEnd";

const LayoutAdmin = () => {
    return (
        <div>
            <SidebarComponents>
                <Outlet />
            </SidebarComponents>
            <FooterEnd />
        </div>
    )
}

export default LayoutAdmin;