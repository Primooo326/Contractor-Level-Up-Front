"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Table from '@/components/Table/Table';
import { IUser } from '@/models/IUser.model';
import "./styles.scss";
import { useUserStore } from './hooks/useUser';
import { ITableColumn } from '@/models/ISystem.model';
import { getUsers, updateUser } from '@/api/users.api';
import { toast } from 'react-toastify';
import { DynamicIcon } from '@/components/DynamicIcon';

export default function page() {
    const [data, setData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationOptions, setPaginationOptions] = useState<any>({
        currentItems: data,
        page: 1,
        limit: 5,
        itemCount: data.length,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false
    });

    const fetchData = async (page: number = 1, limit: number = 5) => {
        setLoading(true);
        try {
            const response = await getUsers({ page, limit });
            setData(response.data);
            setPaginationOptions((prev: any) => ({
                ...prev,
                currentItems: response.data,
                itemCount: response.meta.total,
                pageCount: Math.ceil(response.meta.total / limit),
                hasPreviousPage: page > 1,
                hasNextPage: page < Math.ceil(response.meta.total / limit),
            }));
        } catch (error) {
            toast.error("Error al cargar usuarios");
            console.error("Fetch users error: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateState = async (e: any) => {
        let status: boolean;
        if (e.status) {
            status = false;
        }else{
            status = true;
        }
        
        toast.promise(updateUser(e!.id, {status}), {
            pending: "Actualizando estado...",
        }).then((res) => {
            if (res) {
                toast.success("Estado actualizado exitosamente")
                fetchData(paginationOptions.page, paginationOptions.limit);
            } else {
                toast.error(res.message)
            }
        }).catch((err) => {
            toast.error(err.message);
        })
    }

    const columnas: ITableColumn<IUser>[] = [
        {
            name: "Nombre",
            cell: (row) => row.full_name,
            selector: (row) => row.full_name,
            sortable: true,
        },
        {
            name: "Correo Electrónico",
            cell: (row) => row.email,
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Estado",
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <span>
                        {row.status ? "Activo" : "Inactivo"}
                    </span>
                    <DynamicIcon
                        icon={row.status ? 'material-symbols:check-circle' : 'mdi:close-circle'}
                        className={row.status ? 'text-green-500' : 'text-red-500'}
                    />
                </div>
            ),
            selector: (row) => row.status,
            sortable: true
        },        
        {
            name: "Acciones",
            cell: (row) => (
                <div className="actions-container">
                    <button
                        className={row.status ? "btn-deactivate" : "btn-activate"}
                        onClick={() => updateState(row)}
                    >
                        {row.status ? "Desactivar" : "Activar"}
                    </button>
                </div>
            ),
        }
    ];

    const onChangePage = (page: number) => {
        setPaginationOptions({ ...paginationOptions, page });
        fetchData(page, paginationOptions.limit);
    };

    const onChangePerPage = (newPerPage: number, page: number) => {
        fetchData(page, newPerPage === -1 ? paginationOptions.itemCount : newPerPage);
    };

    return (
        <div className="user-page-container">
            <div className="table-container">
                <div className="table-header">
                    <h1>Usuarios</h1>
                </div>
                <Table
                    data={data}
                    columns={columnas}
                    selectableRows={false}
                    paginationOptions={paginationOptions}
                    onChangePage={onChangePage}
                    onChangePerPage={onChangePerPage}
                    progressPending={loading}
                />
            </div>
        </div>
    );
}