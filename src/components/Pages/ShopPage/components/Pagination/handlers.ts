import cn from "classnames";

export function addPageLinkClassName(pageArg: number, page: number) {
    return cn("pagination__page", {
      "pagination__page--active": pageArg === page,
    });
  }