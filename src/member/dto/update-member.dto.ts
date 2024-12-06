export class UpdateMemberDto {
  name?: string; // 멤버 이름 (선택적)
  role?: string; // 멤버 역할 (선택적)
  comment?: string; // 멤버의 코멘트 (선택적)
  email?: string; // 멤버 이메일 (선택적)
  techStack?: string[]; // 기술 스택 배열 (선택적)
}