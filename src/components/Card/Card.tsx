import "./Card.css";

import iconEdit from "../../assets/Icon-edit.svg";
import iconDelete from "../../assets/Icon-trash.svg";
import { MainContext } from "../../context/MainContext";
import { useContext } from "react";

interface CardProps {
    id: number;
    name: string;
    base64: string;
}

export default function Card(props: CardProps) {

    const { setModalDelete, setModalCreate, setCarIdSelected } = useContext(MainContext);

    const handleDelete = () => {
        setModalDelete(true);
        setCarIdSelected(props.id);
    }

    const handleEdit = () => {
        setCarIdSelected(props.id);
        setModalCreate(true);
    }

    return (
        <div className="card-container">
            <div className="img-container">
                <img src={`data:image/png;base64,${props.base64}`} alt={props.name} />
            </div>
            <div className="text-container">
                <h4>{props.name}</h4>
            </div>
            <div className="card-icons">
                <div className="delete-container" onClick={handleDelete}>
                    <img src={iconDelete} alt="Deletar" /> Excluir
                </div>
                <div className="separatorIcon"></div>
                <div className="edit-container" onClick={handleEdit}>
                    <img src={iconEdit} alt="Editar" /> Editar
                </div>
            </div>
        </div>
    )
}