export default function EmptyMessage({ message }: { message?: string }) {
  return (
    <div className="p-5 my-2 bg-colorTextOnBlack/5 rounded-xl">
      <p className="text-center text-colorTextOnBlack/30 font-semibold">
        {message ?? "Nothing to See here.."}
      </p>
    </div>
  );
}
