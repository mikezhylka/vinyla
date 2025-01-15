import classNames from "classnames";
import { NavLink } from "react-router";
import { useProductContext } from "../../../contexts/Product/useProductContext";
import { topBarLinks } from "../../blocks/Header/config";
import "./index.scss";

export const Menu: React.FC = () => {
  const { setIsMenuShown } = useProductContext();

  return (
    <main>
      <aside className="menu">
        <nav className="menu__navigation">
          <ul className="menu__list">
            {topBarLinks.map((item) => (
              <li className="menu__list-item" key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) => {
                    return classNames("menu__link", {
                      "menu__link--active": isActive,
                      "menu__link--buy-in-one-click": item.id === 4
                    });
                  }}
                  onClick={() => setIsMenuShown(false)}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </main>
  );
};
