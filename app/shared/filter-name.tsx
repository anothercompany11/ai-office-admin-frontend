interface FilterNameProps {
  name: string;
  size?: "sm" | "md";
}

const FilterName = ({ name, size = "md" }: FilterNameProps) => {
  return (
    <p
      className={`flex w-[160px] shrink-0 items-center border-r bg-natural px-5  ${size === "sm" ? "h-10 text-title-m" : "min-h-[52px] text-title-m"}`}
    >
      {name}
    </p>
  );
};
export default FilterName;
