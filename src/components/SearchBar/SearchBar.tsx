import { FormEvent, useContext, useState } from 'react';
import './SearchBar.css';
import lupaIcon from '../../assets/lupa.png';
import { MainContext } from '../../context/MainContext';

export default function SearchBar() {
    const {  setTextFilter, textFilter, setShouldRefetch, shouldRefetch } = useContext(MainContext);
    const [searchText, setSearchText] = useState(textFilter);

    // #TODO: Implement loading
    // setIsLoading 


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(searchText === textFilter)
            setShouldRefetch(!shouldRefetch);
        setTextFilter(searchText);
    };

    return (
        <div className="searchBar-container">
            <form className='searchBar-input' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite aqui sua busca..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type='submit'>
                    <img src={lupaIcon} alt="busca" />
                </button>
            </form>
        </div>
    );
}
