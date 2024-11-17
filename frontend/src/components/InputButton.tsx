"use client";

export const InputButton = ({
  label,
  placeholder,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: "text" | "password";
}) => {
  return (
    <div className="pb-2">
      <div className="font-semibold pb-1 text-sm">* {label}</div>
      <input
        className="border-2 px-2 py-1 rounded-sm w-full"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
