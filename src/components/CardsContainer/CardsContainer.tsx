import { useContext, useEffect, useState } from "react";
import "./CardsContainer.css";
import Card from "../Card/Card";

import { getAll } from "../../api/CarApi";
import { Car, CarList } from "../../api/Model/Car";
import { MainContext } from "../../context/MainContext";
import { toast } from "react-toastify";

export default function CardsContainer() {
    const { textFilter, shouldRefetch, setModalCreate, setCarIdSelected, setIsLoading } = useContext(MainContext);

    const [cars, setCars] = useState([] as Car[]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCars, setTotalCars] = useState(0);


    const fetchCars = (pageNumber: number) => {
        setIsLoading(true);
        getAll(textFilter, pageNumber).then((cars: CarList) => {
            setCars(cars.items);
            setTotalPages(cars.totalPages);
            setTotalCars(cars.totalItems);
            toast.success('Carregado com sucesso');
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        setPage(1);
    }, [textFilter]);

    useEffect(() => {
        fetchCars(page);
    }, [textFilter, shouldRefetch, page]);


    const openModalCreate = () => {
        setModalCreate(true);
        setCarIdSelected(0);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <section>
            <div className="title-container">
                <h1>Resultados da busca</h1>
                <button onClick={openModalCreate}>Novo Card</button>
            </div>
            <div className="pagination-container">
                <span>Total de carros: {totalCars}</span>
                {totalPages !== 1 &&
                    <>
                        <span>Página {page} de {totalPages}</span>
                        {page !== 1 && <button onClick={handlePrevPage} disabled={page === 1}>Página Anterior</button>}
                        {page !== totalPages && <button onClick={handleNextPage} disabled={page === totalPages}>Próxima Página</button>}
                    </>
                }
            </div>
            <div className="cards-container">
                {cars.length === 0 && <h2>Nenhum carro encontrado</h2>}
                {cars.length > 0
                    && cars.map((car: Car) => (
                        <Card key={car.id} id={car.id} name={car.name} base64={car.photoBase64} />
                    ))}
            </div>
        </section>
    );
}