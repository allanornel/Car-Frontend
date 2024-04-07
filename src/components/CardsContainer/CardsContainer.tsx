import { useContext, useEffect, useState } from "react";
import "./CardsContainer.css";
import Card from "../Card/Card";

import { getAll } from "../../api/CarApi";
import { Car } from "../../api/Model/Car";
import { MainContext } from "../../context/MainContext";
import { toast } from "react-toastify";

export default function CardsContainer() {
    const { textFilter, shouldRefetch, setShouldRefetch, setModalCreate, setCarIdSelected } = useContext(MainContext);

    const [cars, setCars] = useState([] as Car[]);


    useEffect(() => {
        getAll(textFilter).then((cars: Car[]) => {
            setCars(cars);
        });
        setShouldRefetch(false);
        toast.success('Carregado com sucesso');
    }, [textFilter, shouldRefetch]);

    const openModalCreate = () => {
        setModalCreate(true);
        setCarIdSelected(0);
    };

    return (
        <section>
            <div className="title-container">
                <h1>Resultados da busca</h1>
                <button onClick={openModalCreate}>Novo Card</button>
            </div>
            <div className="cards-container">
                {cars.map((car: Car) => (
                    <Card key={car.id} id={car.id} name={car.name} base64={car.photoBase64} />
                ))}
            </div>
        </section>
    );
}