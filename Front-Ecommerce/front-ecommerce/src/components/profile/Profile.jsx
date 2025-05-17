import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { useEffect } from 'react';

const Profile = () => {
    const { user, logout } = useUser();
    // const { token } = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        accountType: user?.accountType || '',
        address: user?.address || '',
        dni: user?.dni || '',
        nameAccount: user?.nameAccount || '',
        phoneNumber: user?.phoneNumber || '',
        cuit: user?.accountType === 'Mayorista' ? user?.cuit : '', 
        categoria: user?.accountType === 'Mayorista' ? user?.categoria : '',
    });
    const navigate = useNavigate()

    if (!user) {
        return <div className="text-center text-gray-500">Cargando datos del usuario...</div>;
    }

    const handleEditClick = () => {
        setIsEditing(true);
        setFormData(user); 
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const updatedData = { ...formData };
        if (!updatedData.password) {
            delete updatedData.password;
        }
    
        const endpoint = user?.accountType === 'Minorista'
          ? `https://localhost:7174/api/Minorista/UpdateMinorista/${user.id}`
          : `https://localhost:7174/api/Mayorista/UpdateMayorista/${user.id}`;
    
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${user?.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
    
            if (!response.ok) {
                throw new Error('Error actualizando usuario');
            }
    
            alert('Datos actualizados correctamente');
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar los datos');
        }
    };
    
    

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className='w-full'/*className="max-w-2xl mx-auto p-6 my-8  rounded-xl shadow-xl overflow-hidden border border-gray-200"*/>
            <div className=/*"bg-gradient-to-r from-gray-800 via-blue-600 to-gray-900"bg-blue-600*/ "p-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Mi Perfil</h2>
                <div className="flex justify-center mt-2">
                    <div className="h-1 w-20 bg-gray-800 rounded-full"></div>
                </div>
            </div>
            
            {!isEditing ? (
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg border border-black bg-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 border-b border-black pb-2 mb-3">Información Personal</h3>
                            <div className="space-y-3">
                                <p>
                                    <span className="font-medium text-gray-700">Nombre:</span>
                                    <span className="ml-2 text-gray-900">{user?.firstName}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Apellido:</span>
                                    <span className="ml-2 text-gray-900">{user?.lastName}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Email:</span>
                                    <span className="ml-2 text-gray-900">{user?.email}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Tipo de cuenta:</span>
                                    <span className="ml-2 px-2 py-1 bg-gray-800 text-gray-100 text-xs font-medium rounded-full">
                                        {user?.accountType}
                                    </span>
                                </p>
                                {user?.accountType === 'Mayorista' && (
                                    <>
                                        <p>
                                            <span className="font-medium text-gray-700">CUIT:</span>
                                            <span className="ml-2 text-gray-900">{user?.cuit || 'No especificado'}</span>
                                        </p>
                                        <p>
                                            <span className="font-medium text-gray-700">Categoría:</span>
                                            <span className="ml-2 text-gray-900">{user?.categoria || 'No especificada'}</span>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        
                        <div className="p-4 rounded-lg border border-black bg-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 border-b border-black pb-2 mb-3">Detalles Adicionales</h3>
                            <div className="space-y-3">
                                <p>
                                    <span className="font-medium text-gray-700">Dirección:</span>
                                    <span className="ml-2 text-gray-900">{user?.address || 'No especificada'}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">DNI:</span>
                                    <span className="ml-2 text-gray-900">{user?.dni || 'No especificado'}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Nombre de cuenta:</span>
                                    <span className="ml-2 text-gray-900">{user?.nameAccount || 'No especificado'}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">Teléfono:</span>
                                    <span className="ml-2 text-gray-900">{user?.phoneNumber || 'No especificado'}</span>
                                </p>
                                
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                        <button 
                            onClick={handleEditClick}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-600 text-gray py-3 px-6 rounded-lg font-semibold transition duration-200 shadow-md hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Editar Perfil
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-400 hover:bg-red-600 text-gray py-3 px-6 rounded-lg font-semibold transition duration-200 shadow-md hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-6">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
                                <input
                                    type="text"
                                    name="accountType"
                                    id="accountType"
                                    value={formData.accountType}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
                                <input
                                    type="text"
                                    name="dni"
                                    id="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="nameAccount" className="block text-sm font-medium text-gray-700 mb-1">Nombre de Cuenta</label>
                                <input
                                    type="text"
                                    name="nameAccount"
                                    id="nameAccount"
                                    value={formData.nameAccount}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition duration-200"
                                />
                            </div>
                            {formData.accountType === 'Mayorista' && (
                                    <>
                                        <div className="flex flex-col">
                                            <label htmlFor="cuit" className="text-gray-700 font-medium">CUIT:</label>
                                            <input
                                                type="text"
                                                name="cuit"
                                                id="cuit"
                                                value={formData.cuit}
                                                onChange={handleChange}
                                                className="p-2 rounded border border-gray-300 mt-1"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="categoria" className="text-gray-700 font-medium">Categoría:</label>
                                            <input
                                                type="text"
                                                name="categoria"
                                                id="categoria"
                                                value={formData.categoria}
                                                onChange={handleChange}
                                                className="p-2 rounded border border-gray-300 mt-1"
                                            />
                                        </div>
                                    </>
                                )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button 
                                type="button"
                                onClick={handleSave}
                                className="flex-1 flex items-center justify-center gap-2 bg-green-400 hover:bg-green-600 hover:text-white py-3 px-6 rounded font-semibold transition duration-200 shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Guardar Cambios
                            </button>
                            <button 
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 flex items-center justify-center gap-2 bg-red-400 hover:bg-red-600 py-3 px-6 rounded font-semibold transition duration-200 shadow-md hover:text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
export default Profile;