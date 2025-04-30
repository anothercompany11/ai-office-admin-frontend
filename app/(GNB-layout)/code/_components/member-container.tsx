import FilterAndTableContainer from "./filter-and-table-container";

const MemberContainer = () => {
  const data = [
    {
      id: "1",
      userNo: "1",
      userType: "user",
      createdAt: "Fri Jan 31 2025 22:55:16 GMT+0900",
      nickname: "test",
      email: "email@tes.com",
    },
  ];

  if (!data) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer data={data} />
    </div>
  );
};
export default MemberContainer;
