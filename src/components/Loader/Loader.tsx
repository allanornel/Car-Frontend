import { useContext, useEffect, useState } from "react"
import { MainContext } from "../../context/MainContext"
import { toast } from "react-toastify";

export default function Loader() {
    const { isLoading } = useContext(MainContext);
    const [idLoader , setIdLoader] = useState<string | number | null>(null);

    useEffect(() => {
        let id: string | number | null = null;
        if (isLoading) {
            id = toast.loading('Carregando...');
            setIdLoader(id);
        } else {
            if (idLoader)
                toast.dismiss(idLoader);
        }
    }, [isLoading]);
    return <>
    </>;
}