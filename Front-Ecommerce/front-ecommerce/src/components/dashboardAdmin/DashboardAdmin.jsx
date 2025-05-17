import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../header/Header";
import Swal from "sweetalert2";
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaBan } from 'react-icons/fa';

const URL = "https://localhost:7174/api/";

export default function DashboardAdmin() {
    const { auth } = useAuth();
    const token = auth?.token;

    const [activeTab, setActiveTab] = useState(null);

    const [clientFilter, setClientFilter] = useState("MinoristaAll");
    const [clients, setClients] = useState([]);

    const [prodFilter, setProdFilter] = useState("AllProducts");
    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [modal, setModal] = useState({
        open: false,
        entity: null,   // 'cliente' o 'producto'
        id: null,       // id del registro a editar/eliminar
        type: null,     // 'create', 'edit' o 'delete'
    });


    const readClientEndpoint = () => {
        switch (clientFilter) {
            case "MinoristaAll":       
                return `${URL}Minorista/AllMinoristas`;
            case "MinoristaAvailable": 
                return `${URL}Minorista/AllMinoristasAvailable`;
            case "MayoristaAll":       
                return `${URL}Mayorista/AllMayoristas`;
            case "MayoristaAvailable": 
                return `${URL}Mayorista/AllMayoristasAvailable`;
            default:                   
                return "";
        }
    };

    const softDeleteClientEndpoint = id =>
        clientFilter.startsWith("Minorista")
        ? `${URL}Minorista/SoftDeleteMinorista/${id}`
        : `${URL}Mayorista/SoftDelete/${id}`;

    const hardDeleteClientEndpoint = id =>
        clientFilter.startsWith("Minorista")
        ? `${URL}Minorista/HardDeleteMinorista/${id}`
        : `${URL}Mayorista/HardDelete/${id}`;

    const editClientEndpoint = (id) =>
        clientFilter.startsWith("Minorista")
            ? `${URL}Minorista/UpdateMinorista/${id}`
            : `${URL}Mayorista/UpdateMayorista/${id}`;

    const readProductEndpoint = () =>
        prodFilter === "AllProducts"
            ? `${URL}Product/AllProducts`
            : `${URL}Product/AllProductsAvailable`;

    const softDeleteProdEndpoint = id => `${URL}Product/SoftDeleteProduct/${id}`;
    const hardDeleteProdEndpoint = id => `${URL}Product/HardDeleteProduct/${id}`;
    const editProdEndpoint   = (id) => `${URL}Product/UpdateProduct/${id}`;
    const createProdEndpoint = () => `${URL}Product/CreateProduct`;

    const fetchClients = async () => {
        try {
            const res = await fetch(readClientEndpoint(), {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) 
                throw new Error();
            const data = await res.json();
            setClients(data);
        } catch {
            Swal.fire("Error", "No se pudieron cargar los clientes", "error");
        }
    };

    const fetchProducts = async () => {
        try {
            const res = await fetch(readProductEndpoint(), {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) 
                throw new Error();
            const data = await res.json();
            setProducts(data);
        } catch {
            Swal.fire("Error", "No se pudieron cargar los productos", "error");
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${URL}Category/AllCategoriesAvailable`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) 
                throw new Error();
            const data = await res.json();
            setCategories(data);
        } catch {
            Swal.fire("Error", "No se pudieron cargar las categorías", "error");
        }
    };
    useEffect(() => {
        if (activeTab === "clientes") {
            fetchClients();
        }
        if (activeTab === "productos") {
            fetchProducts();
            fetchCategories();
        }
    }, [activeTab, clientFilter, prodFilter]);


    const closeModal = () => {
        setModal({ open: false, entity: null, id: null, type: null });
    };

    const confirmDelete = async () => {
        const { entity, id, type } = modal;

        try {
            let url, successMsg;
            if (entity === "cliente") {
                if (type === "disable") {
                    url = softDeleteClientEndpoint(id);
                successMsg = "Cliente deshabilitado correctamente";
                } else {  // hard delete
                    url = hardDeleteClientEndpoint(id);
                    successMsg = "Cliente eliminado permanentemente";
                }
            } else {
                if (type === "disable") {
                    url = softDeleteProdEndpoint(id);
                    successMsg = "Producto deshabilitado correctamente";
                } else {
                    url = hardDeleteProdEndpoint(id);
                    successMsg = "Producto eliminado permanentemente";
                }
            }

            const res = await fetch(url, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error();
            closeModal();

           if (entity === "cliente") fetchClients();
            else fetchProducts();
            Swal.fire("👍", successMsg, "success");
        } catch {
            closeModal();
            Swal.fire("Error", "No se pudo eliminar", "error");
        }
    };

    const confirmEdit = async (e) => {
        e.preventDefault();
        const { entity, type } = modal;

            try {
                const res = await fetch(url, { /*…*/ });
                if (!res.ok) throw new Error();
                closeModal();

                if (entity === "cliente") {
                  fetchClients();
                } else {
                  fetchProducts();
                }
            
                if (entity === "producto") {
                  if (type === "create") {
                    Swal.fire("✔️", "Producto creado con éxito", "success");
                  } else {
                    Swal.fire("✔️", "Producto actualizado con éxito", "success");
                  }
                } else {
                  Swal.fire("✔️", "Cliente actualizado con éxito", "success");
                }
            } catch {
                closeModal();
                Swal.fire("❌","Ha ocurrido un error, intente nuevamente.","error");
            }
    };


  const currentClient = clients.find((u) => u.id === modal.id);
  const currentProd   = products.find((p) => p.id === modal.id);

    return (
        <>
            <Header />

            <div className="p-6 max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-center">
                    Panel Administrador
                </h1>
                <p className="text-center text-gray-700 mb-6">
                    En este panel puedes gestionar <strong>Clientes</strong> (Minoristas,
                    Mayoristas) y <strong>Productos</strong>.<br />
                    Crea, deshabilita, edita o elimina ítems según necesites.
                </p>

                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab("clientes")}
                        className={
                            activeTab === "clientes"
                            ? "px-4 py-2 bg-blue-600 text-white rounded"
                            : "px-4 py-2 bg-gray-200 rounded"
                        }
                    >
                        Clientes
                    </button>
                    <button
                        onClick={() => setActiveTab("productos")}
                        className={
                            activeTab === "productos"
                            ? "px-4 py-2 bg-blue-600 text-white rounded"
                            : "px-4 py-2 bg-gray-200 rounded"
                        }
                    >
                        Productos
                    </button>
                </div>

                {activeTab === null && (
                    <p className="text-center text-gray-600">
                        Selecciona una pestaña para comenzar.
                    </p>
                )}

                {activeTab === "clientes" && (
                    <>
                        <div className="flex justify-center space-x-4 mb-4">
                            {[
                                "MinoristaAll",
                                "MinoristaAvailable",
                                "MayoristaAll",
                                "MayoristaAvailable",
                            ].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => setClientFilter(opt)}
                                    className={
                                    clientFilter === opt
                                        ? "px-3 py-1 bg-green-600 text-white rounded"
                                        : "px-3 py-1 bg-gray-200 rounded"
                                    }
                                >
                                    {opt.replace("All", "").replace("Available", " Available")}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clients.map((u) => (
                                <div
                                    key={u.id}
                                    className="border p-4 rounded shadow flex flex-col justify-between"
                                >
                                    <div>
                                        <p className="font-semibold">{u.nameAccount}</p>
                                        <p className="text-sm">
                                            {u.firstName} {u.lastName}
                                        </p>
                                        <p className="text-sm">{u.email}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-4">
                                        <button
                                            onClick={() =>
                                            setModal({
                                                open: true,
                                                entity: "cliente",
                                                id: u.id,
                                                type: "disable",
                                            })
                                            }
                                            aria-label="Deshabilitar cliente"
                                        >
                                            <FaBan size={16} title="Deshabilitar" />
                                        </button>
                                        <button
                                            onClick={() =>
                                            setModal({
                                                open: true,
                                                entity: "cliente",
                                                id: u.id,
                                                type: "edit",
                                            })
                                            }
                                            aria-label="Editar cliente"
                                        >
                                            <MdEdit className="w-6 h-6 text-blue-600" title='Editar'/>
                                        </button>
                                        <button
                                            onClick={() =>
                                            setModal({
                                                open: true,
                                                entity: "cliente",
                                                id: u.id,
                                                type: "delete",
                                            })
                                            }
                                            aria-label="Eliminar cliente"
                                        >
                                            <MdDelete className="w-6 h-6 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "productos" && (
                    <>
                        <div className="mb-4 flex justify-between items-center">
                            <button
                                onClick={() =>
                                    setModal({
                                    open: true,
                                    entity: "producto",
                                    type: "create",
                                    })
                                }
                                className="flex items-center px-4 py-2 bg-blue-600 text-black rounded"
                            >
                                <MdAdd className="w-5 h-5 mr-2" />
                                Crear Producto
                            </button>
                            <div className="flex space-x-4">
                                {["AllProducts", "AvailableProducts"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setProdFilter(opt)}
                                        className={
                                            prodFilter === opt
                                            ? "px-3 py-1 bg-green-600 text-white rounded"
                                            : "px-3 py-1 bg-gray-200 rounded"
                                        }
                                    >
                                        {opt === "AllProducts" ? "All" : "Available"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p) => (
                                <div
                                    key={p.id}
                                    className="border p-4 rounded shadow flex flex-col justify-between"
                                >
                                    <div>
                                        <p className="font-semibold">{p.name}</p>
                                        <p className="text-sm">
                                            ${p.price} – Stock: {p.stock}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-4">
                                        <button
                                            onClick={() =>
                                            setModal({
                                                open: true,
                                                entity: "producto",
                                                id: p.id,
                                                type: "disable",
                                            })
                                            }
                                            aria-label="Deshabilitar producto"
                                        >
                                            <FaBan className="w-6 h-6 text-gray-600" title='Deshabilitar' />
                                        </button>
                                        <button
                                            onClick={() =>
                                            setModal({
                                                open: true,
                                                entity: "producto",
                                                id: p.id,
                                                type: "edit",
                                            })
                                            }
                                            aria-label="Editar producto"
                                        >
                                            <MdEdit className="w-6 h-6 text-blue-600" />
                                        </button>
                                        <button
                                            onClick={() =>
                                            setModal({
                                                open: true,
                                                entity: "producto",
                                                id: p.id,
                                                type: "delete",
                                            })
                                            }
                                            aria-label="Eliminar producto"
                                        >
                                            <MdDelete className="w-6 h-6 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {modal.open && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded w-11/12 max-w-lg">
                            {modal.type === "delete" || modal.type === "disable" ? (
                            <>
                                <h3 className="text-lg font-bold mb-4">
                                {modal.type === "delete"
                                    ? "Confirmar eliminación"
                                    : "Confirmar deshabilitación"}
                                </h3>
                                <div className="flex justify-end space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className={`px-4 py-2 rounded text-white ${
                                    modal.type === "delete" ? "bg-red-600" : "bg-yellow-600"
                                    }`}
                                >
                                    {modal.type === "delete" ? "Eliminar" : "Deshabilitar"}
                                </button>
                                </div>
                            </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold mb-4">
                                        {modal.entity === "producto"
                                            ? modal.type === "create"
                                            ? "Crear Producto"
                                            : "Editar Producto"
                                            : "Editar Cliente"}
                                    </h3>
                                    <form onSubmit={confirmEdit} className="space-y-4">
                                        {activeTab === "clientes" ? (
                                            <>
                                            <input
                                                name="firstName"
                                                defaultValue={currentClient?.firstName}
                                                placeholder="Nombre"
                                                className="w-full border rounded px-3 py-2"
                                            />
                                            <input
                                                name="lastName"
                                                defaultValue={currentClient?.lastName}
                                                placeholder="Apellido"
                                                className="w-full border rounded px-3 py-2"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                defaultValue={currentClient?.email}
                                                placeholder="Email"
                                                className="w-full border rounded px-3 py-2"
                                            />
                                            </>
                                        ) : (
                                            <>
                                                <input
                                                    name="name"
                                                    defaultValue={currentProd?.name}
                                                    placeholder="Nombre"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                                <input
                                                    name="description"
                                                    defaultValue={currentProd?.description}
                                                    placeholder="Descripción"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                                <input
                                                    type="number"
                                                    name="price"
                                                    defaultValue={currentProd?.price}
                                                    placeholder="Precio"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                                <input
                                                    type="number"
                                                    name="stock"
                                                    defaultValue={currentProd?.stock}
                                                    placeholder="Stock"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                                <input
                                                    name="marca"
                                                    defaultValue={currentProd?.marca}
                                                    placeholder="Marca"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                                <input
                                                    name="genero"
                                                    defaultValue={currentProd?.genero}
                                                    placeholder="Género"
                                                    className="w-full border rounded px-3 py-2"
                                                />

                                                <label className="block text-sm font-medium">
                                                    Categoría
                                                </label>
                                                <select
                                                    name="categoryId"
                                                    defaultValue={currentProd?.categoryId || ""}
                                                    className="w-full border rounded px-3 py-2"
                                                >
                                                    <option value="" disabled>
                                                        – Selecciona categoría –
                                                    </option>
                                                    {categories.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <input
                                                    name="photos"
                                                    defaultValue={currentProd?.photos?.join(",")}
                                                    placeholder="Fotos (URLs separadas por coma)"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                            </>
                                        )}
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-4 py-2 border rounded"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                            >
                                                {modal.type === "create"
                                                    ? "Crear"
                                                    : "Guardar"}
                                            </button>
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
