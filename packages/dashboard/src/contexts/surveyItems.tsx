import React, { createContext, useContext, useState } from 'react';

import { SurveyItem } from '@lira/survey';

export interface SurveyItemsContextData {
    items: SurveyItem<any>[];
    setItems: (items: SurveyItem<any>[]) => void;
}
const SurveyItemsContext = createContext<SurveyItemsContextData>({} as SurveyItemsContextData);

export const SurveyItemsProvider: React.FC = (props) => {
    const { children } = props;
    const [items, setItems] = useState<SurveyItem<any>[]>([]);

    return (
        <SurveyItemsContext.Provider value={{
            items,
            setItems,
        }}
        >
            { children }
        </SurveyItemsContext.Provider>
    );
};

export default SurveyItemsContext;

export function useSurveyItems() {
    const context = useContext(SurveyItemsContext);
    return context;
}
