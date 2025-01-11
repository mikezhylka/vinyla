type Rate = 1 | 2 | 3 | 4 | 5;

export type Comment = {
  id: number,
  name: string,
  rate: Rate,
  description: string,
}