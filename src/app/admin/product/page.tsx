
import CreateProduct from '@/module/product/CreateProduct';
import TableProduct from '@/module/product/TableProduct';
import { API } from '@/utils/constant';

export default async function Product() {
  const response = await fetch(`${API.Product}/getAll`, {
    method: 'GET',
    next: {
      tags: ['product'],
    },
  });
  const data = await response.json();
  return (
    <div>
      <CreateProduct></CreateProduct>
      <TableProduct data={data}></TableProduct>
    </div>
  );

}