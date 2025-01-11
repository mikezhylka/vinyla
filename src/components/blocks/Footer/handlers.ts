import cn from "classnames";

export function addFooterItemClassName(link: string) {
  return cn(
    "footer__item",
    link !== "Privacy Policy" ? "footer__item--sm" : "footer__item--policy"
  );
}
