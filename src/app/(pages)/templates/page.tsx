"use client"

import React, { useEffect, useState } from 'react';
import "./styles.scss";
import { toast } from 'react-toastify';
import { ITemplate } from '@/models/ITemplate.model';
import { getTemplates } from '@/api/templates';
import { DynamicIcon } from '@/components/DynamicIcon';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    const [data, setData] = useState<ITemplate[]>([]);
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
            const response = await getTemplates({ page, limit });
            setData(response.data);
            setPaginationOptions((prev) => ({
                ...prev,
                currentItems: response.data,
                itemCount: response.meta.total,
                pageCount: Math.ceil(response.meta.total / limit),
                hasPreviousPage: page > 1,
                hasNextPage: page < Math.ceil(response.meta.total / limit),
            }));
        } catch (error) {
            toast.error("Error al cargar plantillas");
            console.error("Fetch templates error: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onChangePage = (page: number) => {
        setPaginationOptions({ ...paginationOptions, page });
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
                    <h1>Plantillas</h1>
                    <div className='flex gap-5'>
                        <button className='btn btn-success' onClick={() => router.push('/templates/crear')}>Registrar nuevo usuario</button>
                    </div>
                </div>
                {loading ? (
                    <div className="loading-spinner">Cargando datos...</div>
                ) : (
                    <div className="table">
                        <div className="table-row table-header">
                            <div className="table-cell">Descripción</div>
                            <div className="table-cell">Acciones</div>
                        </div>
                        {data.map((row) => (
                            <div key={row.id} className="table-row">
                                <div className="table-cell">{row.description}</div>
                                <div className="table-cell actions-container">
                                    <button className='btn btn-warning btn-sm' onClick={() => { /* Editar */ }}>Editar</button>
                                    <button className='btn btn-error btn-sm' onClick={() => { /* Eliminar */ }}>Eliminar</button>
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
