import './Pagination.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalCars: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, totalCars, onPageChange }: PaginationProps) {
  const handleNextPage = () => {
    onPageChange(page + 1);
  };

  const handlePrevPage = () => {
    onPageChange(page - 1);
  };

  return (
    <div className="pagination-container">
      <span>Total de carros: {totalCars}</span>
      {totalPages !== 0 && (
        <>
          <span>Página {page} de {totalPages}</span>
          {page !== 1 && <button onClick={handlePrevPage}>Página Anterior</button>}
          {page !== totalPages && <button onClick={handleNextPage}>Próxima Página</button>}
        </>
      )}
    </div>
  );
}

