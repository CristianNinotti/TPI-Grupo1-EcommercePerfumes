import { useMemo } from "react";

export function useFilteredProductsByName(products, searchTermino) {
  return useMemo(() => {
    if (!searchTermino) return products;
    const normalized = searchTermino.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(normalized));
  }, [products, searchTermino]);
}
