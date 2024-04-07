import { createContext, useState, ReactNode } from 'react';

interface MainContextProps {
    textFilter: string;
    setTextFilter: (text: string) => void;
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
    const [isLoading, setIsLoading] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [carIdSelected, setCarIdSelected] = useState(0);
    const [shouldRefetch, setShouldRefetch] = useState(false);


    const contextValue: MainContextProps = {
        textFilter,
        setTextFilter,
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