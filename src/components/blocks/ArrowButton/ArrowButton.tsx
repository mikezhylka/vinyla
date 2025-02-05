import { products } from "../../../api/products";
import { UsedForInArrowBtn } from "../../../types/UsedForInArrowBtn";
import { productsPerPage } from "../../pages/Shop/config";

import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../../contexts/App/useAppContext";
import { useProductContext } from "../../../contexts/Product/useProductContext";

import classNames from "classnames";
import styles from "./ArrowButton.module.scss";

type Props = {
  cn: string;
  usedFor: UsedForInArrowBtn;
  type: "prev" | "next";
};

export const ArrowButton: React.FC<Props> = ({ cn, usedFor, type }) => {
  const { recommendedPage, setRecommendedPage } = useProductContext();
  const { breadcrumbsLinkRef } = useAppContext();
  const { page } = useParams();
  const navigate = useNavigate();
  const normalizedPage = usedFor === "pagination" && page ? +page : 1;
  const linkHref = breadcrumbsLinkRef.current?.href;
  const normalizedCn = cn.includes(" ")
    ? classNames(cn.split(" ").map((cn) => styles[cn]))
    : styles[cn];

  const totalPages = Math.ceil(products.length / productsPerPage);
  const usedAsPaginationPrev = usedFor === "pagination" && type === "prev";

  const navigateToPage = usedAsPaginationPrev
    ? normalizedPage - 1
    : normalizedPage + 1;

  const handleAddingDisabled = () => {
    switch (usedFor) {
      case "recommendations":
        return (
          (recommendedPage === 1 && type === "prev") ||
          (recommendedPage >= totalPages && type === "next")
        );
      case "pagination":
        return (
          (normalizedPage === 1 && type === "prev") ||
          (normalizedPage >= totalPages && type === "next")
        );
      case "breadcrumb":
        return false; // always enabled
    }
  };

  const handleClick = () => {
    switch (usedFor) {
      case "pagination":
        return navigate(`/shop/pages/${navigateToPage}`);
      case "recommendations":
        setRecommendedPage((prev) => (type === "prev" ? prev - 1 : prev + 1));
        break;
      case "breadcrumb":
        return navigate(`../${linkHref?.slice(linkHref.indexOf("#") + 1)}`);
    }
  };

  return (
    <button
      className={normalizedCn}
      onClick={handleClick}
      disabled={handleAddingDisabled()}
    />
  );
};
