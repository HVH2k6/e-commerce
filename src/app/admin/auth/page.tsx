import TableUser from '@/module/auth/TableUser';
import { API } from '@/utils/constant';

export default async function page() {
  const response = await fetch(`${API.AUTH}/get-all-user`, {
    method: 'GET',
    next: {
      tags: ['auth'],
    }
  });
  const data = await response.json();
  
  return <TableUser data={data} />;
}
