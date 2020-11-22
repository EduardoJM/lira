import React, { useState } from 'react';

import DashBoard from '../../../layouts/DashBoard';

import { SurveyItemsProvider } from '../../../contexts/surveyItems';
import AddSurveyItemModal from './AddSurveyItemModal';
import SurveyItemsList from './SurveyItemsList';

const CreateSurvey: React.FC = () => {
    const [modalAddOpened, setModalAddOpened] = useState(false);

    function handleCloseModalAdd() {
        setModalAddOpened(false);
    }

    function handleOpenModalAdd() {
        setModalAddOpened(true);
    }

    return (
        <DashBoard
            title="Criar Pesquisa"
        >
            <>
                oie?
                <button type="button" onClick={handleOpenModalAdd}>
                    Open Modal
                </button>
                <SurveyItemsProvider>
                    <SurveyItemsList />
                    <AddSurveyItemModal opened={modalAddOpened} close={handleCloseModalAdd} />
                </SurveyItemsProvider>
            </>
        </DashBoard>
    );
};

export default CreateSurvey;
