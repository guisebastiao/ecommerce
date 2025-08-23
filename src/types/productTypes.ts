import type { CategoryDTO } from "./categoryTypes";
import type { DiscountDTO } from "./discountTypes";
import type { ProductPictureDTO } from "./productPictureTypes";

export interface ProductDTO {
  productId: string;
  name: string;
  description: string;
  originalPrice: number;
  price: number | null;
  stock: number;
  totalComments: number;
  totalReviews: number;
  available: boolean;
  haveDiscount: boolean;
  alreadyReviewed: boolean;
  alreadyCommented: boolean;
  isFavorite: boolean;
  category: CategoryDTO;
  discount: DiscountDTO | null;
  reviewRating: number;
  productPictures: ProductPictureDTO[];
}
