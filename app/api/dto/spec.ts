// 결과물 목록 한 줄 (본문 없음)
export interface SpecSummary {
  id: string;
  conversation_id: string;
  code_id: string;
  code: string; // 학생 접속코드
  school_name: string; // 코드에 저장된 학교·기관 이름
  conversation_title: string | null;
  title: string | null; // 결과물 본문 첫 제목
  version: number; // 지금까지 만든 횟수
  content_length: number;
  coverage_filled: number; // 체크리스트 충족 개수
  coverage_total: number; // 전체 항목 수 — 대화마다 다르다. 0 이면 체크리스트가 없다
  goal: string | null; // 이 대화에서 하려는 일을 한 문장으로 되말한 것
  created_at: string;
}

// 이 대화에서 정해야 했던 것 하나와 거기에 대해 정해진 내용
export interface AdminChecklistItem {
  key: string;
  label: string;
  done_when: string; // 무엇이 말해졌으면 채워진 것으로 볼지의 기준
  why: string; // 비면 결과물의 무엇이 잘못되는지
  done: boolean;
  note: string; // 대화에서 정해진 내용. 비어 있으면 아직 안 정해진 것
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
  deliverable_label: string | null; // 학생이 누른 버튼 문구
  deliverable_shape: string | null; // 결과물을 어떤 모양으로 쓰기로 했는지
  deliverable_file_name: string | null; // 학생이 받은 파일명. null 이면 화면에서 읽는 결과물
  checklist_revision: number; // 2 이상이면 대화 중 방향이 바뀐 것
  checklist: AdminChecklistItem[];
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
