import { products } from "../../../api/products";
import { productsPerPage } from "../../Pages/ShopPage/config";

import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../../context/useAppContext";

import { addPaginationBtnClass, addRecommendationsBtnClass } from "./handlers";

// import styles from "../../Pages/ProductPage/index.module.scss";
import breadcrumbsStyles from "../Breadcrumbs/index.module.scss";

import { Product } from "../../../types/Product";
import { UsedFor } from "../../../types/UsedFor";

type Props = {
  usedFor: UsedFor;
  type: "prev" | "next";
  recommendedProducts?: Product[];
};

export const ArrowButton: React.FC<Props> = ({
  usedFor,
  type,
  recommendedProducts,
}) => {
  const { recommendedPage, setRecommendedPage, breadcrumbsLinkRef } =
    useAppContext();
  const { page } = useParams();
  const navigate = useNavigate();
  let normalizedPage = null;
  const linkHref = breadcrumbsLinkRef.current?.href;

  if (usedFor === "pagination") {
    normalizedPage = +(page as string) || 1;
  }

  const pages = Math.ceil(products.length / productsPerPage);
  const usedAsPaginationPrev =
    usedFor === "pagination" && type === "prev" && normalizedPage;

  const navigateToPage = usedAsPaginationPrev
    ? normalizedPage! - 1
    : normalizedPage! + 1;

  function addDisabled() {
    switch (usedFor) {
      case "recommendations":
        return (
          (recommendedPage === 1 && type === "prev") ||
          (recommendedPage >= 3 && type === "next")
        );
      case "pagination":
        return +page! === 1 || +page! >= pages;
      case "breadcrumb":
        return false;
    }
  }

  function getClassName() {
    switch (usedFor) {
      case "pagination":
        return addPaginationBtnClass(type, pages, normalizedPage!);

      case "recommendations":
        return addRecommendationsBtnClass(
          type,
          recommendedPage,
          recommendedProducts
        );

      case "breadcrumb":
        return breadcrumbsStyles["breadcrumbs__go-back"];
      default:
        return;
    }
  }

  function handleSettingRecommendedPage() {
    return type === "prev"
      ? setRecommendedPage((prev) => prev - 1)
      : setRecommendedPage((prev) => prev + 1);
  }

  function handleClick() {
    switch (usedFor) {
      case "pagination":
        return navigate(`/shop/pages/${navigateToPage}`);
      case "recommendations":
        return handleSettingRecommendedPage();
      case "breadcrumb":
        return (
          linkHref &&
          navigate(
            `../${
              linkHref.includes("cart")
                ? ""
                : linkHref.slice(linkHref.indexOf("#") + 1)
            }`
          )
        );
    }
  }

  return (
    <button
      className={getClassName()}
      onClick={handleClick}
      disabled={addDisabled()}
    />
  );
};
