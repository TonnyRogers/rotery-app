/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import Page from '../../components/Page';
import {PageContainer} from '../../components/PageContainer';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import {View} from 'react-native';
import {FeedList} from '../../components/FeedList';
import {LocationItem} from '../../components/LocationItem';
import FilterInput from '../../components/FilterInput';
import {LocationType} from '../../utils/enums';
import {useDispatch, useSelector} from 'react-redux';
import {getLocationFeedRequest} from '../../store/modules/locations/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {
  Location,
  LocationFeedFilterResponse,
  LocationPickerInputSetItem,
  TomTomApiResponse,
} from '../../utils/types';
import {useVibration} from '../../hooks/useVibration';
import LocationPickerInput from '../../components/LocationPickerInput';
import PickerInput from '../../components/PickerInput';
import {Activity, ActivityList} from './styles';
import CustomIcon from '../../components/CustomIcon';

interface PageFilters {
  region?: string;
  activity?: number;
  type?: LocationType;
  state?: string;
  city?: string;
}

export interface LocationFeedFilterParams
  extends Pick<PageFilters, 'region' | 'activity'> {}

export interface LocationFeedProps {
  route: {
    params: LocationFeedFilterParams;
  };
}

export function LocationFeed({route}: LocationFeedProps) {
  const {
    params: {activity, region},
  } = route;

  const {alternated} = useVibration();
  const dispatch = useDispatch();

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState('');
  const [locationActivity, setLocationActivity] = useState<number | undefined>(
    undefined,
  );
  const [pickerTypeVisibility, setPickerTypeVisibility] = useState(false);
  const [locationIsOpen, setLocationIsOpen] = useState(false);
  const [feedFiltersOptions, setFeedFiltersOptions] =
    useState<LocationFeedFilterResponse | null>(null);
  const locationJson = useRef<LocationPickerInputSetItem<TomTomApiResponse>>();
  const page = useRef(1);
  const pageFilter = useRef<PageFilters>({});

  const {locations, loading} = useSelector(
    (state: RootStateProps) => state.locations,
  );

  const handleSetLocation = (value: any) => {
    locationJson.current = value;
  };

  async function getFeedFilters(params?: LocationFeedFilterParams) {
    const response = await api.get<LocationFeedFilterResponse>(
      '/filters/location-feed',
      {params},
    );

    if (response.data) {
      setFeedFiltersOptions(response.data);
    }
  }

  const clearFeed = () => {
    console.tron.log('clearFeed');
    alternated();
    clearFilters();
    handleGetFeedWithFilters();
    getFeedFilters();
  };

  const nextPageFeed = () => {
    console.tron.log('loadFeed');
    if (locations && locations.length > 4) {
      handleGetPaginatedFeedWithFilters();
    }
  };

  function clearFilters() {
    setLocation('');
    setLocationType('');
    setLocationActivity(undefined);
    locationJson.current = undefined;
    pageFilter.current = {};
  }

  function handleGetPaginatedFeedWithFilters() {
    page.current = page.current + 1;
    dispatch(
      getLocationFeedRequest({
        page: page.current,
        limit: 10,
        ...pageFilter.current,
      }),
    );
  }

  function handleGetFeedWithFilters() {
    page.current = 1;
    dispatch(
      getLocationFeedRequest({
        page: page.current,
        limit: 10,
        ...pageFilter.current,
      }),
    );
  }

  useEffect(() => {
    console.tron.log('useEffect');
    handleGetFeedWithFilters();
    getFeedFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <PageContainer isScrollable={false}>
        <View style={{height: 40, width: '100%', marginBottom: 12}}>
          <RowGroup isFlex justify="space-between" align="center">
            <Text textColor="primaryText" textWeight="bold">
              Busca por: {activity ?? region}
            </Text>
            <Button
              onPress={() => setIsFilterVisible(true)}
              onLongPress={clearFeed}
              customContent
              sizeHeight={5.2}
              sizeWidth={5.2}
              sizeBorderRadius={26}
              bgColor="white">
              <Icon name="filter" size={24} color="#3dc77b" />
            </Button>
          </RowGroup>
        </View>
        <FeedList<Location>
          items={locations}
          onEndReached={nextPageFeed}
          onRefresh={handleGetFeedWithFilters}
          emptySubtitle="tente mudar sua pesquisa"
          emptyTitle="Sem locais"
          loading={loading}
          itemRender={(item) => <LocationItem location={item} />}
        />
      </PageContainer>
      <FilterInput
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
        onFilter={() => {
          pageFilter.current = {
            activity: locationActivity ?? undefined,
            city: locationJson.current?.value.address.municipality ?? undefined,
            state:
              locationJson.current?.value.address.countrySubdivision ??
              undefined,
            region,
            type:
              Object.values(LocationType).find(
                (detailingSrt) => detailingSrt === locationType,
              ) ?? undefined,
          };
          handleGetFeedWithFilters();
        }}
        onClear={clearFilters}>
        <>
          <LocationPickerInput.Button
            title="Localidade"
            onPress={() => setLocationIsOpen(true)}
            value={location}
            error={undefined}
          />
          <Text.Paragraph>Atividades</Text.Paragraph>
          <ActivityList>
            {feedFiltersOptions?.activities &&
              feedFiltersOptions.activities.map((item, index) => (
                <Activity
                  selected={item.id === locationActivity}
                  key={index}
                  onPress={() => setLocationActivity(item.id)}>
                  <CustomIcon name={item.icon} size={24} color="#FFF" />
                  <Text.Small textColor="white">{item.name}</Text.Small>
                </Activity>
              ))}
          </ActivityList>
          <PickerInput
            options={
              feedFiltersOptions?.locationTypes
                ? feedFiltersOptions.locationTypes.map((typeItem) => ({
                    value: typeItem.id,
                    name: typeItem.name,
                    id: typeItem.id,
                  }))
                : []
            }
            label="Tipo"
            open={pickerTypeVisibility}
            setOpen={setPickerTypeVisibility}
            value={locationType}
            onChange={(value) => setLocationType(value)}
          />
        </>
      </FilterInput>
      <LocationPickerInput
        nameFormatType="city"
        visible={locationIsOpen}
        placeholder="Digite a cidade para buscar"
        searchType="Geo"
        onSelectItem={(value: string) => setLocation(value)}
        onCloseRequest={() => setLocationIsOpen(false)}
        setLocationJson={(json) => handleSetLocation(json)}
      />
    </Page>
  );
}
