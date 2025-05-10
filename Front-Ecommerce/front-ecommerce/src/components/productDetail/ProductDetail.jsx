import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdShare, MdFavoriteBorder } from 'react-icons/md';
import img from "../../assets/image/inicio/aa.webp";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const token = localStorage.getItem("token");


  useEffect(() => {
    fetch(`https://localhost:7174/api/Product/ProductById/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('No se encontró el producto');
        return res.json();
      })
      .then(data => {
        setProducto(data);
        // const imgs = data.images && data.images.length > 0
        //   ? data.images
        //   : [data.imageUrl];
        // setMainImage(imgs[0]);
        // setSelectedSize(data.sizes?.[0] ?? null);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) return <p className="text-center py-20">Cargando producto…</p>;
  if (!producto) return <p className="text-center py-20">Producto no disponible.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* <nav className="text-sm text-gray-500">
        Inicio / Fragancias / Premium / Unisex / Eau de Toilette / Regular
      </nav> */}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0 flex flex-row lg:flex-col gap-4">
          <div className="flex lg:flex-col gap-4">
            {/* {(producto.images || [producto.imageUrl]).map((img, i) => (           si hyuuhibese mas d una foto*/}
              <button
                // key={i}
                // onClick={() => setMainImage(img)}
                className={`border rounded-lg p-1  'border-gray-200'`}
              >
                <img
                  src={img}
                  alt={`${producto.name}`}
                  className="w-20 h-20 object-contain"
                />
              </button>
            {/* ))} */}
          </div>

          <div className="relative border rounded-lg p-4 flex justify-center items-center">
            {producto.exclusive && (
              <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-semibold rounded">
                EXCLUSIVO
              </span>
            )}
            <img
              src={img}
              alt={producto.name}
              className="max-h-[400px] object-contain"
            />
          </div>
        </div>

        <div className="flex-1 bg-gray-50 rounded-2xl p-8 space-y-6 relative">
          <div className="absolute top-6 right-6 flex space-x-4">
            <button onClick={() => console.log('Favorito')}>
              <MdFavoriteBorder size={20} />
            </button>
          </div>

          <h2 className="text-xl font-medium">{producto.marca}</h2>
          <h1 className="text-3xl font-bold">
            {producto.name} {selectedSize} ML
          </h1>

          <div className="space-y-1">
            <p className="text-2xl font-bold text-yellow-600">
              ${producto.price.toLocaleString()}
            </p>
            {producto.sizes && (
              <p className="text-sm text-gray-600">
                {producto.sizes.length} cuotas de $
                {(producto.price / producto.sizes.length).toLocaleString()}
                <span className="ml-2 text-xs">CFTEA: 0%</span>
              </p>
            )}
            <p className="text-xs text-gray-400">
              Precio sin Impuestos Nacionales: $
              {(producto.price * 0.825).toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}
            </p>
          </div>

          {/* {producto.sizes && (
            <div className="space-y-2">
              <p className="font-medium">Elegí un tamaño:</p>
              <div className="flex gap-4">
                {producto.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedSize === sz
                        ? 'bg-white border-black shadow-md'
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {sz} ML
                  </button>
                ))}
              </div>
            </div>
          )} */}

          <button className="mt-4 w-full bg-black text-black py-4 uppercase font-semibold rounded-full hover:bg-gray-800 transition">
            Añadir al carrito
          </button>

          <div className="space-y-4">
            <details className="bg-white rounded-lg border">
              <summary className="px-4 py-3 cursor-pointer flex justify-between items-center">
                Promociones o reintegros
              </summary>
              <div className="px-4 py-3 border-t">
                No hay promociones disponibles.
              </div>
            </details>
            <details className="bg-white rounded-lg border">
              <summary className="px-4 py-3 cursor-pointer flex justify-between items-center">
                Descripción del producto
              </summary>
              <div className="px-4 py-3 border-t">
                {producto.description}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* <section className="prose max-w-none">
        <h3>Descripción</h3>
        <p>{producto.description}</p>
      </section> */}
    </div>
  );
};

export default ProductDetail;
