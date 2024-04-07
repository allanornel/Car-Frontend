import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { create, update } from "../../api/CarApi";

import './ModalCreate.css';

import iconCreate from "../../assets/icone_criar.svg";
import { toast } from "react-toastify";

export default function ModalCreate() {
    const { modalCreate, setModalCreate, carIdSelected, setShouldRefetch, shouldRefetch, setIsLoading } = useContext(MainContext);
    const [name, setName] = useState<string>('');
    const [fileInput, setFileInput] = useState<File | null>(null);

    const closeModal = () => {
        setModalCreate(false);
    };

    const handleTextInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFileInput(event.target.files[0]);
        } else {
            setFileInput(null);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // CREATE
        if ((!name || !fileInput) && carIdSelected === 0) {
            toast.error("Nome e arquivo são obrigatórios na criação");
            return;
        }

        // UPDATE
        if ((!name && !fileInput) && carIdSelected !== 0) {
            toast.error("Nome ou arquivo são obrigatórios na edição");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        if (fileInput) {
            formData.append('file', fileInput);
        }

        setIsLoading(true);
        if (carIdSelected === 0) {
            try {
                const createdCar = await create(formData);
                console.log(createdCar);
                setShouldRefetch(!shouldRefetch);
                toast.success('Carro criado com sucesso');
            } catch (error) {
                toast.error('Erro ao criar carro');
            }
            finally {
                closeModal();
                setIsLoading(false);
            }
            return;
        }
        // UPDATE
        try {
            await update(carIdSelected, formData);
            setShouldRefetch(!shouldRefetch);
            toast.success('Carro atualizado com sucesso');
        } catch (error) {
            toast.error('Erro ao atualizar carro ' + carIdSelected);
            console.error(error);
        }
        finally {
            closeModal();
            setIsLoading(false);
        }
    };


    return modalCreate && (
        <>
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-create">
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={iconCreate} alt="createIcon" />
                        <h1>{carIdSelected > 0 ? 'Editar' : 'Criar'} Card</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>DIGITE UM NOME PARA O CARD</label>
                        <input type="text" placeholder="Digite o título" value={name} onChange={handleTextInputChange} />
                        <label>INCLUA UMA IMAGEM PARA APARECER NO CARD</label>
                        <input type="file" accept="image/*" onChange={handleFileInputChange} />
                        <div className="buttons">
                            <button type="submit">{carIdSelected > 0 ? 'Editar' : 'Criar'} Card</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

}