import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../header/Header";
import Swal from "sweetalert2";
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { FaBan } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const URL = "https://localhost:7174/api/";

export default function DashboardAdmin() {
    const { auth, loading: authLoading } = useAuth();
    const token = auth?.token;

    const [activeTab, setActiveTab] = useState(null);

    const [clientFilter, setClientFilter] = useState(null); // Empieza desactivado
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

    const { mode } = useTheme()

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tabParam = params.get("tab");
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [location.search]);

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

    const softDeleteClientEndpoint = (id) => {
        const user = clients.find((u) => u.id === id);
        if (!user) throw new Error("Cliente no encontrado");

        return user.tipo === "Minorista"
            ? `${URL}Minorista/SoftDeleteMinorista/${id}`
            : `${URL}Mayorista/SoftDelete/${id}`;
    };
    const hardDeleteClientEndpoint = (id) => {
        const user = clients.find((u) => u.id === id);
        if (!user) throw new Error("Cliente no encontrado");

        return user.tipo === "Minorista"
            ? `${URL}Minorista/HardDeleteMinorista/${id}`
            : `${URL}Mayorista/HardDelete/${id}`;
    };
    const editClientEndpoint = (id) => {
        const user = clients.find((u) => u.id === id);
        if (!user) throw new Error("Cliente no encontrado");

        return user.tipo === "Minorista"
            ? `${URL}Minorista/UpdateMinorista/${id}`
            : `${URL}Mayorista/UpdateMayorista/${id}`;
    };
    const readProductEndpoint = () =>
        prodFilter === "AllProducts"
            ? `${URL}Product/AllProducts`
            : `${URL}Product/AllProductsAvailable`;

    const softDeleteProdEndpoint = id => `${URL}Product/SoftDeleteProduct/${id}`;
    const hardDeleteProdEndpoint = id => `${URL}Product/HardDeleteProduct/${id}`;
    const editProdEndpoint = (id) => `${URL}Product/UpdateProduct/${id}`;
    const createProdEndpoint = () => `${URL}Product/CreateProduct`;

    const fetchClients = async () => {
        try {
            if (!clientFilter) {
                const [minoristasRes, mayoristasRes] = await Promise.all([
                    fetch(`${URL}Minorista/AllMinoristas`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(`${URL}Mayorista/AllMayoristas`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (!minoristasRes.ok || !mayoristasRes.ok) throw new Error();

                const [minoristas, mayoristas] = await Promise.all([
                    minoristasRes.json(),
                    mayoristasRes.json(),
                ]);

                const minoristasWithType = minoristas.map((c) => ({ ...c, tipo: "Minorista" }));
                const mayoristasWithType = mayoristas.map((c) => ({ ...c, tipo: "Mayorista" }));

                setClients([...minoristasWithType, ...mayoristasWithType]);
            } else {
                const res = await fetch(readClientEndpoint(), {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error();
                const data = await res.json();

                const tipo = clientFilter.includes("Minorista") ? "Minorista" : "Mayorista";
                const dataWithType = data.map((c) => ({ ...c, tipo }));

                setClients(dataWithType);
            }
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
        if (activeTab === "clientes") fetchClients();
        if (activeTab === "productos") {
            fetchProducts();
            fetchCategories();
        }
        if (activeTab === "categorias") fetchCategories();
    }, [activeTab, clientFilter, prodFilter]);

    useEffect(() => {
        if (modal.open && modal.entity === "cliente" && modal.type === "edit") {
            const client = clients.find((u) => u.id === modal.id);
            if (client) {
                setEditClientData({ ...client });
            }
        }
    }, [modal, clients]);


    const closeModal = () => {
        setModal({ open: false, entity: null, id: null, type: null });
    };

    const confirmDelete = async () => {
        const { entity, id, type } = modal;

        try {
            let url, successMsg;

            if (entity === "cliente") {
                url =
                    type === "disable"
                        ? softDeleteClientEndpoint(id)
                        : hardDeleteClientEndpoint(id);
                successMsg =
                    type === "disable"
                        ? "Cliente deshabilitado correctamente"
                        : "Cliente eliminado permanentemente";
            } else if (entity === 'producto') {
                url =
                    type === "disable"
                        ? softDeleteProdEndpoint(id)
                        : hardDeleteProdEndpoint(id);
                successMsg =
                    type === "disable"
                        ? "Producto deshabilitado correctamente"
                        : "Producto eliminado permanentemente";
            } else if (entity === "categoria") {
                url = `${URL}Category/HardDeleteCategory/${id}`;
                successMsg = "Categoría eliminada correctamente";
            } else {
                throw new Error("Entidad no reconocida");
            }

            console.log("→ DELETE:", url);

            const res = await fetch(url, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const text = await res.text();

            if (!res.ok) {
                console.error("Error del backend:", text);
                throw new Error(text || "Falló el DELETE");
            }

            closeModal();

            if (entity === "cliente") fetchClients();
            else fetchProducts();

            Swal.fire("✔️", successMsg, "success");
        } catch (err) {
            console.error("Error en confirmDelete:", err);
            closeModal();
            Swal.fire("❌", err.message || "No se pudo eliminar", "error");
        }

    };

    const confirmEdit = async (e) => {
        e.preventDefault();
        const { entity, type, id } = modal;

        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            // Producto
            if (entity === "producto") {
                if (data.photos) {
                    data.photos = data.photos.split(",").map((url) => url.trim());
                }
                if (data.price) data.price = parseFloat(data.price);
                if (data.stock) data.stock = parseInt(data.stock);

                const url =
                    type === "edit"
                        ? editProdEndpoint(id)
                        : createProdEndpoint();

                const res = await fetch(url, {
                    method: type === "edit" ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });

                if (!res.ok) throw new Error();

                closeModal();
                fetchProducts();

                Swal.fire(
                    "✔️",
                    type === "edit"
                        ? "Producto actualizado con éxito"
                        : "Producto creado con éxito",
                    "success"
                );
            }

            // Cliente
            if (entity === "cliente") {
                const { firstName, lastName, email } = editClientData;

                if (!firstName || !lastName || !email) {
                    Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
                    return;
                }

                const url = editClientEndpoint(id);

                const res = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(editClientData),
                });

                if (!res.ok) throw new Error();

                closeModal();
                fetchClients();
                Swal.fire("✔️", "Cliente actualizado con éxito", "success");
            }
            if (entity === "categoria") {
                const form = new FormData(e.target);
                const nombre = form.get("name");

                const url = type === "create"
                    ? `${URL}Category/CreateCategory`
                    : `${URL}Category/UpdateCategory/${id}`;

                const res = await fetch(url, {
                    method: type === "create" ? "POST" : "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name: nombre }),
                });

                if (!res.ok) throw new Error();
                fetchCategories();
                closeModal();
                Swal.fire("✔️", `Categoría ${type === "create" ? "creada" : "actualizada"} con éxito`, "success");
                return;
            }
        } catch (err) {
            console.error("Error en confirmEdit:", err);
            closeModal();
            Swal.fire("❌", "Ha ocurrido un error. Revisá los datos ingresados.", "error");
        }
    };

    const [editClientData, setEditClientData] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });

    const [adminData, setAdminData] = useState({
        firstName: "",
        lastName: "",
        nameAccount: "",
        password: "",
        email: "",
        dni: "",
        phoneNumber: "",
        address: ""
    });

    const handleAdminChange = e => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${URL}superAdmin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(adminData)
            });
            if (!res.ok) throw new Error();
            Swal.fire("✔️", "Administrador creado", "success");
            setAdminData({
                firstName: "", lastName: "", nameAccount: "", password: "",
                email: "", dni: "", phoneNumber: "", address: ""
            });
        } catch {
            Swal.fire("❌", "Error al crear administrador", "error");
        }
    };




    const currentClient = clients.find((u) => u.id === modal.id);
    const currentProd = products.find((p) => p.id === modal.id);
    const currentCategory = categories.find(c => c.id === modal.id);

    return (
        <div className="w-full">
            <div className="p-6 max-w-5xl mx-auto my-10">
                <h1 className="text-3xl font-bold mb-2 text-center">
                    Panel Administrador
                </h1>
                <p className={`text-center ${mode === "dark" ? "text-gray-200" : "text-gray-800"} mb-6`}>
                    En este panel puedes gestionar <strong>Clientes</strong> (Minoristas,
                    Mayoristas) y <strong>Productos</strong>.<br />
                    Crea, deshabilita, edita o elimina ítems según necesites.
                </p>

                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab("clientes")}
                        className={`btn ${activeTab === "clientes" ? "btn-active" : "btn-inactive"}`}

                    >
                        Clientes
                    </button>
                    <button
                        onClick={() => setActiveTab("productos")}
                        className={`btn ${activeTab === "productos" ? "btn-active" : "btn-inactive"}`}
                    >
                        Productos
                    </button>
                    <button
                        onClick={() => setActiveTab("categorias")}
                        className={`btn ${activeTab === "categorias" ? "btn-active" : "btn-inactive"}`}
                    >
                        Categorías
                    </button>
                    <button
                        onClick={() => setActiveTab("admins")}
                        className={`btn ${activeTab === "admins" ? "btn-active" : "btn-inactive"}`}
                    >
                        Agregar Administrador
                    </button>
                </div>

                {activeTab === null && (
                    <p className={`text-center ${mode === "dark" ? "text-gray-200" : "text-gray-600"}`}>
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
                                    onClick={() => setClientFilter(clientFilter === opt ? null : opt)}
                                    className={`btn ${clientFilter === opt
                                        ? "btn-active"
                                        : "btn-inactive"
                                        }`}
                                >
                                    {opt.replace("All", "").replace("Available", " Disponibles").replace("Minorista", "Minoristas").replace("Mayorista", "Mayoristas")}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clients.map((u) => (
                                <div
                                    key={u.id}
                                    className="border p-4 rounded shadow flex flex-col justify-between bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{u.nameAccount}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{u.firstName} {u.lastName}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">{u.email}</p>
                                    </div>
                                    <div className="mt-4 flex justify-end space-x-4">
                                        {u.tipo === "Mayorista" && (
                                            <button
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: "Actualizar descuento",
                                                        input: "number",
                                                        inputLabel: "Nuevo descuento (%)",
                                                        inputPlaceholder: "Por ejemplo: 10 para 10%",
                                                        showCancelButton: true,
                                                        confirmButtonText: "Actualizar",
                                                        cancelButtonText: "Cancelar",
                                                        inputAttributes: {
                                                            min: 0,
                                                            max: 100,
                                                            step: 1
                                                        }
                                                    }).then(async (result) => {
                                                        if (result.isConfirmed) {
                                                            const newRate = parseFloat(result.value);
                                                            if (isNaN(newRate) || newRate < 0 || newRate > 100) {
                                                                Swal.fire("Error", "Ingrese un valor válido entre 0 y 100", "error");
                                                                return;
                                                            }

                                                            try {
                                                                const res = await fetch(`https://localhost:7174/api/Mayorista/${u.id}/discount`, {
                                                                    method: "PATCH",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                        Authorization: `Bearer ${token}`,
                                                                    },
                                                                    body: JSON.stringify({ discountRate: newRate / 100 }),
                                                                });

                                                                if (!res.ok) throw new Error();

                                                                Swal.fire("✔️", "Descuento actualizado correctamente", "success");
                                                                fetchClients(); // recargar los datos
                                                            } catch {
                                                                Swal.fire("Error", "No se pudo actualizar el descuento", "error");
                                                            }
                                                        }
                                                    });
                                                }}
                                                aria-label="Editar descuento"
                                            >
                                                <span className="text-green-400 hover:text-green-600 hover:scale-110 text-lg font-bold">%</span>
                                            </button>
                                        )}
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
                                            <FaBan className="w-6 h-6 text-yellow-400 hover:text-yellow-600 hover:scale-110" title="Deshabilitar" />
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
                                            <MdEdit className="w-6 h-6 text-blue-400 hover:text-blue-600 hover:scale-110" title='Editar' />
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
                                            <MdDelete className="w-6 h-6 text-red-400 hover:text-red-600 hover:scale-110" title="Eliminar" />
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
                                className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-600 hover:text-white text-black rounded"
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
                                                ? "px-4 py-2 bg-green-600 text-gray rounded"
                                                : "px-4 py-2 bg-gray-200 hover:bg-green-400 rounded"
                                        }
                                    >
                                        {opt === "AllProducts" ? "Todos" : "Disponibles"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p) => (
                                <div
                                    key={p.id}
                                    className="border p-4 rounded shadow flex flex-col justify-between bg-gray-200 dark:bg-gray-800 dark:text-gray-100"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{p.name}</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
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
                                            <FaBan className="w-6 h-6 text-yellow-400 hover:text-yellow-600 hover:scale-110" title='Deshabilitar' />
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
                                            <MdEdit className="w-6 h-6 text-blue-400 hover:text-blue-600 hover:scale-110" title="Editar" />
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
                                            <MdDelete className="w-6 h-6 text-red-400 hover:text-red-600 hover:scale-110" title="Eliminar" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {modal.open && (
                    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
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
                                            className={`px-4 py-2 rounded ${modal.type === "delete" ? "bg-red-400 hover:bg-red-600 hover:text-white" : "bg-yellow-400 hover:bg-yellow-600 hover:text-white"
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
                                            : modal.entity === "cliente"
                                                ? "Editar Cliente"
                                                : modal.entity === "categoria"
                                                    ? (modal.type === "create" ? "Crear Categoría" : "Editar Categoría")
                                                    : ""}
                                    </h3>
                                    <form onSubmit={confirmEdit} className="space-y-4">
                                        {modal.entity === "cliente" && (
                                            <>
                                                <input
                                                    name="firstName"
                                                    value={editClientData.firstName}
                                                    onChange={(e) =>
                                                        setEditClientData({ ...editClientData, firstName: e.target.value })
                                                    }
                                                    placeholder="Nombre"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                                <input
                                                    name="lastName"
                                                    value={editClientData.lastName}
                                                    onChange={(e) =>
                                                        setEditClientData({ ...editClientData, lastName: e.target.value })
                                                    }
                                                    placeholder="Apellido"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={editClientData.email}
                                                    onChange={(e) =>
                                                        setEditClientData({ ...editClientData, email: e.target.value })
                                                    }
                                                    placeholder="Email"
                                                    className="w-full border rounded px-3 py-2"
                                                />
                                            </>
                                        )}

                                        {modal.entity === "producto" && (
                                            <>
                                                <input name="name" defaultValue={currentProd?.name} placeholder="Nombre" className="w-full border rounded px-3 py-2" />
                                                <input name="description" defaultValue={currentProd?.description} placeholder="Descripción" className="w-full border rounded px-3 py-2" />
                                                <input type="number" name="price" defaultValue={currentProd?.price} placeholder="Precio" className="w-full border rounded px-3 py-2" />
                                                <input type="number" name="stock" defaultValue={currentProd?.stock} placeholder="Stock" className="w-full border rounded px-3 py-2" />
                                                <input name="marca" defaultValue={currentProd?.marca} placeholder="Marca" className="w-full border rounded px-3 py-2" />
                                                <input name="genero" defaultValue={currentProd?.genero} placeholder="Género" className="w-full border rounded px-3 py-2" />
                                                <label className="block text-sm font-medium">Categoría</label>
                                                <select name="categoryId" defaultValue={currentProd?.categoryId || ""} className="w-full border rounded px-3 py-2">
                                                    <option value="" disabled>– Selecciona categoría –</option>
                                                    {categories.map((cat) => (
                                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                    ))}
                                                </select>
                                                <input name="photos" defaultValue={currentProd?.photos?.join(",")} placeholder="Fotos (URLs separadas por coma)" className="w-full border rounded px-3 py-2" />
                                            </>
                                        )}

                                        {modal.entity === "categoria" && (
                                            <>
                                                <input name="name" defaultValue={currentCategory?.name} placeholder="Nombre de la categoría" className="w-full border rounded px-3 py-2" />
                                            </>
                                        )}

                                        <div className="flex justify-end space-x-4">
                                            <button type="button" onClick={closeModal} className="px-4 py-2 border rounded">Cancelar</button>
                                            <button type="submit" className="px-4 py-2 bg-blue-400 hover:bg-blue-600 hover:text-white rounded">
                                                {modal.type === "create" ? "Crear" : "Guardar"}
                                            </button>
                                        </div>
                                    </form>

                                </>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "categorias" && (
                    <>
                        <div className="mb-4 flex justify-between items-center">
                            <button
                                onClick={() =>
                                    setModal({ open: true, entity: "categoria", type: "create" })
                                }
                                className="flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded"
                            >
                                <MdAdd className="w-5 h-5 mr-2" />
                                Crear Categoría
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map(cat => (
                                <div key={cat.id} className="border p-4 rounded shadow flex justify-between bg-gray-200 dark:bg-gray-800 dark:text-gray-100">
                                    <span className="font-semibold text-gray-900 dark:text-white">{cat.name}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() =>
                                                setModal({ open: true, entity: "categoria", id: cat.id, type: "edit" })
                                            }
                                        >
                                            <MdEdit className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setModal({ open: true, entity: "categoria", id: cat.id, type: "delete" })
                                            }
                                        >
                                            <MdDelete className="w-6 h-6 text-red-400 hover:text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "admins" && (
                    <form onSubmit={handleCreateAdmin} className="max-w-md mx-auto space-y-4">
                        {[
                            { name: "firstName", label: "Nombre" },
                            { name: "lastName", label: "Apellido" },
                            { name: "nameAccount", label: "Nombre de usuario" },
                            { name: "password", label: "Contraseña", type: "password" },
                            { name: "email", label: "Email", type: "email" },
                            { name: "dni", label: "DNI" },
                            { name: "phoneNumber", label: "Número de teléfono" },
                            { name: "address", label: "Dirección" }
                        ].map(({ name, label, type = "text" }) => (
                            <input
                                key={name}
                                name={name}
                                type={type}
                                placeholder={label}
                                value={adminData[name]}
                                onChange={handleAdminChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        ))}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                        >
                            Crear Administrador
                        </button>
                    </form>
                )}

            </div>
        </div>
    );
}
