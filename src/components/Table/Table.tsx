import { Empty } from 'antd';
import { useEffect } from 'react';
import DataTable, { type TableProps, type TableColumn } from 'react-data-table-component'
import { DynamicIcon } from '../DynamicIcon';
export interface CustomTableProps {
  data: any;
  columns: TableColumn<any>[];
  customStyles?: any;
  paginationOptions: {
    currentItems: any[],
    page: number,
    take: number,
    itemCount: number,
    pageCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
  },
  onChangePage: (page: number) => void;
  onChangePerPage: (newPerPage: number, page: number) => void;

  [key: string]: any;
}

export default function Table({ data, columns, customStyles, paginationOptions, onChangePage, onChangePerPage, ...propsDataTable }: CustomTableProps) {



  useEffect(() => { }, [paginationOptions]);

  const styles: any = {
    header: {
      style: {
        minHeight: '56px',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    headRow: {
      style: {

      },
    },
    headCells: {
      style: {
        fontWeight: 'semi-bold',
        fontSize: '20px',
        minHeight: '56px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        borderRightStyle: 'solid',

      },
    },
    cells: {
      style: {
        borderRightStyle: 'solid',
        minHeight: '70px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
      },
    },
  };
  const propsTable: TableProps<any> = {
    columns: [],
    data: [],
    pagination: false,
    customStyles: customStyles ? customStyles : styles,
    dense: true,
    ...propsDataTable
  }



  const startRecord = (paginationOptions.page - 1) * paginationOptions.take + 1;
  const endRecord = Math.min(paginationOptions.page * paginationOptions.take, paginationOptions.itemCount);

  return (
    <>
      <DataTable
        {...propsTable}
        columns={columns}
        data={data}
        noDataComponent={<div className='flex flex-col justify-center my-8'>
          <Empty description="No hay datos" />
        </div>}
        progressComponent={
          <div className="flex flex-col justify-center gap-5 items-center">
            <span className="loading loading-spinner loading-lg" />
            Cargando datos...
          </div>
        }
      />
      <div className='w-full flex flex-col md:flex-row justify-end items-center gap-5 mt-1' >
        <label className="form-control w-full max-w-xs">
          <select className="select" onChange={(e) => onChangePerPage(Number(e.target.value), paginationOptions.page)} value={paginationOptions.take}>
            <option value={5}>Items por página: 5</option>
            <option value={10} >Items por página: 10</option>
            <option value={15} >Items por página: 15</option>
            <option value={20} >Items por página: 20</option>
            <option value={-1} >Todos los items</option>
          </select>
        </label>
        <p>
          Página {paginationOptions.page} de {paginationOptions.pageCount} | Registros {startRecord}-{endRecord} de {paginationOptions.itemCount}
        </p>
        <div className='flex gap-5' >
          <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(1)} disabled={!paginationOptions.hasPreviousPage}>
            <DynamicIcon icon='mdi:chevron-double-left' className='text-3xl' />
          </button>
          <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(paginationOptions.page - 1)} disabled={!paginationOptions.hasPreviousPage}>
            <DynamicIcon icon='ci:chevron-left-md' className='text-3xl' />
          </button>
          <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(paginationOptions.page + 1)} disabled={!paginationOptions.hasNextPage}>
            <DynamicIcon icon='ci:chevron-right-md' className='text-3xl' />
          </button>
          <button className="btn btn-circle btn-ghost" onClick={() => onChangePage(paginationOptions.pageCount)} disabled={!paginationOptions.hasNextPage}>
            <DynamicIcon icon='mdi:chevron-double-right' className='text-3xl' />
          </button>
        </div>
      </div>
    </>

  );

}
