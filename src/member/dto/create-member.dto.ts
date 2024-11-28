export class CreateMemberDto {
  name: string;
  role: string;
  comment?: string;
  email?: string;
  techStack?: string[];
}