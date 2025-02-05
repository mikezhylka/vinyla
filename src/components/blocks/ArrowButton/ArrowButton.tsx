import { products } from "../../../api/products";
import { UsedForInArrowBtn } from "../../../types/UsedForInArrowBtn";
import { productsPerPage } from "../../pages/Shop/config";

import { useNavigate, useParams } from "react-router";
import { useProductContext } from "../../../contexts/Product/useProductContext";

import classNames from "classnames";
import styles from "./ArrowButton.module.scss";

type Props = {
  cn: string;
  usedFor: UsedForInArrowBtn;
  type: "prev" | "next";
  to?: string;
};

export const ArrowButton: React.FC<Props> = ({ cn, usedFor, type, to }) => {
  const { recommendedPage, setRecommendedPage } = useProductContext();
  const { page } = useParams();
  const navigate = useNavigate();
  const normalizedPage = usedFor === "pagination" && page ? +page : 1;
  const normalizedCn = cn.includes(" ")
    ? classNames(cn.split(" ").map((cn) => styles[cn]))
    : styles[cn];

  const totalPages = Math.ceil(products.length / productsPerPage);

  function handleAddingDisabled() {
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

  function handleNavigation() {
    return to
      ? navigate(to)
      : setRecommendedPage((prev) => (type === "prev" ? prev - 1 : prev + 1));
  };

  return (
    <button
      className={normalizedCn}
      onClick={handleNavigation}
      disabled={handleAddingDisabled()}
    />
  );
};
