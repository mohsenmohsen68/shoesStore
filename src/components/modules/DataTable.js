"use client";
import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Rating } from "react-simple-star-rating";
import { Box } from "@mui/material";
import { CiCircleCheck } from "react-icons/ci";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import Swal from "sweetalert2"

export default function DataTable({ datas }) {
  console.log('kk: ', datas)
  const columns = [
    {
      field: "index",
      headerName: "شماره",
      width: 30,
      headerClassName: 'super-app-theme--header',
      renderHeader: (params) => (
        <strong className="font-BYekanBold text-white ">
          {'شماره '}

        </strong>
      ),
      renderCell: (params) => (
        <p className="flex justify-center font-BYekan">
          {params.row.index}
        </p>),

    },
    {
      field: "commentBody",
      headerName: "متن پیام",
      width: 400,
      headerClassName: 'super-app-theme--header',
      renderHeader: (params) => (
        <strong className="font-BYekanBold text-white">
          {'متن پیام '}

        </strong>
      ),
      renderCell: (params) => (
        <p className="flex justify-center font-BYekan">
          {params.row.commentBody}
        </p>),
    },
    {
      field: "status",
      headerName: "وضعیت پیام",
      width: 100,
      headerClassName: 'super-app-theme--header',
      renderHeader: (params) => (
        <strong className="font-BYekanBold text-white">
          {' وضعیت پیام '}

        </strong>
      ),
      renderCell: (params) => (
        <div className="flex w-full h-full justify-center items-center font-BYekan ">
          {params.row.status === "notAccepted" ? (<MdDoNotDisturbAlt className="text-red-500 text-2xl" />) : (<CiCircleCheck className="text-green-500 text-2xl" />)}
        </div>
      ),
    },
    {
      field: "commentDate",
      headerName: "تاریخ ثبت",
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderHeader: (params) => (
        <strong className="font-BYekanBold text-white">
          {' تاریخ ثبت '}

        </strong>
      ),
      renderCell: (params) => (
        <p className="flex justify-center font-BYekan">
          {params.row.commentDate}
        </p>
      ),
    },
    {
      field: "score",
      headerName: "امتیاز",
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <div className="flex justify-start text-white">
          <Rating readonly size={16} rtl SVGstyle={{ "display": "inline", }} initialValue={params.row.score} />
        </div>
      ),

      renderHeader: (params) => (
        <strong className="font-BYekanBold text-white">
          {'امتیاز  '}

        </strong>
      ),
    },
    {
      field: "name",
      headerName: "نام محصول",
      width: 170,
      headerClassName: 'super-app-theme--header',
      renderHeader: (params) => (
        <strong className="font-BYekanBold text-white">
          {' نام محصول '}

        </strong>
      ),
      renderCell: (params) => (
        <p className="flex justify-start font-BYekan">
          {params.row.name}
        </p>
      ),
    },
    {
      field: "view",
      headerName: "مشاهده",
      width: 70,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <div className="flex w-full h-full justify-center items-center font-BYekan ">
        <BiShow className="text-red-500 text-2xl" onClick={()=>{
          Swal.fire({
            title: "متن پیام",
            text: params.row.commentBody,
            icon: "success",
            confirmButtonColor: "#0BDA51",
            confirmButtonText: "فهمیدم",
            closeOnConfirm: true
          });
        }}/>
      </div>
      ),

      renderHeader: (params) => (
        <strong className="font-BYekanBold text-white">
          {'مشاهده  '}

        </strong>
      ),
    },
  ];
  let rows = [];
  datas.map((item, index) =>
    rows.push({
      index: (index + 1).toLocaleString('fa-IR'),
      commentBody: item.comment,
      score: item.score,
      commentDate: item.date,
      name: item.product.name,
      status: item.status,
    })
  );

  function generateRandom() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  return (
    <div className='w-full h-full p-2 font-BYekan'>
      <Box
        sx={{
          height: '550px',
          width: '100%',
          '& .super-app-theme--header': {
            backgroundColor: '#2d55ff',
          },
        }}
      >
        <DataGrid getRowId={(row) => generateRandom()} rows={rows} columns={columns} pagination autoPageSize />
      </Box>
    </div>
  );
}
