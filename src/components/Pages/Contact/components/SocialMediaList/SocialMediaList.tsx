import { Link } from "react-router";
import { socialMedias } from "../../../../../constants/contacts";
import styles from "./index.module.scss";

export const SocialMediaList: React.FC = () => (
  <ul className={styles["contacts__list"]}>
    {socialMedias.map((media) => (
      <li key={media} className={styles["list__item"]}>
        <Link
          className={styles["list__item-link"]}
          to={media}
          onClick={(e) => e.preventDefault()}
        >
          {media}
        </Link>
      </li>
    ))}
  </ul>
);
