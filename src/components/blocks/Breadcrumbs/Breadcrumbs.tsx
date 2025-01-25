import { useWindowSize } from "@uidotdev/usehooks";
import cn from "classnames";
import { NavLink, useLocation, useNavigate } from "react-router";
import { desktopWidth } from "../../../constants/breakpoints";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { ArrowButton } from "../ArrowButton";
import styles from "./index.module.scss";

export const Breadcrumbs: React.FC = () => {
  const { breadcrumbsLinkRef } = useAppContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const notOnDesktop = width && width < desktopWidth;

  function isPathActive(path: string) {
    return path !== "" && path !== "product" && !+path;
  }

  const activePathSegments = pathname.split("/").filter(isPathActive); // exclude not active paths

  return (
    <div className={styles.breadcrumbs}>
      {notOnDesktop && <ArrowButton usedFor="breadcrumb" type="prev" />}
      <img
        className={styles["breadcrumbs__home-icon"]}
        src="./images/icons/home.svg"
        alt="Home"
        onClick={() => navigate("/")}
      />
      <div className={styles.breadcrumbs__path}>
        {activePathSegments.map((part, index) => {
          const link = activePathSegments.slice(0, index + 1).join("/");

          return (
            <NavLink
              key={part}
              className={cn(styles.breadcrumbs__link, {
                [styles["breadcrumbs__link--disabled"]]: part === "cart",
              })}
              to={`../../${link}`}
              ref={breadcrumbsLinkRef}
            >
              / <span className={styles["breadcrumbs__link-text"]}>{part}</span>{" "}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
