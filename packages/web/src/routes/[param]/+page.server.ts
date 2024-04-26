import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/public'
import axios from 'axios';

export async function load({ params }: any) {
  const res = await axios({
    method: 'GET',
    url: `${env.PUBLIC_API_URL}/links/${params.param}`,
  })
  if (!res.data || !res.data?.data) throw error(404);
  
  // redirect
  return redirect(302, res.data?.data?.originalUrl);
}