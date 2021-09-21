import { useLocation } from "react-router";

export function useQuery() {
    // eslint-disable-next-line no-undef
    return new URLSearchParams(useLocation().search);
}