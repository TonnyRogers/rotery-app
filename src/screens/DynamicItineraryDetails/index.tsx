import React, {useEffect, useCallback, useState} from 'react';

import * as RootNavigation from '../../RootNavigation';

import Page from '../../components/Page';
import {ItineraryProps} from '../../utils/types';
import api from '../../services/api';
import SplashScreen from '../../components/SplashScreen';
import DynamicFeedItineraryDetails from './feed';
import Empty from '../../components/Empty';

interface DynamicItineraryDetaisProps {
  route: {
    params: {id: number};
  };
}

const DynamicItineraryDetais: React.FC<DynamicItineraryDetaisProps> = ({
  route,
}) => {
  const {id} = route.params;

  const [currentItinerary, setCurrentItinerary] = useState<ItineraryProps>();
  const [isOnLoading, setIsOnLoading] = useState<boolean>(false);
  const getItinerary = useCallback(async () => {
    try {
      setIsOnLoading(true);
      const response = await api.get<ItineraryProps>(
        `/itineraries/${id}/details`,
      );

      setIsOnLoading(false);
      setCurrentItinerary(response.data);
    } catch (error) {
      setIsOnLoading(false);
    }
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
      <SplashScreen visible={isOnLoading} />
    </Page>
  );
};

export default DynamicItineraryDetais;
