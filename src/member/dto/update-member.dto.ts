// DTO: 클라이언트가 전달하는 데이터를 구조화, 서버에서 데이터의 유효성을 확인
// UpdateMemberDto: 기존 멤버의 데이터를 부분적으로 수정할 때 사용
export class UpdateMemberDto {
  name?: string; // 선택 입력 값 (멤버 이름)
  role?: string; // 선택 입력 값 (역할)
  comment?: string; // 선택 입력 값 (코멘트)
  email?: string; // 선택 입력 값 (이메일)
  techStack?: string[]; // 선택 입력 문자열 배열 값 (기술 스택)
}