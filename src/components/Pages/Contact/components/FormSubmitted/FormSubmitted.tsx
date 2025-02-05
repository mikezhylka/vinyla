import { useNavigate } from "react-router";
import { useScroll } from "../../../../../hooks/useScroll";
import styles from "./index.module.scss";

export const FormSubmitted: React.FC = () => {
  const navigate = useNavigate();

  useScroll({options: {top: 0, behavior: "instant"}});

  return (
    <main className={styles.main}>
      <p className={styles["main__title"]}>
        Thank you! Form has been submitted
      </p>
      <button className={styles["main__go-back"]} onClick={() => navigate("/")}>
        Go to Home page
      </button>
    </main>
  );
};
