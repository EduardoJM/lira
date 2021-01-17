import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth';

import DashBoard from '../../../layouts/DashBoard';

import { SurveyItemsProvider } from '../../../contexts/surveyItems';
import AddSurveyItemModal from './AddSurveyItemModal';
import SurveyItemsList from './SurveyItemsList';
import Loading from '../../Base/Loading';

const CreateSurvey: React.FC = () => {
    const [modalAddOpened, setModalAddOpened] = useState(false);
    const history = useHistory();
    const { signed } = useAuth();

    useEffect(() => {
        if (signed === 'Unsigned') {
            history.push('/sign-in');
        }
    }, [signed]);

    function handleCloseModalAdd() {
        setModalAddOpened(false);
    }

    function handleOpenModalAdd() {
        setModalAddOpened(true);
    }

    return (
        <>
            {signed === 'Signed' && (
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
            )}
            {signed === 'Loading' && (
                <Loading />
            )}
        </>
    );
};

export default CreateSurvey;
