interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  toggleState: boolean;
}

function ToggleButton({ label, toggleState, ...otherProps }: ToggleProps) {
  return (
    <div className="flex flex-row items-center gap-3">
      <span className="label">{label}</span>
      <button
        className={`py-1 px-5 rounded  ${
          toggleState ? "bg-teal-600" : "bg-rose-600"
        } `}
        {...otherProps}
      >
        {toggleState ? "True" : "False"}
      </button>
    </div>
  );
}

export default ToggleButton;
