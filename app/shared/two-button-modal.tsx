import { useEffect } from "react";
import TwoButtonBar from "./two-button-bar";

interface TwoButtonModalProps {
  title: string; // 모달 타이틀
  desc?: string; // 모달 설명
  loading?: boolean; // 버튼 로딩 상태
  buttonText: string; // 버튼 텍스트
  onClickFirstBtn: () => void; // 버튼 핸들러
  onClickSecondBtn: () => void; // 버튼 핸들러
  children?: React.ReactNode; // 커스텀 콘텐츠
}

const TwoButtonModal = ({
  title,
  desc,
  loading,
  buttonText,
  onClickFirstBtn,
  onClickSecondBtn,
  children,
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
      <div className="w-[319px] rounded-[20px] bg-white pt-8 px-4 pb-4">
        <div className="flex flex-col gap-6">
          {children ? (
            children
          ) : (
            <div className="flex items-center text-center justify-center flex-col gap-2">
              {title && <p className="text-title-l text-label-strong">{title}</p>}
              {desc && <p className="text-subtitle-s text-label-natural">{desc}</p>}
            </div>
          )}
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
