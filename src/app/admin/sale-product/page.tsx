import CreateSaleProduct from '@/module/sale/CreateSaleProduct';
import TableSale from '@/module/sale/TableSale';
import { API } from '@/utils/constant';

export default async function page() {
  const response = await fetch(`${API.SALE}`, {
    method: 'GET',
    next: {
      tags: ['sale'],
    },
  });
  const data = await response.json();
  console.log('page ~ data:', data);

  return (
    <>
      <TableSale data={data}></TableSale>
    </>
  );
}
