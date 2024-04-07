import { useContext } from 'react';
import './ModalDelete.css';
import { MainContext } from '../../context/MainContext';

import iconDelete from "../../assets/Icon-trash.svg";
import { deleteCar } from '../../api/CarApi';
import { toast } from 'react-toastify';


export default function DeleteModal() {
  const { modalDelete, setModalDelete, carIdSelected, setCarIdSelected, setShouldRefetch, shouldRefetch, setIsLoading } =
    useContext(MainContext);

  const closeModal = () => {
    setModalDelete(false);
  };

  const deleteCard = () => {
    setIsLoading(true);
    deleteCar(carIdSelected)
    .then(() => {
      setShouldRefetch(!shouldRefetch);
      toast.success('Carro excluído com sucesso');
    })
    .catch(() => {
      toast.error('Erro ao excluir carro');
    })
      .finally(() => {
        setModalDelete(false);
        setCarIdSelected(0);
      });
  };


  return (
    modalDelete && (
      <div>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-delete">
          <div className='close-icon' onClick={closeModal}>X</div>
          <div className="image-container">
            <img src={iconDelete} alt="delete icon"></img>
          </div>
          <h1>Excluir</h1>
          <h4>CERTEZA QUE DESEJA EXCLUIR?</h4>
          <div className="buttons">
            <button onClick={deleteCard}>Excluir</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      </div>
    ));
}
