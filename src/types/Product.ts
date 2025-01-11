import { Comment } from './Comment';

export type Product = {
  id: number,
  photo: string,
  title: string,
  author: string,
  genre: string,
  price: number,
  numberOfMedia: number,
  label: string,
  subcategories: string[],
  description: string,
  barcode: string,
  comments: Comment[],
}