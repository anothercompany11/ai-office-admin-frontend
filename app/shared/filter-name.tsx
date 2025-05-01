interface FilterNameProps {
  name: string;
}

const FilterName = ({ name }: FilterNameProps) => {
  return (
    <p className={`flex w-[160px] shrink-0 items-center border-r bg-background-natural px-5 min-h-[72px] text-title-m`}>
      {name}
    </p>
  );
};
export default FilterName;
