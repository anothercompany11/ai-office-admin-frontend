import { useEffect } from "react";
import TwoButtonBar from "./two-button-bar";

interface TwoButtonModalProps {
  title: string; // 모달 타이틀
  desc?: string; // 모달 설명
  loading?: boolean; // 버튼 로딩 상태
  buttonText: string; // 버튼 텍스트
  onClickFirstBtn: () => void; // 버튼 핸들러
  onClickSecondBtn: () => void; // 버튼 핸들러
}

const TwoButtonModal = ({
  title,
  desc,
  loading,
  buttonText,
  onClickFirstBtn,
  onClickSecondBtn,
}: TwoButtonModalProps) => {
  // body overflow 설정
  useEffect(() => {
    // 모달이 열리면 body 스크롤을 막음
    document.body.style.overflow = "hidden";

    // 모달이 닫히면 body 스크롤을 다시 허용
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden bg-black/70">
      <div className="w-[642px] rounded-[20px] bg-white p-8">
        <div className="flex flex-col items-end gap-3">
          <div className="mr-auto flex flex-col gap-2">
            <p className="heading-3">{title}</p>
            {desc && <p className="body-1">{desc}</p>}
          </div>
          <TwoButtonBar
            loading={loading}
            firstBtnTxt="취소"
            secondBtnTxt={buttonText}
            onClickFirstBtn={onClickFirstBtn}
            onClickSecondBtn={onClickSecondBtn}
          />
        </div>
      </div>
    </div>
  );
};
export default TwoButtonModal;
