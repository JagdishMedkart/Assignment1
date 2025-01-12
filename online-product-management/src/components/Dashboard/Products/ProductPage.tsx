import React from 'react'
import ProductDataDashBoard from './ProductDataDashboard';
import { cookies } from 'next/headers';
import prisma from '../../../../prisma/client';
import ProductBuilder from './ProductBuilder';

export default async function FormPage() {
  const sess = (await cookies()).get('session-us')?.value;
  if (sess == null)
    return <></>
  const usr = await prisma.user.findFirst({
    where: {
      sessions: {
        some: {
          sessionToken: sess
        }
      }
    }
  });

  return (
    <div>
      <ProductBuilder />
      <ProductDataDashBoard />
    </div>
  )
}
