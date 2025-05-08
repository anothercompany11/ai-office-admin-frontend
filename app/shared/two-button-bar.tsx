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
  firstBtnDisabled?: boolean;
}
const TwoButtonBar = ({
  firstBtnTxt,
  secondBtnTxt,
  onClickFirstBtn,
  onClickSecondBtn,
  loading,
  disabled,
  firstBtnDisabled,
  size,
}: TwoButtonBarProps) => {
  const router = useRouter();

  // 첫 번째 버튼(목록으로 버튼) 핸들러
  const onClickBack = () => router.back();
  return (
    <div className="flex items-center gap-2">
      <Button
        disabled={firstBtnDisabled}
        size={size}
        variant={"outline"}
        type="button"
        onClick={onClickFirstBtn ?? onClickBack}
      >
        {firstBtnTxt}
      </Button>
      <Button
        size={size}
        loading={loading}
        type="button"
        onClick={onClickSecondBtn}
        disabled={disabled || loading}
        className={disabled ? "bg-gray-300" : ""}
      >
        {secondBtnTxt}
      </Button>
    </div>
  );
};

export default TwoButtonBar;
