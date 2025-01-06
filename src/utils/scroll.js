import { useEffect } from "react"

export const useScroll = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
}
export const useScrollBottom = () => {
  useEffect(() => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  }, []);
};