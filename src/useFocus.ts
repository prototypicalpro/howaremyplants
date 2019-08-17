import * as React from "react";

/** Simple hook to tell us if the tab is in focus */

const useFocus = (defaultState = false) => {
    const [state, setState] = React.useState(defaultState);

    React.useEffect(() => {
      const onFocus = () => setState(true);
      const onBlur = () => setState(false);
      window.addEventListener("focus", onFocus);
      window.addEventListener("blur", onBlur);
      return () => {
        window.removeEventListener("focus", onFocus);
        window.removeEventListener("blur", onBlur);
      };

    }, [setState]);

    return state;
};

export default useFocus;