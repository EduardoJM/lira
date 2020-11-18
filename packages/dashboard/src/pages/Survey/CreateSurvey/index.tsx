import React, { useState } from 'react';

import AddSurveyItemModal from './AddSurveyItemModal';

// import {} from '@lira/survey';

import { dataTypes, DataType } from './survey';

import useStyles from './material';

const CreateSurvey: React.FC = () => {
    const [modalAddOpened, setModalAddOpened] = useState(false);

    const classes = useStyles();

    function handleCloseModalAdd() {
        setModalAddOpened(false);
    }

    function handleOpenModalAdd() {
        setModalAddOpened(true);
    }

    return (
        <>
            <button type="button" onClick={handleOpenModalAdd}>
                Open Modal
            </button>
            <AddSurveyItemModal opened={modalAddOpened} close={handleCloseModalAdd} />
        </>
    );
};

export default CreateSurvey;
