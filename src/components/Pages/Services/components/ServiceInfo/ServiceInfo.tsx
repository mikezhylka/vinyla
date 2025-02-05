import { FC } from "react";
import { Service } from "../../../../../types/Service";
import styles from "./ServiceInfo.module.scss";

type Props = {
  service: Service;
};

export const ServiceInfo: FC<Props> = ({ service }) => {
  const { title, description, icon } = service;

  return (
    <div className={styles.service}>
      <div className={styles["service__icon-title-wrapper"]}>
        <img className={styles.service__icon} src={icon} alt="" />
        <h4 className={styles.service__title}>{title}</h4>
      </div>
      <p className={styles.service__description}>{description}</p>
    </div>
  );
};
