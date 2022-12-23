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

function SpinnerButton({
  loadState,
  className,
  children,
  ...otherProps
}: SpinnerButtonProps) {
  return (
    <button
      {...otherProps}
      disabled={loadState === LoadState.Loading}
      className={`${className} flex flex-row items-center justify-center gap-3`}
    >
      {loadState === LoadState.Loading && (
        <AiOutlineLoading3Quarters className="animate-spin" />
      )}
      {children}
    </button>
  );
}

export default SpinnerButton;
