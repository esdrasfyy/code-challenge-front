export function ErrorUi({ message }: { message: string }) {
  return <p className="absolute -bottom-4.5 mt-1 text-xs text-red-500 italic">{message}</p>;
}
