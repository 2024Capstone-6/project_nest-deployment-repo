export class UpdateMemberDto {
  name?: string; // 선택 입력 값 (멤버 이름)
  role?: string; // 선택 입력 값 (역할)
  comment?: string; // 선택 입력 값 (코멘트)
  email?: string; // 선택 입력 값 (이메일)
  techStack?: string[]; // 선택 입력 값 (기술 스택)
}