import styles from "./navBarBase.module.css";

export function getSelectedClassname(pathname, route) {
    if (pathname === "/" && route === "/")
        return styles.buttonSelected;
    else if (route !== "/" && pathname.toLowerCase().startsWith(route.toLowerCase()))
    {
        return styles["button--selected"];
    }
    return ""
}
