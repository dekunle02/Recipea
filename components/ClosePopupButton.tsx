import { usePopup } from "../hooks/PopupContext";
import { MdOutlineClose } from "react-icons/md";

function ClosePopupButton() {
  const popup = usePopup();

  return (
    <button
      onClick={() => {
        popup?.dismiss();
      }}
      className="text-2xl hover:bg-colorBlack/10 active:bg-colorBlack/20 
        rounded-full p-3 ml-auto absolute top-2 right-2"
    >
      <MdOutlineClose />
    </button>
  );
}

export default ClosePopupButton;
