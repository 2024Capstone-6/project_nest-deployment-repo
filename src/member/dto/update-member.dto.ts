// DTO(Data Transfer Object) 클래스
// 기존 멤버 정보를 업데이트할 때 사용되는 데이터 형식 정의
export class UpdateMemberDto {
  name?: string; // 선택 값: 업데이트할 멤버 이름
  role?: string; // 선택 값: 업데이트할 멤버 역할
  comment?: string; // 선택 값: 업데이트할 멤버 코멘트
  email?: string; // 선택 값: 업데이트할 멤버 이메일
  techStack?: string[]; // 선택 값: 업데이트할 기술 스택 배열
}