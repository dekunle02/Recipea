type ToggleProps = {
  value: boolean;
  onToggle: (newValue: boolean) => void;
};

function Toggle(props: ToggleProps) {
  const { value, onToggle } = props;

  if (value) {
    return (
      <button
        className="py-1 px-3 bg-teal-600"
        onClick={() => onToggle(!value)}
      >
        True
      </button>
    );
  } else {
    return (
      <button className="py-1 px-3 bg-rose-600" onClick={() => onToggle(value)}>
        False
      </button>
    );
  }
}

export default Toggle;
