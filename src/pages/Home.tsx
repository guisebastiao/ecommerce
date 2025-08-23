import { CategoriesItems } from "@/components/CategoriesItems";
import { RotatingBanner } from "@/components/RotatingBanner";
import { ProductItem } from "@/components/ProductItem";
import type { ProductDTO } from "@/types/productTypes";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const products: ProductDTO[] = [
  {
    productId: "19b5a101-352d-4129-a366-a41a2fa42232",
    name: "Geladeira Brastemp BRM54HK 400L Duplex",
    description:
      "Geladeira Frost Free duplex 400L com dispenser de água, painel eletrônico, gavetas para frutas e verduras, eficiência energética A.",
    originalPrice: 2899.99,
    price: null,
    stock: 6,
    totalComments: 0,
    totalReviews: 11,
    available: true,
    haveDiscount: false,
    alreadyReviewed: false,
    alreadyCommented: false,
    isFavorite: false,
    category: {
      categoryId: 4,
      name: "Eletrodomésticos",
    },
    discount: null,
    reviewRating: 2.4,
    productPictures: [
      {
        productPictureId: "42c59118-1256-4653-9961-97020f8f65b4",
        objectId: "snH1-rAFP8bdV8AxskgA8eEDtM2XB2u266-EDVWCuHQ",
        url: "http://localhost:9000/ecommerce/product-pictures/snH1-rAFP8bdV8AxskgA8eEDtM2XB2u266-EDVWCuHQ?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=193aa99cc3f5235608760cb2103bf55bf7cff6b6bdf60398933d12f618df93d7",
      },
      {
        productPictureId: "8e2d98a9-d2cc-4c25-bfd2-035f44592234",
        objectId: "p5qHR_xc5LjxR2xMGBg1Xpl5soe8nCp7beUacM4zoDE",
        url: "http://localhost:9000/ecommerce/product-pictures/p5qHR_xc5LjxR2xMGBg1Xpl5soe8nCp7beUacM4zoDE?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f5c774a83aa0a2eef39a7925a086819abd9a970c645898595b8e0ab69c57e7f0",
      },
      {
        productPictureId: "5305e76e-f8df-4d77-b9c9-7fa7944d60fe",
        objectId: "9sdie4DHyCeUKL4_nvarK8k-CMLvc_IH-f77V3L-BNc",
        url: "http://localhost:9000/ecommerce/product-pictures/9sdie4DHyCeUKL4_nvarK8k-CMLvc_IH-f77V3L-BNc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=2c8c40853ac885814f1158a8314e3b18271b96b4deb207db4b94f87eacc56898",
      },
    ],
  },
  {
    productId: "aa98f69b-bcb0-4ee0-892e-984b47a189c4",
    name: "Lavadora Electrolux LAC12 12kg",
    description:
      "Máquina de lavar roupas 12kg com 12 programas de lavagem, dispenser automático, painel digital, função eco.",
    originalPrice: 1999.9,
    price: null,
    stock: 10,
    totalComments: 0,
    totalReviews: 29,
    available: true,
    haveDiscount: false,
    alreadyReviewed: false,
    alreadyCommented: false,
    isFavorite: false,
    category: {
      categoryId: 4,
      name: "Eletrodomésticos",
    },
    discount: null,
    reviewRating: 5,
    productPictures: [
      {
        productPictureId: "80dba23f-a5b6-4dfc-8912-182e357b050b",
        objectId: "oQAvlBgaeQnwod3QHONq7JUnDg0ZaIs4N7gtgEXl_fU",
        url: "http://localhost:9000/ecommerce/product-pictures/oQAvlBgaeQnwod3QHONq7JUnDg0ZaIs4N7gtgEXl_fU?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=3e96e5d093731df7c92fee02fb06ed8c6cfd27cf7fa84bed0eabc4fb042090eb",
      },
      {
        productPictureId: "c785a8e8-c623-46b4-88fc-2d7360ebbc5d",
        objectId: "pTwQsM6KQd8U29DW7e_1zlRntnzs_SCdyG9TIC4a330",
        url: "http://localhost:9000/ecommerce/product-pictures/pTwQsM6KQd8U29DW7e_1zlRntnzs_SCdyG9TIC4a330?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=c84b643173ed3f734e51afdbbe8eb3a909a190f711542d6ae0815800ed882649",
      },
      {
        productPictureId: "2c6c0596-67f0-42d0-9cab-8c5e4f89d9eb",
        objectId: "DgCKCl-AE3bvaDKOkRZqEjs5hk4h7dVWHE8qhVGI4Ug",
        url: "http://localhost:9000/ecommerce/product-pictures/DgCKCl-AE3bvaDKOkRZqEjs5hk4h7dVWHE8qhVGI4Ug?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=e88fe9048a2eb9d04479de90354b967f64a723c5e2f26805f201677f3268b132",
      },
    ],
  },
  {
    productId: "6ad11d61-d00f-4340-92fe-c65d25f547f4",
    name: "Micro-ondas Panasonic NN-GT68HS 30L",
    description:
      "Micro-ondas 30L com grill, painel digital, 10 níveis de potência, trava de segurança, função descongelar.",
    originalPrice: 699.9,
    price: null,
    stock: 15,
    totalComments: 0,
    totalReviews: 16,
    available: true,
    haveDiscount: false,
    alreadyReviewed: false,
    alreadyCommented: false,
    isFavorite: false,
    category: {
      categoryId: 4,
      name: "Eletrodomésticos",
    },
    discount: null,
    reviewRating: 1.1,
    productPictures: [
      {
        productPictureId: "e0eacf3d-b223-473c-8f08-cae8c7ef55db",
        objectId: "KA4Fe4AoWzhG9yrx6vmwolBwTHXBDqChoNccZZ8FyYY",
        url: "http://localhost:9000/ecommerce/product-pictures/KA4Fe4AoWzhG9yrx6vmwolBwTHXBDqChoNccZZ8FyYY?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=f79b6051032d633fb7f3d271b7adec687585d3467e1783fae979683cdddfb149",
      },
      {
        productPictureId: "94347896-2562-47cf-8938-9ee681716d2c",
        objectId: "5t0k3Y-e7FBKAsLGStSL0d9C4RztDAn4cz8ppZmB_-0",
        url: "http://localhost:9000/ecommerce/product-pictures/5t0k3Y-e7FBKAsLGStSL0d9C4RztDAn4cz8ppZmB_-0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=75de212064fed0d77385be73968425afe94af91def0a8d3cc89fb511af0aacd5",
      },
      {
        productPictureId: "3bc678de-dc25-48d3-bb01-cd54935e469c",
        objectId: "7oDiuNN9qFOn6X8zhXzv4u-IruWT1kWyhcGfL3UZnZU",
        url: "http://localhost:9000/ecommerce/product-pictures/7oDiuNN9qFOn6X8zhXzv4u-IruWT1kWyhcGfL3UZnZU?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20250820%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250820T231727Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=5f77bd2fdfced48e45b6c8b2f4bebc67829318e3be3a589f1ce9a26405ab8464",
      },
    ],
  },
];

export const Home = () => {
  const [_searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((params) => {
      params.set("offset", "0");
      params.set("limit", "20");
      return params;
    });
  }, []);

  return (
    <section className="w-full flex flex-col gap-6 py-4 md:px-6 px-3">
      <RotatingBanner />
      <div className="flex items-center gap-2">
        <div className="w-5 h-10 rounded bg-primary-theme" />
        <h4 className="text-primary-theme font-semibold">Categorias</h4>
      </div>
      <h2 className="font-semibold text-4xl">Pesquisar por Categorias</h2>
      <CategoriesItems />
      <div className="flex items-center gap-2">
        <div className="w-5 h-10 rounded bg-primary-theme" />
        <h4 className="text-primary-theme font-semibold">Produtos</h4>
      </div>
      <h2 className="font-semibold text-4xl">Explorar Produtos</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-2">
        {products.map((product) => (
          <ProductItem
            key={product.productId}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
