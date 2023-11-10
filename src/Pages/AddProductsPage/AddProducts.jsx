import style from "./AddProducts.module.css"
import {useForm} from "react-hook-form";
import NavigationHome from "../NavigationHomePage/NavigationHome.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import Button from "../../Components/Button.jsx";

function AddProducts() {

    const [file, setFile] = useState([]);

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();


    async function handleFormSubmit(data) {
        try {
            const response = await axios.post('http://localhost:8080/product', data);
            console.log(response.data)
            navigate("/products/leeg");
        } catch (e) {
            console.error(e);
            console.error("Error status:", e.response.status);
            console.error("Error data:", e.response.data);
        }
    }

    function handleImageChange(e) {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    async function handleImageSubmit() {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file)
        try {

            const response = await axios.post('http://localhost:8080/single/uploadDB', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log(response.data)
        } catch (e) {
            console.error(e);
            console.error("Error status:", e.response.status);
            console.error("Error data:", e.response.data);
        }
    }

    return (
        <>
            <div className={style.background}>
                <div className={style.container}>
                    <NavigationHome/>
                    <form className={style.form}
                          onSubmit={handleSubmit(handleFormSubmit)}>
                        <h1 className={style.title}>Add a product</h1>
                        <input
                            className={style.input}
                            type="text"
                            id="name"
                            placeholder="Name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is required"
                                }
                            })}
                        />

                        <input
                            className={style.input}
                            type="text"
                            id="brand"
                            placeholder="Brand"
                            {...register("brand", {
                                required: {
                                    value: true,
                                    message: "Brand is required"
                                }
                            })}
                        />

                        <input
                            className={style.input}
                            type="text"
                            id="color"
                            placeholder="Color"
                            {...register("color", {
                                required: {
                                    value: true,
                                    message: "Color is required"
                                }
                            })}
                        />

                        <input
                            className={style.input}
                            type="text"
                            id="blend"
                            placeholder="Blend"
                            {...register("blend", {
                                required: {
                                    value: true,
                                    message: "Blend is required"
                                }
                            })}
                        />

                        <input
                            className={style.input}
                            type="text"
                            id="category"
                            placeholder="Category"
                            {...register("category", {
                                required: {
                                    value: true,
                                    message: "Category is required"
                                }
                            })}
                        />

                        <input
                            className={style.input}
                            type="text"
                            id="gauge"
                            placeholder="Gauge (bv. 10x10cm = 22stx24rows)"
                            {...register("gauge", {
                                required: {
                                    value: true,
                                    message: "Gauge is required"
                                }
                            })}
                        />

                        <div className={style.numbers}>
                            <input
                                className={style.input}
                                type="number"
                                id="needleSize"
                                placeholder="Needle Size"
                                {...register("needleSize", {
                                    required: {
                                        value: true,
                                        message: "Needle size is required"
                                    }
                                })}
                            />

                            <input
                                className={style.input}
                                type="number"
                                id="length"
                                placeholder="Length"
                                {...register("length", {
                                    required: {
                                        value: true,
                                        message: "Length is required"
                                    }
                                })}
                            />
                        </div>
                        <textarea
                            className={`${style.input} ${style.area}`}
                            id="description"
                            placeholder="Description"
                            rows="10"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Description is required"
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            text="Submit"/>
                    </form>
                        <div className={style["image-container"]}>
                    <input className="text-color"
                           id="file"
                           type="file"
                           title=" "
                           onChange={handleImageChange}
                    />
                    <Button
                        type='submit'
                        click={handleImageSubmit}
                        text='Send'/>
                        </div>
                </div>
            </div>

        </>
    )
}

export default AddProducts;