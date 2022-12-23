import { AiOutlineLoading3Quarters } from "react-icons/ai";
export enum LoadState {
  Loading = "loading",
  Default = "default",
  Success = "success",
  Failure = "failure",
}

interface SpinnerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loadState: LoadState;
}

function SpinnerButton(props: SpinnerButtonProps) {
  return (
    <button
      {...props}
      disabled={props.loadState === LoadState.Loading}
      className={`${props.className} flex flex-row items-center justify-center gap-3`}
    >
      {props.loadState === LoadState.Loading && (
        <AiOutlineLoading3Quarters className="animate-spin" />
      )}
      {props.children}
    </button>
  );
}

export default SpinnerButton;
