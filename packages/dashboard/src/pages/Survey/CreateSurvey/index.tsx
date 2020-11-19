import React, { useState } from 'react';

import AddSurveyItemModal from './AddSurveyItemModal';

const CreateSurvey: React.FC = () => {
    const [modalAddOpened, setModalAddOpened] = useState(false);

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
