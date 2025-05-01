import React from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import "./home.css";
import CategoryCard from '../categoryCard/categoryCard';
import imagenInicio from "../../assets/image/inicio/MaisonPerfumes.jpeg";

const Home = () => {
    
    //const [categories, setCategories] = useState([]);
    //useEffect(()=>{
      //fetch("https://localhost:7174/api/categor.............", {
        //method: "GET"
        //headers: {
            //"Content-Type": "application/json",
        //}
      //})
      //.then(res => {
        //if (!res.ok) throw new Error("Error al traer productos");
        //return res.json();
      //})
      //.then(data => setProducts(data))
      //.catch(err => console.error("Error:", err))
      //.finally(() => setLoading(false));
    //},[]);

    return (
        <>
                
                
            <Header />
            <main>

                <section className="hero">

                <img src={imagenInicio} alt="imagenInicio" className="w-full h-48 object-cover" />
                    <h1>Bienvenido a Perfumeria MAISON</h1>
                    <p>Descubre las mejores fragancias para cada ocasión</p>
                    <button>Explorar ahora</button>
                </section>
                <CategoryCard key={category}/>



                {/*<section className="products">
                     <h2 style={{display: "flex", justifyContent: "center"}}>Productos Destacados</h2>
                    <div className="product-list">
                        <div className="product-card">
                            <img src="perfume1.jpg" alt="Perfume 1" />
                            <h3>Perfume 1</h3>
                            <p>$50.00</p>
                            <button>Comprar</button>
                        </div>
                        <div className="product-card">
                            <img src="perfume2.jpg" alt="Perfume 2" />
                            <h3>Perfume 2</h3>
                            <p>$60.00</p>
                            <button>Comprar</button>
                        </div>
                        <div className="product-card">
                            <img src="perfume3.jpg" alt="Perfume 3" />
                            <h3>Perfume 3</h3>
                            <p>$70.00</p>
                            <button>Comprar</button>
                        </div>
                    </div> 
                </section>*/}
                
            </main>
            <Footer />
        </>
    )
}

export default Home;