import { useEffect } from "react";

/**
 * Hook used to detect a click outside an opened menu
 * @param ref reference object holding an element that wraps the menu
 * @param onClickOutside callback function to set a state to control visibility of the menu
 */
function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export default useClickOutside;