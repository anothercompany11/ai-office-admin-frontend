import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TwoButtonBarProps {
  firstBtnTxt: string;
  secondBtnTxt: string;
  loading?: boolean;
  onClickFirstBtn?: () => void;
  onClickSecondBtn: () => void;
  secondBtnVariant?: "default" | "pink" | "destructive" | "outline" | "outline-black";
  size?: "md" | "sm" | "lg";
  disabled?: boolean;
}
const TwoButtonBar = ({
  firstBtnTxt,
  secondBtnTxt,
  onClickFirstBtn,
  onClickSecondBtn,
  loading,
  disabled,
}: TwoButtonBarProps) => {
  const router = useRouter();

  // 첫 번째 버튼(목록으로 버튼) 핸들러
  const onClickBack = () => router.back();
  return (
    <div className="flex max-w-max items-center gap-2">
      <Button type="button" onClick={onClickFirstBtn ?? onClickBack}>
        {firstBtnTxt}
      </Button>
      <Button
        loading={loading}
        type="button"
        onClick={onClickSecondBtn}
        disabled={disabled}
        className={disabled ? "bg-gray-300" : ""}
      >
        {secondBtnTxt}
      </Button>
    </div>
  );
};

export default TwoButtonBar;
