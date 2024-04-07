import { useContext } from 'react'
import './App.css'
import CardsContainer from './components/CardsContainer/CardsContainer'
import Header from './components/Header/Header'
import ModalCreate from './components/ModalCreate/ModalCreate'
import ModalDelete from './components/ModalDelete/ModalDelete'
import SearchBar from './components/SearchBar/SearchBar'
import { MainContext } from './context/MainContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { modalCreate, modalDelete } = useContext(MainContext);

  return (
    <>
      <Header />
      <SearchBar />
      <CardsContainer />
      {modalCreate && <ModalCreate />}
      {modalDelete && <ModalDelete />}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  )
}

export default App
