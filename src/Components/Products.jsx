import "../Pages/ProductsPage/ProductsPage.jsx"
import {NavLink} from "react-router-dom";
import style from "../Pages/ProductsPage/ProductsPage.module.css";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../Context/AuthContext.jsx";
import {ErrorContext} from "../Context/ErrorContext.jsx";
import {LoadingContext} from "../Context/LoadingContext.jsx";
import Spinner from "./Spinner.jsx";


function Products({image, category}) {
    const [product, setProduct] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const {token} = useContext(AuthContext);
    const {error, handleError, clearError} = useContext(ErrorContext);
    const {startLoading, stopLoading, loading} = useContext(LoadingContext);

    useEffect(() => {
        void fetchProduct();
        void fetchCategory()
    }, []);

    async function fetchProduct() {

        try {
            clearError();
            startLoading(<Spinner/>);
            const response = await axios.get('http://localhost:8080/product', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
                });
            setProduct(response.data);
        } catch (e) {
            console.error(e);
            console.error("Error status:", e.response.status);
            console.error("Error data:", e.response.data);
            handleError();
        }
        stopLoading();
    }

    async function fetchCategory(){

        try {
            clearError();
            startLoading(<Spinner/>);
            const result = await axios.get(`http://localhost:8080/product/byCategory?category=${category}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
                })
            setCategoryName(result.data);
        }catch (e) {
            console.error(e)
            console.error("Error status:", e.response.status);
            console.error("Error data:", e.response.data);
            handleError();
        } finally {
            stopLoading();
        }
    }

    return (
        <>{loading ? <Spinner/>
            :
            <>
            {category === "leeg" ?
                product.map((product) => (
                        <div className={style["products__container"]} key={product.id}>
                            <figure className={style["products__figure"]}>
                                <img src={image} alt={product.name}/>
                            </figure>
                            <p>{product.name}</p>
                            <p>{product.blend}</p>
                            <p>{product.color}</p>
                            <NavLink className={style.link} to={`/products-detail/${product.id}`}>More info</NavLink>
                        </div>
                    ))
            :
                categoryName.map((category) => (

                    <div className={style["products__container"]} key={category.id}>
                        <figure className={style["products__figure"]}>
                            <img src={image} alt={category.name}/>
                        </figure>
                        <p>{category.name}</p>
                        <p>{category.blend}</p>
                        <p>{category.color}</p>

                        <NavLink className={style.link} to={`/products-detail/${category.id}`}>More info</NavLink>
                    </div>
                ))}
                {error && (<p className={style.error}>Er is iets mis gegaan....Herlaad de pagina. Of neem contact op met de eigenaar.</p>)}
            </>}
        </>
    );

}

export default Products;