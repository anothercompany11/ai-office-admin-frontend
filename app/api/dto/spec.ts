// 명세 목록 한 줄 (본문 없음)
export interface SpecSummary {
  id: string;
  conversation_id: string;
  code_id: string;
  code: string; // 학생 접속코드
  school_name: string; // 코드에 저장된 학교·기관 이름
  conversation_title: string | null;
  title: string | null; // 명세 본문 첫 제목
  version: number; // 지금까지 만든 횟수
  content_length: number;
  coverage_filled: number; // 기획 체크리스트 충족 개수
  coverage_total: number;
  created_at: string;
}

// 같은 대화에서 만들어진 버전
export interface SpecVersionBrief {
  id: string;
  version: number;
  created_at: string;
}

// 본문까지 포함된 상세
export interface SpecDetail extends SpecSummary {
  content: string; // 마크다운 전체
  filename: string; // 다운로드 시 내려오는 파일 이름
  versions: SpecVersionBrief[]; // 최신이 먼저
}

export interface PageMeta {
  page: number;
  size: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface SpecListRes {
  data: SpecSummary[];
  meta: PageMeta;
}

export interface SpecDetailRes {
  data: SpecDetail;
}
