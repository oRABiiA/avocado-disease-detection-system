import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../shared/logo/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    title: "Generate Reports",
    href: "/dashboard",
    icon: "bi bi-flag",
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
            <NavItem  key={index} className="sidenav-bg">
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
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
