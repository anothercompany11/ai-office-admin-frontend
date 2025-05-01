import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface PageCrumbleProps {
  props:
    | {
        type: "original"; // 기본 페이지 크럼블
        icon: string;
        path: string;
        detailPath?: string;
      }
    | {
        type: "second"; // 상세 페이지의 뒤로 가기
        path: string;
      };
}

const PageCrumble = ({ props }: PageCrumbleProps) => {
  // 기본 페이지 크럼블인 경우
  if (props.type === "original") {
    return (
      <div className="flex items-center gap-3">
        <Image src={`/svg/${props.icon}-black.svg`} alt={props.path} width={24} height={24} className="size-6" />
        <div className="flex items-center gap-1 text-title-l">
          <p>{props.path}</p>
          {props.detailPath && (
            <>
              <ChevronRight />
              <p>{props.detailPath}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <span className="text-title-l">{props.path}</span>
    </div>
  );
};
export default PageCrumble;
