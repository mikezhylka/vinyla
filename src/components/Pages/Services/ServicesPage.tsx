import { FC } from "react";
import { useScroll } from "../../../hooks/useScroll";
import { Breadcrumbs } from "../../blocks/Breadcrumbs";
import { Button } from "./components/Button/Button";
import { ServiceInfo } from "./components/ServiceInfo/ServiceInfo";
import { services } from "./config";
import styles from "./index.module.scss";

export const ServicesPage: FC = () => {
  useScroll({ options: { top: 0, behavior: "instant" } });

  return (
    <main className={styles.main}>
      <Breadcrumbs disabledPath="services" />
      <section className={styles["hero"]}>
        <img
          className={styles["hero__banner"]}
          src="./images/banners/services-banner.png"
          alt="Vinyl"
        />
        <h3 className={styles["hero__title"]}>
          Our services are tailored to every vinyl lover's needs—rare records,
          premium restoration, or custom pressing. Your music, your way
        </h3>
        <Button cn="hero__contact-us-btn" title="Contact us" to="/contact" />
      </section>
      <section className={styles["services"]}>
        {services.map((service, index) => (
          <ServiceInfo key={service.title + index} service={service} />
        ))}
      </section>
      <Button cn="go-to-shop-btn" title="Go to shop" to="/shop" />
    </main>
  );
};
