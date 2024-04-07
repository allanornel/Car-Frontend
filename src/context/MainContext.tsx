import { createContext, useState, ReactNode } from 'react';

interface MainContextProps {
    textFilter: string;
    setTextFilter: (text: string) => void;
    isError: boolean;
    setIsError: (value: boolean) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    modalCreate: boolean;
    setModalCreate: (value: boolean) => void;
    modalDelete: boolean;
    setModalDelete: (value: boolean) => void;
    setCarIdSelected: (value: number) => void;
    carIdSelected: number;
    shouldRefetch: boolean;
    setShouldRefetch: (value: boolean) => void;
}

export const MainContext = createContext<MainContextProps>({
    textFilter: '',
    setTextFilter: () => { },
    isError: false,
    setIsError: () => { },
    isLoading: false,
    setIsLoading: () => { },
    modalCreate: false,
    setModalCreate: () => { },
    modalDelete: false,
    setModalDelete: () => { },
    setCarIdSelected: () => { },
    carIdSelected: 0,
    shouldRefetch: false,
    setShouldRefetch: () => { }
});

interface MainProviderProps {
    children: ReactNode;
}

export default function MainProvider({ children }: MainProviderProps) {
    const [textFilter, setTextFilter] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [carIdSelected, setCarIdSelected] = useState(0);
    const [shouldRefetch, setShouldRefetch] = useState(false);


    const contextValue: MainContextProps = {
        textFilter,
        setTextFilter,
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        modalCreate,
        setModalCreate,
        modalDelete,
        setModalDelete,
        carIdSelected,
        setCarIdSelected,
        shouldRefetch,
        setShouldRefetch
    };

    return (
        <MainContext.Provider value={contextValue}>
            {children}
        </MainContext.Provider>
    );
}