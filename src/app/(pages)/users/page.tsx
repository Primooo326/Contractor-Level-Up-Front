"use client";

import React, { useEffect, useState } from 'react';
import { IUser } from '@/models/IUser.model';
import "./styles.scss";
import { toast } from 'react-toastify';
import { getUsers, updateUser } from '@/api/users.api';
import { DynamicIcon } from '@/components/DynamicIcon';

export default function Page() {
    const [data, setData] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [paginationOptions, setPaginationOptions] = useState({
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
            setPaginationOptions((prev) => ({
                ...prev,
                currentItems: response.data,
                itemCount: response.meta.total,
                pageCount: Math.ceil(response.meta.total / limit),
                hasPreviousPage: page > 1,
                hasNextPage: page < Math.ceil(response.meta.total / limit),
                limit
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

    const updateState = async (user: IUser) => {
        const newStatus = !user.status;
        toast.promise(updateUser(user.id, { status: newStatus }), {
            pending: "Actualizando estado...",
        }).then((res) => {
            if (res) {
                toast.success("Estado actualizado exitosamente");
                fetchData(paginationOptions.page, paginationOptions.limit);
            } else {
                toast.error(res.message);
            }
        }).catch((err) => {
            toast.error(err.message);
        });
    };

    const onChangePage = (page: number) => {
        setPaginationOptions((prev) => ({ ...prev, page }));
        fetchData(page, paginationOptions.limit);
    };

    const onChangePerPage = (newPerPage: number) => {
        setPaginationOptions((prev) => ({
            ...prev,
            limit: newPerPage === -1 ? prev.itemCount : newPerPage
        }));
        fetchData(paginationOptions.page, newPerPage === -1 ? paginationOptions.itemCount : newPerPage);
    };

    return (
        <div className="page-container">
            <div className="table-container">
                <div className="table-header">
                    <h1>Usuarios</h1>
                </div>
                {loading ? (
                    <div className="loading-spinner">Cargando datos...</div>
                ) : (
                    <div className="table">
                        <div className="table-row table-header">
                            <div className="table-cell">Nombre</div>
                            <div className="table-cell">Correo Electrónico</div>
                            <div className="table-cell">Estado</div>
                            <div className="table-cell">Acciones</div>
                        </div>
                        {data.map((row) => (
                            <div key={row.id} className="table-row">
                                <div className="table-cell">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${row.full_name.replaceAll(" ", "+")}&background=random`}
                                            alt="contractor"
                                            className="rounded-full"
                                            style={{ width: '40px' }}
                                        />
                                        <span>{row.full_name}</span>
                                    </div>
                                </div>
                                <div className="table-cell">{row.email}</div>
                                <div className="table-cell">
                                    <div className="flex items-center gap-2">
                                        <span>{row.status ? "Activo" : "Inactivo"}</span>
                                        <DynamicIcon
                                            icon={row.status ? 'material-symbols:check-circle' : 'mdi:close-circle'}
                                            className={row.status ? 'text-green-500' : 'text-red-500'}
                                        />
                                    </div>
                                </div>
                                <div className="table-cell actions-container">
                                    <button className={row.status ? "btn btn-error btn-sm" : "btn btn-success btn-sm"} onClick={() => updateState(row)}>{row.status ? "Desactivar" : "Activar"} </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="pagination-container">
                    <select onChange={(e) => onChangePerPage(Number(e.target.value))} value={paginationOptions.limit}>
                        <option value={5}>Items por página: 5</option>
                        <option value={10}>Items por página: 10</option>
                        <option value={15}>Items por página: 15</option>
                        <option value={20}>Items por página: 20</option>
                        <option value={-1}>Todos los items</option>
                    </select>
                    <div>
                        Página {paginationOptions.page} de {paginationOptions.pageCount}
                    </div>
                    <button className="btn btn-circle btn-ghost btn-pagination" onClick={() => onChangePage(1)} disabled={!paginationOptions.hasPreviousPage}>
                        <DynamicIcon icon='mdi:chevron-double-left' className='text-3xl' />
                    </button>
                    <button className="btn btn-circle btn-ghost btn-pagination" onClick={() => onChangePage(paginationOptions.page - 1)} disabled={!paginationOptions.hasPreviousPage}>
                        <DynamicIcon icon='ci:chevron-left-md' className='text-3xl' />
                    </button>
                    <button className="btn btn-circle btn-ghost btn-pagination" onClick={() => onChangePage(paginationOptions.page + 1)} disabled={!paginationOptions.hasNextPage}>
                        <DynamicIcon icon='ci:chevron-right-md' className='text-3xl' />
                    </button>
                    <button className="btn btn-circle btn-ghost btn-pagination" onClick={() => onChangePage(paginationOptions.pageCount)} disabled={!paginationOptions.hasNextPage}>
                        <DynamicIcon icon='mdi:chevron-double-right' className='text-3xl' />
                    </button>
                </div>
            </div>
        </div>
    );
}
