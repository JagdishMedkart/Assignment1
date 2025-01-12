import TopNavBar from '@/components/DashBoard/TopNavBar'
import FormEditing from '@/components/Form/FormBuilder/FormEditing'
import { cookies } from 'next/headers';
import React from 'react'
import prisma from '../../../../../prisma/client';
import { Form } from '@/lib/manage/form';
import { Id } from '@/lib/manage/types';
import { User } from '@/lib/manage/user';
import InvalidFormEditingAccess from '@/components/Form/FormBuilder/InvalidFormEditingAccess';

export default async function page({ params: { id } }: { params: { id: string } }) {

  const sess = (await cookies()).get('session-us')?.value;
  if (sess == null)
    return <></>

  if (isNaN(parseInt(id))) {
    return (
      <div>
        <TopNavBar title='Form' breadcrumbs={[{ display: "Forms", link: "/dashboard/form" }, { display: "Edit", link: "" }]} />
        <div className='overflow-y-scroll'>
          <div className='items-center justify-center'><InvalidFormEditingAccess /></div>
        </div>
      </div>
    )
  }

  const usr = await prisma.user.findFirst({
    where: {
       sessions: {
        some: {
          sessionToken: sess
        }
      }
    }
  });
  let form = await Form.getForm(parseInt(id) as Id<"Form">);
  let access = form.author.id === usr.id;
  if (!access) {
    return (
      <div>
        <TopNavBar title='Form' breadcrumbs={[{ display: "Forms", link: "/dashboard/form" }, { display: "Edit", link: "" }]} />
        <div className='overflow-y-scroll'>
          <div className='items-center justify-center'><InvalidFormEditingAccess /></div>
        </div>
      </div>
    )
  }
  // let access = ds.has(form.dataSource);
  // if (access) {
  //   let formDs = ds.get(form.dataSource);
  //   for (const field of form.fields) {
  //     if (!formDs.children.has(field.databaseId)) {
  //       access = false;
  //       break;
  //     }
  //     if (!formDs.children.get(field.databaseId).children.get(field.tableId)) {
  //       access = false;
  //       break;
  //     }
  //     if (!formDs.children.get(field.databaseId).children.get(field.tableId).children.get(field.columnId)) {
  //       access = false;
  //       break;
  //     }
  //   }
  // }

  let formDs = ds.get(form.dataSource);

  // Now create the structure for the view state
  let viewState = {
    id: form.id,
    title: form.title,
    name: form.name,
    shareString: form.shareString,
    columns: form.fields.map(x => {
      let colStruct = formDs.children.get(x.databaseId).children.get(x.tableId).children.get(x.columnId);
      let colData = {
        id: x.columnId,
        databaseId: x.databaseId,
        tableId: x.tableId,
        name: colStruct.Name,
        display: colStruct.Display,
        type: colStruct.DataType,
        value: x.descriptionOrValue,
        visible: x.visible,
      }
      return colData;
    })
  }

  return (
    <div>
      <TopNavBar title='Form' breadcrumbs={[{ display: "Forms", link: "/dashboard/form" }, { display: "Edit", link: "" }]} />
      <div className='overflow-y-scroll'>
        <FormEditing form={viewState} />
      </div>
    </div>
  )
}
