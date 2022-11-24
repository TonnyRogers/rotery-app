import React, {useEffect, useCallback, useState, useContext} from 'react';

import * as RootNavigation from '../../RootNavigation';

import Page from '../../components/Page';
import {ItineraryProps} from '../../utils/types';
import api from '../../providers/api';
import DynamicFeedItineraryDetails from './feed';
import Empty from '../../components/Empty';
import {LoadingContext} from '../../context/loading/context';

interface DynamicItineraryDetaisProps {
  route: {
    params: {id: number};
  };
}

const DynamicItineraryDetais: React.FC<DynamicItineraryDetaisProps> = ({
  route,
}) => {
  const {id} = route.params;
  const {setLoading} = useContext(LoadingContext);
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryProps>();
  const getItinerary = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get<ItineraryProps>(
        `/itineraries/${id}/details`,
      );

      setLoading(false);
      setCurrentItinerary(response.data);
    } catch (error) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    getItinerary();
  }, [getItinerary]);

  return (
    <Page showHeader={false}>
      {currentItinerary ? (
        <DynamicFeedItineraryDetails itinerary={currentItinerary} />
      ) : (
        <Empty onPressTo={() => RootNavigation.goBack()} buttonText="Voltar" />
      )}
    </Page>
  );
};

export default DynamicItineraryDetais;
