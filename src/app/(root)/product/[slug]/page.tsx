import DetailProduct from '@/components/product/DetailProduct';
import { API } from '@/utils/constant';

export default async function DetailProductPage(props: any) {
  const { params } = props;
  const slug = params.slug;
  console.log("DetailProductPage ~ slug:", slug)

  try {
    const response = await fetch(`${API.Product}/detail/${slug}`, {
      method: 'GET',
    });
    const data = await response.json();

    if (!data || data.message === 'Product not found') {
      return null;
    }

    return <DetailProduct data={data}></DetailProduct>;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}
