// DTO(Data Transfer Object) 클래스
// 새로운 멤버 생성 시 필요한 데이터 형식 정의
export class CreateMemberDto {
  name: string; // 필수 값: 멤버 이름
  role?: string; // 선택 값: 멤버 역할
  comment?: string; // 선택 값: 멤버 코멘트
  email?: string; // 선택 값: 멤버 이메일 주소
  techStack?: string[]; // 선택 값: 기술 스택 배열
}