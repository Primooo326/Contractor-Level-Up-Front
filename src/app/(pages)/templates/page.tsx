"use client"

import React, { useEffect, useState } from 'react';
import "./styles.scss";
import { toast } from 'react-toastify';
import { ITemplate } from '@/models/ITemplate.model';
import { createTemplate, deleteTemplate, getTemplates, updateTemplate } from '@/api/templates';
import { DynamicIcon } from '@/components/DynamicIcon';
import Modal from '@/components/shared/Modal';
import { useForm } from 'react-hook-form';
import { FaXmark } from 'react-icons/fa6';

export default function Page() {
    const { register, handleSubmit, formState: { }, setValue, reset } = useForm();

    const [data, setData] = useState<ITemplate[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    const [templateToEdit, setTemplateToEdit] = useState<any | null>(null);

    const [templateToDelete, setTemplateToDelete] = useState<any | null>(null);

    const [inputVerify, setInputVerify] = useState<string>('');

    const [paginationOptions, setPaginationOptions] = useState({
        currentItems: data,
        page: 1,
        limit: 5,
        itemCount: data.length,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false
    });

    const botones = [

        "Nombre",
        "Correo",
        "Telefono",
        "Direccion",
        "Nombre empresa",

    ]

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

    const onSubmit = async (data: any) => {
        setButtonDisabled(true);
        try {
            if (templateToEdit.description) {
                const response = await updateTemplate({ description: data.description }, templateToEdit.id);
                if (response) {
                    fetchData();
                    setTemplateToEdit(null);
                    toast.success("Plantilla actualizada correctamente");
                }
            } else {
                const response = await createTemplate(data);
                if (response) {
                    fetchData();
                    setTemplateToEdit(null);
                    toast.success("Plantilla creada correctamente");
                }
            }
        } catch (error: any) {
            console.error(error);
        }
        setButtonDisabled(false);
    }

    const onDeleteTemplate = async (id: string) => {
        setInputVerify('')
        setButtonDisabled(true);

        try {
            const response = await deleteTemplate(id);
            if (response) {
                fetchData();
                setTemplateToDelete(null);
                setInputVerify('');
                toast.success("Plantilla eliminada correctamente");
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Error al eliminar la plantilla");
        }
        setButtonDisabled(false);
    }

    const handleCreate = () => {
        setTemplateToEdit({
            description: ""
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (templateToEdit) {
            for (const key in templateToEdit) {
                setValue(key, templateToEdit[key])
            }
        } else {
            reset()
        }
    }, [templateToEdit])

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
        <>
            <div className="page-container">
                <div className="table-container">
                    <div className="table-header">
                        <h1>Plantillas</h1>
                        <div className='flex gap-5'>
                            <button className='btn btn-success' onClick={() => handleCreate()}>Nueva Plantilla</button>
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
                                        <button className='btn btn-warning btn-sm' onClick={() => setTemplateToEdit(row)}>Editar</button>
                                        <button className='btn btn-error btn-sm' onClick={() => { setTemplateToDelete(row); }}>Eliminar</button>
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
            <Modal id="Plantilla" className="rounded-xl w-[700px]" isOpen={templateToEdit} onClose={() => { setTemplateToEdit(null) }} >
                <div className='modal-header flex justify-between items-center border-b w-full px-10' >

                    <h1 className='text-2xl font-bold' >
                        {
                            templateToEdit?.description ? "Editar Plantilla" : "Nueva Plantilla"
                        }
                    </h1>
                    <button onClick={() => setTemplateToEdit(null)} >
                        <FaXmark />
                    </button>
                </div>
                <div className='p-10'>
                    <div className='flex flex-wrap gap-3 w-full mb-4'>

                        {botones.map((boton, index) => (
                            <button key={index} className='btn btn-primary btn-sm'>{boton}</button>
                        ))}

                    </div>
                    <form className='w-full space-y-4'>
                        <div className="flex flex-col gap-1 w-full">
                            <label className='label'>Descripción</label>
                            <textarea
                                className='textarea textarea-bordered w-full'
                                defaultValue={templateToEdit ? templateToEdit.id : null}
                                {...register('description', { required: true, minLength: 3 })}
                                rows={4}
                            />
                        </div>

                        <div className='flex justify-end gap-3'>
                            <button className='btn btn-error t-white' onClick={() => setTemplateToEdit(null)}>Cancelar</button>
                            <button className='btn btn-success t-white' disabled={buttonDisabled} onClick={handleSubmit(onSubmit)}>Guardar</button>
                        </div>
                    </form>
                </div>
            </Modal>
            {
                templateToDelete &&
                <Modal id='modalDeleteTemplate' className="rounded-xl " isOpen={templateToDelete} onClose={() => setTemplateToDelete(null)} >
                    <div className='modal-header flex justify-between items-center border-b w-full px-10' >
                        <div />
                        <h1 className='text-2xl font-bold' >
                            Eliminar Plantilla
                        </h1>
                        <button onClick={() => setTemplateToDelete(null)} >
                            <FaXmark />
                        </button>
                    </div>
                    <div>
                        <div className='p-10 flex flex-col items-center gap-3' >
                            <h1 className='text-xl' >
                                ¿Está seguro de eliminar la plantilla?
                            </h1>
                            <div>
                                <p className='font-bold mb-5' >
                                    Para confirmar la eliminación de la plantilla, por favor digite "confirmar".
                                </p>
                                <div className="form-control">
                                    <input type="text" placeholder="Digite confirmar" className="input input-bordered" value={inputVerify} onChange={(e) => setInputVerify(e.target.value)} onPaste={(e) => e.preventDefault()} />
                                </div>
                            </div>
                            <div className='flex justify-center gap-5 mt-5' >
                                <button className="btn btn-error t-white" onClick={() => setTemplateToDelete(null)} >Cancelar</button>
                                <button className="btn btn-success t-white" onClick={() => onDeleteTemplate(templateToDelete.id)} disabled={inputVerify !== `confirmar` || buttonDisabled} >Eliminar</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
        </>
    );
}
