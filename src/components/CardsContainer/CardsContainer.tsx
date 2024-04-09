import { useContext, useEffect, useState } from "react";
import "./CardsContainer.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";

import { getAll } from "../../api/CarApi";
import { Car, CarList } from "../../api/Model/Car";
import { MainContext } from "../../context/MainContext";
import { toast } from "react-toastify";

export default function CardsContainer() {
    const { textFilter, shouldRefetch, setModalCreate, setCarIdSelected, setIsLoading } = useContext(MainContext);

    const [cars, setCars] = useState<Car[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [totalCars, setTotalCars] = useState<number>(0);

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

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

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
            <Pagination page={page} totalPages={totalPages} totalCars={totalCars} onPageChange={handlePageChange} />
            <div className="cards-container">
                {cars.length === 0 && <h2>Nenhum carro encontrado</h2>}
                {cars.length > 0 && cars.map((car: Car) => (
                    <Card key={car.id} id={car.id} name={car.name} base64={car.photoBase64} />
                ))}
            </div>
        </section>
    );
}