import { FC } from "react";
import { useNavigate } from "react-router";
import { ButtonUsedInPage } from "../../../../../types/ButtonUsedOnPage";
import styles from "./Button.module.scss";

type Props = {
  cn: string;
  usedIn?: ButtonUsedInPage;
  title: string;
  to: string;
};

export const Button: FC<Props> = ({ cn, title, to }) => {
  const navigate = useNavigate();

  return (
    <button className={styles[cn]} onClick={() => navigate(to)}>
      {title}
    </button>
  );
};
