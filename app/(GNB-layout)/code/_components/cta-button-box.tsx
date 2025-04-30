import { Code } from "@/app/api/dto/code";

interface CTAButtonBoxProps {
  selectedIds: Array<Code["id"]>;
}
const CTAButtonBox = ({ selectedIds }: CTAButtonBoxProps) => {
  const logIds = (action: string) => () => console.log(`${action}:`, selectedIds);

  return (
    <div className="flex gap-2">
      <button onClick={logIds("삭제")} className="btn-primary">
        삭제하기
      </button>
      <button onClick={logIds("연장")} className="btn-outline">
        연장하기
      </button>
      <button onClick={logIds("생성")} className="btn-secondary">
        생성하기
      </button>
    </div>
  );
};
export default CTAButtonBox;
