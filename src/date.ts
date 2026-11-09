// "YYYY-MM-DD" → "YYYY.MM.DD" (portfolio와 같은 표기)
// fs를 쓰는 utils.ts와 분리해 클라이언트 컴포넌트에서도 가져다 쓸 수 있게 함
export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}
