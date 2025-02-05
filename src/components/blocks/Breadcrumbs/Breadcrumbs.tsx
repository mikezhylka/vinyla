import cn from "classnames";
import { FC, useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { ArrowButton } from "../ArrowButton";
import styles from "./Breadcrumbs.module.scss";
import homeIcon from "/public/images/icons/home.svg";

type Props = {
  omittedPath?: string;
  disabledPath?: string;
  cnModifier?: string;
};

export const Breadcrumbs: FC<Props> = ({
  omittedPath,
  disabledPath,
  cnModifier,
}) => {
  const { breadcrumbsLinkRef, isOnDesktop } = useAppContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activePathSegments = useMemo(
    () =>
      pathname
        .trim()
        .slice(1) // get rid of first slash in path
        .split("/")
        .filter((path) => path !== omittedPath && !parseInt(path)), // exclude URL Params like productId and Prop if given
    [omittedPath, pathname]
  );

  return (
    <div
      className={cn([styles["breadcrumbs"]], {
        [styles["breadcrumbs--product-page"]]: cnModifier === "product-page",
      })}
    >
      {!isOnDesktop && (
        <ArrowButton
          cn="breadcrumbs__arrow arrow arrow--breadcrumbs"
          usedFor="breadcrumb"
          type="prev"
        />
      )}
      <img
        className={styles["breadcrumbs__home-icon"]}
        src={homeIcon}
        alt="Home"
        onClick={() => pathname !== "/" && navigate("/")}
      />
      <div className={styles.breadcrumbs__path}>
        {activePathSegments.map((part, index) => {
          const link = "/" + activePathSegments.slice(0, index + 1).join("/");

          return (
            <NavLink
              key={`${index}-${part}`}
              className={cn(styles.breadcrumbs__link, {
                [styles["breadcrumbs__link--disabled"]]: part === disabledPath,
              })}
              to={link}
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
