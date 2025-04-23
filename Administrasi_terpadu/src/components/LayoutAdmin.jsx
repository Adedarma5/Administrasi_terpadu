import React from "react";
import SidebarComponents from "./SidebarComponents";
import { Outlet } from "react-router-dom";
import FooterEnd from "./FooterEnd";
import NavbarDashboardComponent from "./NavbarDashboardComponent";

const LayoutAdmin = () => {
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(to top,rgb(255, 255, 255) 70%,rgb(19, 120, 235) 30%)"
        }}>
            <SidebarComponents>
            <NavbarDashboardComponent />
                <Outlet />
            </SidebarComponents>
            <FooterEnd />
        </div>
    )
}

export default LayoutAdmin;