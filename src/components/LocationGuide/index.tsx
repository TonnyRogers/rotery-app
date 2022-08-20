/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {View} from 'react-native';

import * as RootNavigation from '../../RootNavigation';

import {RootStateProps} from '../../store/modules/rootReducer';
import {UserProps, Location} from '../../utils/types';
import ShadowBox from '../ShadowBox';
import formatLocale from '../../providers/dayjs-format-locale';
import Text from '../Text';
import RowGroup from '../RowGroup';
import Button from '../Button';
import StarRate from '../StarRate';

import {MemberDetails, UserImage, UserButton} from './styles';
import {ChatRouteParams} from '../../screens/Chat';
import {useUserIsHost} from '../../hooks/useUserIsHost';
interface LocationGuideProps {
  guide: UserProps;
  location: Location;
}

export function LocationGuide({guide, location}: LocationGuideProps) {
  // const dispatch = useDispatch();
  const createAtDateFormated = useRef('');
  const {isHost} = useUserIsHost();

  useMemo(() => {
    createAtDateFormated.current = formatLocale(
      new Date(guide.createdAt),
      'DD MMM YY',
    );
  }, [guide.createdAt]);

  const {user} = useSelector((state: RootStateProps) => state.auth);

  function viewProfile(userId: number) {
    if (userId === user?.id) {
      RootNavigation.navigate('Profile');
    } else {
      RootNavigation.navigate('UserDetails', {
        userId,
      });
    }
  }

  function toGuideChat() {
    RootNavigation.navigate<ChatRouteParams>('Chat', {
      target: guide,
      location: {
        id: location.id,
        name: location.name,
        state: location.locationJson?.state || '',
      },
    });
  }

  return (
    <ShadowBox>
      <RowGroup align="center">
        <MemberDetails>
          <UserButton onPress={() => viewProfile(guide.id)}>
            <UserImage
              source={{
                uri: guide.profile.file?.url || undefined,
              }}
              resizeMode="cover"
            />
          </UserButton>
          <View>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              {guide.username}
            </Text.Paragraph>
            <Text textColor="secondaryText" textWeight="light">
              ativ{guide.profile.gender === 'male' ? 'o' : 'a'} desde{' '}
              {createAtDateFormated.current}
            </Text>
          </View>
        </MemberDetails>
        {!isHost && (
          <Button
            onPress={toGuideChat}
            customContent
            sizeWidth={3}
            sizeHeight={3}
            sizeBorderRadius={4}
            sizePadding={0}
            bgColor="blue">
            <Icon name="send-outline" color="#FFF" size={24} />
          </Button>
        )}
      </RowGroup>
      <View style={{alignItems: 'flex-start'}}>
        <StarRate rate={guide.ratingAvg || 0} />
      </View>
    </ShadowBox>
  );
}
