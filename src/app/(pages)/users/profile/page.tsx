"use client";

import React, { useEffect, useState } from 'react';
import { IUser } from '@/models/IUser.model';
import "./styles.scss";
import { toast } from 'react-toastify';
import { getUser, updateUser } from '@/api/users.api';
import Cookies from "js-cookie";
import { useForm } from 'react-hook-form';

export default function Page() {
    const { register, setValue, handleSubmit, watch } = useForm();
    const [data, setData] = useState<IUser>();
    const [loading, setLoading] = useState<boolean>(true);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const decodedToken = getToken();
            try {
                const response = await getUser(decodedToken?.userId);
                setData(response);
                setValue('full_name', response.full_name);
                setValue('first_name', response.first_name);
                setValue('last_name', response.last_name);
                setValue('email', response.email);

                if (response.is_admin) {
                    setValue('messages_minute', response.messages_minute);
                }
            } catch (error) {
                toast.error("Error al cargar el usuario");
                console.error("Fetch user error: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setValue]);

    const full_name = watch("full_name", "");
    const first_name = watch("first_name", "");
    const last_name = watch("last_name", "");
    const email = watch("email", "");
    const messages_minute = watch("messages_minute", "");

    useEffect(() => {
        const isFormValid =
            full_name?.length >= 4 &&
            first_name?.length > 0 &&
            last_name?.length > 0 &&
            (data?.is_admin ? messages_minute > 0 : true) &&
            email?.length > 0 &&
            /\S+@\S+\.\S+/.test(email);

        setButtonDisabled(!isFormValid || !data?.is_admin);
    }, [full_name, first_name, last_name, email, messages_minute, data?.is_admin]);

    const onSubmit = async (formData: any) => {
        const decodedToken = getToken();

        if (data?.is_admin) {
            formData.messages_minute = Number(formData.messages_minute);
        }

        toast.promise(updateUser(decodedToken.userId, formData), {
            pending: "Actualizando información...",
        }).then((res) => {
            if (res) {
                toast.success("Información actualizada exitosamente");
            } else {
                toast.error(res.message);
            }
        }).catch((err) => {
            toast.error(err.message);
        });
    };

    const getToken = () => {
        const token = Cookies.get("token") || null;
        let decodedToken = { userId: 1 };
        if (token) {
            decodedToken = decodeToken(token);
        }

        return decodedToken;
    }

    const decodeToken = (token: any) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    return (
        <div className="page-container">
            <div className="table-container">
                <div className="table-header">
                    <h1>Información del Usuario</h1>
                </div>
                {loading ? (
                    <div className="loading-spinner">Cargando datos...</div>
                ) : (
                    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-1">
                                <label className='label'>Nombre Completo</label>
                                <input
                                    className='textarea textarea-bordered'
                                    {...register('full_name', { required: true, minLength: 4 })}
                                    defaultValue={data?.full_name || ''}
                                    disabled={!data?.is_admin}
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <label className='label'>Correo</label>
                                <input
                                    type="email"
                                    className='textarea textarea-bordered'
                                    {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
                                    defaultValue={data?.email || ''}
                                    disabled={!data?.is_admin}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col gap-1">
                                <label className='label'>Primer Nombre</label>
                                <input
                                    className='textarea textarea-bordered'
                                    {...register('first_name', { required: true })}
                                    defaultValue={data?.first_name || ''}
                                    disabled={!data?.is_admin}
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <label className='label'>Apellido</label>
                                <input
                                    className='textarea textarea-bordered'
                                    {...register('last_name', { required: true })}
                                    defaultValue={data?.last_name || ''}
                                    disabled={!data?.is_admin}
                                />
                            </div>
                        </div>

                        {data?.is_admin && (
                            <div className="flex flex-col gap-1">
                                <label className='label'>Mensajes Por Minuto</label>
                                <input
                                    type="number"
                                    className='textarea textarea-bordered'
                                    {...register('messages_minute', { required: true, min: 1 })}
                                    defaultValue={data?.messages_minute || 0}
                                    disabled={!data?.is_admin}
                                />
                            </div>
                        )}

                        <div className='flex justify-end gap-3'>
                            <button
                                className='btn btn-primary'
                                type="submit"
                                disabled={buttonDisabled || !data?.is_admin}
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
