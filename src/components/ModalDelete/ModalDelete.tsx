import { useContext } from 'react';
import './ModalDelete.css';
import { MainContext } from '../../context/MainContext';

import iconDelete from "../../assets/Icon-trash.svg";
import { deleteCar } from '../../api/CarApi';


export default function DeleteModal() {
  const { modalDelete, setModalDelete, carIdSelected, setCarIdSelected, setShouldRefetch } =
    useContext(MainContext);

  const closeModal = () => {
    setModalDelete(false);
  };

  const deleteCard = () => {
    deleteCar(carIdSelected).then(() => {
      setShouldRefetch(true);

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
