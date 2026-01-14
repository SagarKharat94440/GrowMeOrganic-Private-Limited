import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const ArtworkTable = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [selectFromTop, setSelectFromTop] = useState(0);
  const overlayRef = useRef<OverlayPanel>(null);

  const rowsPerPage = 12;

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}`);
      const json = await res.json();
      setArtworks(json.data);
      setTotalRecords(json.pagination.total);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const getSelectedRows = (): Artwork[] => {
    const selected: Artwork[] = [];
    const startIndex = (page - 1) * rowsPerPage;

    for (let i = 0; i < artworks.length; i++) {
      const artwork = artworks[i];
      const globalIndex = startIndex + i;

      if (selectFromTop > 0 && globalIndex < selectFromTop) {
        selected.push(artwork);
      } else if (selectedIds.includes(artwork.id)) {
        selected.push(artwork);
      }
    }

    return selected;
  };

  const handlePageChange = (e: any) => {
    const newPage = (e.first / e.rows) + 1;
    setPage(newPage);
  };

  const handleSelectionChange = (e: any) => {
    const newSelection: Artwork[] = e.value;
    const newSelectedIds = [...selectedIds];
    for (const artwork of artworks) {
      const idx = newSelectedIds.indexOf(artwork.id);
      if (idx !== -1) {
        newSelectedIds.splice(idx, 1);
      }
    }

    for (const artwork of newSelection) {
      if (!newSelectedIds.includes(artwork.id)) {
        newSelectedIds.push(artwork.id);
      }
    }

    setSelectedIds(newSelectedIds);
    
    setSelectFromTop(0);
  };
  const handleCustomSelect = () => {
    if (inputValue && inputValue > 0) {
      setSelectedIds([]);
      setSelectFromTop(inputValue);
      overlayRef.current?.hide();
    }
  };
  const getSelectedCount = () => {
    if (selectFromTop > 0) {
      return selectFromTop;
    }
    return selectedIds.length;
  };

  const textBody = (rowData: Artwork, field: keyof Artwork) => {
    const value = rowData[field];
    if (value === null || value === undefined || value === '') {
      return 'N/A';
    }
    return String(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div 
        style={{ 
          padding: '10px 15px', 
          marginBottom: '0',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer'
        }}
        onClick={(e) => overlayRef.current?.toggle(e)}
      >
        <span style={{ color: '#495057' }}>
          Selected: {getSelectedCount()} rows
        </span>
        <i className="pi pi-chevron-down" style={{ fontSize: '12px', color: '#6c757d' }}></i>
      </div>

      <OverlayPanel ref={overlayRef}>
        <div style={{ padding: '10px', width: '200px' }}>
          <p style={{ marginBottom: '10px' }}>Select rows:</p>
          <InputNumber
            value={inputValue}
            onValueChange={(e) => setInputValue(e.value ?? null)}
            placeholder="Enter number"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <Button
            label="Submit"
            onClick={handleCustomSelect}
            style={{ width: '100%' }}
          />
        </div>
      </OverlayPanel>

      <DataTable
        value={artworks}
        lazy
        paginator
        first={(page - 1) * rowsPerPage}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPage={handlePageChange}
        loading={loading}
        selection={getSelectedRows()}
        onSelectionChange={handleSelectionChange}
        dataKey="id"
        selectionMode="multiple"
        pageLinkSize={5}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column selectionMode="multiple" style={{ width: '50px' }} />
        <Column field="title" header="TITLE" body={(rowData) => textBody(rowData, 'title')} />
        <Column field="place_of_origin" header="PLACE OF ORIGIN" body={(rowData) => textBody(rowData, 'place_of_origin')} />
        <Column field="artist_display" header="ARTIST" body={(rowData) => textBody(rowData, 'artist_display')} />
        <Column field="inscriptions" header="INSCRIPTIONS" body={(rowData) => textBody(rowData, 'inscriptions')} />
        <Column field="date_start" header="START DATE" body={(rowData) => textBody(rowData, 'date_start')} />
        <Column field="date_end" header="END DATE" body={(rowData) => textBody(rowData, 'date_end')} />
      </DataTable>
    </div>
  );
};

export default ArtworkTable;
