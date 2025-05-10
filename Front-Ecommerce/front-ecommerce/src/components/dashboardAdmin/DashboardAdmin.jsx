import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../header/Header";
import Swal from 'sweetalert2'; 

const URL = "https://localhost:7174/api/";

export default function DashboardAdmin() {
    const { auth } = useAuth();
    const token = auth?.token;

    const [filterOption, setFilterOption] = useState("MinoristaAll");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({ open: false, id: null, type: null });

    const buildEndpoint = () => {
        switch (filterOption) {
        case "MinoristaAll": return `${URL}Minorista/AllMinoristas`;
        case "MinoristaAvailable": return `${URL}Minorista/AllMinoristasAvailable`;
        case "MayoristaAll": return `${URL}Mayorista/AllMayoristas`;
        case "MayoristaAvailable": return `${URL}Mayorista/AllMayoristasAvailable`;
        default: return "";
        }
    };

    const deleteEndpoint = (id) =>
        filterOption.startsWith("Minorista")
        ? `${URL}Minorista/SoftDeleteMinorista/${id}`
        : `${URL}Mayorista/SoftDelete/${id}`;

    const editEndpoint = (id) =>
        filterOption.startsWith("Minorista")
        ? `${URL}Minorista/UpdateMinorista/${id}`
        : `${URL}Mayorista/UpdateMayorista/${id}`;

    const fetchUsers = async () => {
        setLoading(true);
        try {
        const res = await fetch(buildEndpoint(), { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error("Error al cargar usuarios");
        const data = await res.json();
        setUsers(data);
        } catch (e) {
        console.error(e);
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron cargar los usuarios.' });
        } finally {
        setLoading(false);
        }
    };

    const closeModal = () => setModal({ open: false, id: null, type: null });

    const confirmDelete = async () => {
        try {
        const res = await fetch(deleteEndpoint(modal.id), {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error();
        closeModal();
        await fetchUsers();
        Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El usuario ha sido eliminado correctamente.',
            confirmButtonColor: '#3085d6'
        });
        } catch (e) {
        console.error(e);
        closeModal();
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar el usuario.' });
        }
    };

    const confirmEdit = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        try {
        const res = await fetch(editEndpoint(modal.id), {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error();
        closeModal();
        await fetchUsers();
        Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'Los datos del usuario han sido actualizados.',
            confirmButtonColor: '#3085d6'
        });
        } catch (e) {
        console.error(e);
        closeModal();
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron actualizar los datos.' });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [filterOption]);

    const currentUser = users.find((u) => u.id === modal.id);

    return (
        <>
            <Header />
            <div className="space-y-6 p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                <button
                    onClick={() => setFilterOption("MinoristaAll")}
                    className={`px-4 py-2 rounded ${
                    filterOption === "MinoristaAll" ? "bg-blue-600 text-black" : "bg-gray-200"
                    }`}
                >
                    Minoristas
                </button>
                <button
                    onClick={() => setFilterOption("MinoristaAvailable")}
                    className={`px-4 py-2 rounded ${
                    filterOption === "MinoristaAvailable" ? "bg-blue-600 text-black" : "bg-gray-200"
                    }`}
                >
                    Minoristas Available
                </button>
                <button
                    onClick={() => setFilterOption("MayoristaAll")}
                    className={`px-4 py-2 rounded ${
                    filterOption === "MayoristaAll" ? "bg-blue-600 text-black" : "bg-gray-200"
                    }`}
                >
                    Mayoristas
                </button>
                <button
                    onClick={() => setFilterOption("MayoristaAvailable")}
                    className={`px-4 py-2 rounded ${
                    filterOption === "MayoristaAvailable" ? "bg-blue-600 text-black" : "bg-gray-200"
                    }`}
                >
                    Mayoristas Available
                </button>
                </div>

                {loading ? (
                <p>Cargando...</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.map((u) => (
                    <div
                        key={u.id}
                        className="border rounded-lg p-4 flex flex-col justify-between shadow"
                    >
                        <div>
                        <p className="font-semibold">{u.nameAccount}</p>
                        <p className="text-sm text-gray-600">Nombre: {u.firstName}</p>
                        <p className="text-sm text-gray-600">Apellido: {u.lastName}</p>
                        </div>
                        <div>
                        <p className="text-sm text-gray-600">ID: {u.id}</p>
                        <p className="text-sm text-gray-600">Email: {u.email}</p>
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                        <button
                            onClick={() => setModal({ open: true, id: u.id, type: "edit" })}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Editar usuario"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-7l7 7-3.5 3.5L7 11z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setModal({ open: true, id: u.id, type: "delete" })}
                            className="text-red-600 hover:text-red-700"
                            aria-label="Eliminar usuario"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                )}

                {modal.open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
                    {modal.type === "delete" ? (
                        <>  
                        <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
                        <p className="mb-6">¿Seguro que quieres eliminar este {filterOption.startsWith("Minorista") ? "minorista" : "mayorista"}?</p>
                        <div className="flex justify-end space-x-4">
                            <button onClick={closeModal} className="px-4 py-2 rounded border">Cancelar</button>
                            <button onClick={confirmDelete} className="px-4 py-2 rounded bg-red-600 text-black">Sí, eliminar</button>
                        </div>
                        </>
                    ) : (
                        <>  
                        <h3 className="text-lg font-bold mb-4">Editar usuario</h3>
                        <form onSubmit={confirmEdit} className="space-y-4">
                            <input type="text" name="firstName" defaultValue={currentUser?.firstName} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
                            <input type="text" name="lastName"  defaultValue={currentUser?.lastName}  placeholder="Apellido" className="w-full border rounded px-3 py-2" />
                            <input type="email" name="email" defaultValue={currentUser?.email} placeholder="Email" className="w-full border rounded px-3 py-2" />
                            <input type="text" name="address" defaultValue={currentUser?.address} placeholder="Dirección" className="w-full border rounded px-3 py-2" />
                            <input type="text" name="phoneNumber" defaultValue={currentUser?.phoneNumber} placeholder="Teléfono" className="w-full border rounded px-3 py-2" />
                            <input type="number" name="dni" defaultValue={currentUser?.dni} placeholder="DNI" className="w-full border rounded px-3 py-2" />
                            
                            {filterOption.startsWith("Mayorista") && (
                            <>
                                <input type="number" name="cuit" defaultValue={currentUser?.cuit} placeholder="CUIT" className="w-full border rounded px-3 py-2" />
                                <input type="text" name="categoria" defaultValue={currentUser?.categoria} placeholder="Categoría" className="w-full border rounded px-3 py-2" />
                                <input type="text" name="nameAccount" defaultValue={currentUser?.nameAccount} placeholder="Cuenta" className="w-full border rounded px-3 py-2" />
                            </>
                            )}
                            <div className="flex justify-end space-x-4">
                            <button type="button" onClick={closeModal} className="px-4 py-2 rounded border">Cancelar</button>
                            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-black">Guardar</button>
                            </div>
                        </form>
                        </>
                    )}
                    </div>
                </div>
                )}
            </div>
        </>
    );
}
