import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../shared/logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAlert } from "../../../../../../context/AlertContext";


const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Sensor Data",
    href: "/dashboard/pages/sensor-data",
    icon: "bi bi-bar-chart",
  },
  {
    title: "Alert",
    href: "/dashboard",
    icon: "bi bi-bell",
  },
  {
    title: "Calendar",
    href: "/dashboard/pages/calendar",
    icon: "bi bi-calendar",
  },
  {
    title: "Capture Photo",
    href: "/dashboard/pages/capture",
    icon: "bi bi-camera",
  },
  {
    title: "Features",
    href: "/dashboard/pages/features",
    icon: "bi bi-patch-check",
  }
];

const Sidebar = ({ showMobilemenu }) => {
  const location = usePathname();
  const currentURL = location.slice(0, location.lastIndexOf('/'));

  const { setShowPopup, alerts } = useAlert();
  const hasUnread = alerts.some((alert) => !alert.read);


  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          onClick={showMobilemenu}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
        {navigation.map((navi, index) => (
  <NavItem key={index} className="sidenav-bg">
    {navi.title === "Alert" ? (
      <span
        onClick={() => setShowPopup((prev) => !prev)}
        className="nav-link py-3 text-secondary position-relative"
        style={{ cursor: "pointer" }}
      >
        <i className={navi.icon}></i>
        <span className="ms-3 d-inline-block">Alert</span>
        {hasUnread && (
        <span
          className="position-absolute"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            right: "10px",
            width: "15px",
            height: "15px",
            backgroundColor: "red",
            borderRadius: "50%",
            border: "2px solid white",
          }}
        ></span>
)}
      </span>
    ) : (
      <Link
        href={navi.href}
        className={
          location === navi.href
            ? "text-primary nav-link py-3"
            : "nav-link text-secondary py-3"
        }
      >
        <i className={navi.icon}></i>
        <span className="ms-3 d-inline-block">{navi.title}</span>
      </Link>
    )}
  </NavItem>
))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
