import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { verifyJWT } from "@/utils/tools";
import { DynamicIcon } from "@/components/DynamicIcon";

export default function LoginCard({ setCargando }: { setCargando: (b: boolean) => void, setReset: (b: boolean) => void }) {
    const router = useRouter();
    const [userForm, setUserForm] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);

    const handleUsuarioChange = (event: any) => {
        setUserForm(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const onClickLogin = async (e: any) => {
        setCargando(true);
        e.preventDefault();
        router.push("/home");
    };

    const MostrarPass = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const verifyToken = async (token: string) => {
        const data = await verifyJWT(token);
        if (data !== false) {
            setCargando(false);
            router.push("/dashboard");
        }
    };

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            verifyToken(token);
        }
        setCargando(false);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <Image src="/logo.png" width={50} height={50} alt="Logo" />
                </div>
                <h1 className="text-center text-xl font-bold text-gray-700 mb-6">Inicio de Sesión</h1>
                <form>
                    <div className="flex items-center bg-gray-100 rounded-lg py-2 px-3 mb-4">
                        <DynamicIcon icon='fa-solid:users' className='text-lg text-gray-500 mr-3' />
                        <input
                            onChange={handleUsuarioChange}
                            type="text"
                            placeholder="Usuario"
                            className="bg-gray-100 outline-none grow"
                        />
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-lg py-2 px-3 mb-4">
                        <DynamicIcon icon='mingcute:lock-fill' className='text-lg text-gray-500 mr-3' />
                        <input
                            onChange={handlePasswordChange}
                            type={mostrarPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            className="bg-gray-100 outline-none grow"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" onChange={MostrarPass} className="mr-2" />
                            Mostrar contraseña
                        </label>
                    </div>
                    <button
                        onClick={onClickLogin}
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-lg hover:bg-indigo-500 transition-colors"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}
