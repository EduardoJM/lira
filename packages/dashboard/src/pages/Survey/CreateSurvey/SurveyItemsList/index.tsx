import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { DataGrid, RowsProp, ColDef } from '@material-ui/data-grid';

import { useSurveyItems } from '../../../../contexts/surveyItems';

const SurveyItemsList: React.FC = () => {
    const { items } = useSurveyItems();
    const [data, setData] = useState<RowsProp>([]);

    useEffect(() => {
        // eslint-disable-next-line arrow-body-style
        setData(items.map((item, index) => {
            return {
                id: index,
                col1: item.text,
                col2: item.data.toString(),
            };
        }));
    }, [items]);

    const columns: ColDef[] = [
        { field: 'col1', flex: 1, headerName: 'Pergunta', width: 150 },
        { field: 'col2', headerName: 'Tipo', width: 150 },
    ];

    return (
        <div>
            {items.length === 0 ? (
                <>
                    <Typography>Sua pesquisa ainda não possui perguntas...</Typography>
                </>
            ) : (
                <div style={{ height: 300 }}>
                    <DataGrid rows={data} columns={columns} />
                </div>
            )}
        </div>
    );
};

export default SurveyItemsList;
