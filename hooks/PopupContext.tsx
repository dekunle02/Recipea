import React, { useState, useContext } from "react";

type PopupProviderProps = {
  children: React.ReactNode;
};

type PopupContextType = {
  show: (
    component: JSX.Element,
    onShow?: () => {},
    onDismiss?: () => {}
  ) => void;
  dismiss: () => void;
};

const PopupContext = React.createContext<PopupContextType | null>(null);

export function usePopup() {
  return useContext(PopupContext);
}

export function PopupProvider({ children }: PopupProviderProps) {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [onDismissCallback, setOnDismissCallback] = useState(() => () => {});

  const show = (
    component: JSX.Element,
    onShow?: () => {},
    onDismiss?: () => {}
  ) => {
    setContent(component);
    setShowPopup(true);
    if (onShow) {
      onShow();
    }
    if (onDismiss) {
      setOnDismissCallback(() => onDismiss());
    }
  };

  const dismiss = () => {
    setContent(<></>);
    setShowPopup(false);
    onDismissCallback();
    setOnDismissCallback(() => () => {});
  };

  const propObject = {
    show: show,
    dismiss: dismiss,
  };

  return (
    <PopupContext.Provider value={propObject}>
      {showPopup && (
        <div
          className="w-screen h-screen z-20 fixed top-0 right-0 bg-colorBlack/10 backdrop-blur-sm flex"
          onClick={dismiss}
        >
          <div
            className="mx-auto my-auto animate-slideup text-colorWhite"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}

      {children}
    </PopupContext.Provider>
  );
}
