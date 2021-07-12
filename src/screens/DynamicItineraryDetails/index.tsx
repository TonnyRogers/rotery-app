import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {RootStateProps} from '../../store/modules/rootReducer';

import FeedDetail from './feed';
import MyItineraryDetail from './my';
import NextItineraryDetail from './next';
import {View} from 'react-native';
import {getDetailsRequest} from '../../store/modules/dynamicItinerary/actions';
import Page from '../../components/Page';
import {MemberProps} from '../../utils/types';

interface DynamicItineraryDetaisProps {
  route: {
    params: {id: number};
  };
  navigation: any;
}

const DynamicItineraryDetais: React.FC<DynamicItineraryDetaisProps> = ({
  route,
  // navigation,
}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {itinerary} = useSelector(
    (state: RootStateProps) => state.dynamicItinerary,
  );

  useEffect(() => {
    dispatch(getDetailsRequest(id));
  }, [id, dispatch]);

  const isMember = itinerary?.members.find(
    (member: MemberProps) =>
      member.id === user.id && member.pivot.accepted === true,
  );

  const isOwner =
    itinerary?.id && itinerary.owner.id === user.id ? true : false;

  if (itinerary?.id) {
    return (
      <Page>
        {isMember && <NextItineraryDetail itinerary={itinerary} />}
        {isOwner && <MyItineraryDetail itinerary={itinerary} />}
        {!isMember && !isOwner && <FeedDetail itinerary={itinerary} />}
      </Page>
    );
  }

  return <View />;
};

export default DynamicItineraryDetais;
