import {PaginationValues} from "../types";

export function parsePagination(pagination: string | null) {
  let paginationValues: PaginationValues = {
    next: null,
    prev: null,
    first: null,
    last: null,
  };
  if (pagination) {
    const regex = /<([^>]+)>/;
    const linksArray = pagination.split(",");

    let paginationKey: keyof typeof paginationValues;

    for (paginationKey in paginationValues) {
      linksArray.forEach(link => {
        if (link.includes(paginationKey)) {
          const url = link.match(regex);
          if (url) {
            const urlParams = new URLSearchParams(url[1].split("?")[1]);
            const pageValue = urlParams.get("page");
            if (pageValue) {
              paginationValues = {
                ...paginationValues,
                [paginationKey]: pageValue,
              };
            }
          }
        }
      });
    }
  }
  return paginationValues;
}
