import { Link, useNavigate } from "react-router";
import { useScroll } from "../../../hooks/useScroll";
import { Feedbacks } from "./components/Feedbacks";
import { Products } from "./components/Products";
import "./index.scss";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useScroll({options: {top: 0, behavior: "instant"}});

  return (
    <main className="main">
      <section className="vinyla-corner">
        <div className="vinyla-corner__title-wrap">
          <h5 className="vinyla-corner__title">Vinyla Corner</h5>
          <img
            className="vinyla-corner__icon"
            src="./images/icons/arrow-up-right.svg"
            alt="arrow-up"
          />
        </div>
        <p className="vinyla-corner__welcome-text">
          Welcome to Vinyla Corner, where music meets nostalgia in every groove.
          Explore our curated collection of timeless vinyl records, spanning
          genres from classic rock to indie gems. Immerse yourself in the rich
          sound and tactile experience of vinyl as you browse through our
          carefully selected titles.
        </p>
        <p className="vinyla-corner__guide-text">
          Our knowledgeable staff is here to guide you, whether you're a
          seasoned collector or just beginning your vinyl journey. Discover the
          magic of Vinyla Corner - where the love for music is timeless, and
          every record tells a story.
        </p>
        <button className="vinyla-corner__read-more">
          <a href="#read-more" className="vinyla-corner__read-more__link">
            Read more
          </a>
        </button>
      </section>
      <section className="popular-positions">
        <div className="popular-positions__title-wrap">
          <h5 className="popular-positions__title">
            The most popular positions
          </h5>
          <Link className="popular-positions__icon" to="/shop/genres/popular" />
        </div>
        <p className="popular-positions__intro-text">
          Discover our Vinyl Corner Shop's most sought-after treasures! From
          classic rock legends to rare jazz gems, our curated collection
          features the most popular vinyl records that capture the essence of
          musical nostalgia. Immerse yourself in the timeless allure of these
          iconic titles at Vinyla Corner Shop.
        </p>

        <Products />

        <button
          className="popular-positions__view-all"
          onClick={() => navigate("/shop")}
        >
          View all
        </button>
      </section>

      <Feedbacks />
    </main>
  );
};
