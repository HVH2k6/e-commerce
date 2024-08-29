import CreateCategory from '@/module/category/CreateCategory';
import TableCategory from '@/module/category/TableCategory';
import { API } from '@/utils/constant';

export default async function Category() {
  const response = await fetch(`${API.CATEGORY}/getAll`, {
    method: 'GET',
    next: {
      tags: ['category'],
    },
  });
  const data = await response.json();

  return (
    <div>
      <CreateCategory></CreateCategory>
      <TableCategory data={data}></TableCategory>
    </div>
  );
}
