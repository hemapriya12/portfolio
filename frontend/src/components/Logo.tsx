export function Logo() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black shadow-sm">
      <svg viewBox="0 0 100 100" className="h-[58%] w-[58%]">
        <path
          d="M25 14 L25 86"
          fill="none"
          stroke="#ffffff"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M75 14 L75 86"
          fill="none"
          stroke="#ffffff"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M25 40 C25 54 47 40 50 50 C53 60 75 46 75 60"
          fill="none"
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
