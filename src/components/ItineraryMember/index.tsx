import React, {useRef, useMemo, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  promoteMemberRequest,
  demoteMemberRequest,
  acceptMemberRequest,
  removeMemberRequest,
} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  RowGroupSpaced,
  MemberDetails,
  UserImage,
  ColumnGroup,
  Name,
  JoinDate,
  MemberActions,
  AdminButton,
  RejectButtonButton,
  AcceptButtonButton,
  UserButton,
} from './styles';

import {MemberProps, ItineraryProps} from '../../utils/types';
import ShadowBox from '../ShadowBox';
import isOpen from '../../guards/itineraryStatus';
import formatLocale from '../../providers/dayjs-format-locale';

interface ItineraryMemberProps {
  member: MemberProps;
  owner?: boolean;
  itinerary: ItineraryProps;
}

const ItineraryMember: React.FC<ItineraryMemberProps> = ({
  member,
  owner,
  itinerary,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user} = useSelector((state: RootStateProps) => state.auth);

  let createDateFormated = useRef('');
  useMemo(() => {
    createDateFormated.current = formatLocale(
      new Date(member.createdAt),
      'DD MMM YY',
    );
  }, [member.createdAt]);

  function viewProfile(userId: number) {
    if (userId === user?.id) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('UserDetails', {
        userId,
      });
    }
  }

  const renderMemberOptions = useCallback(() => {
    function handlePromoteMember(userId: number) {
      dispatch(promoteMemberRequest(member.itinerary, userId));
    }

    function handleDemoteMember(userId: number) {
      dispatch(demoteMemberRequest(member.itinerary, userId));
    }

    function handleAcceptMember(userId: number) {
      dispatch(acceptMemberRequest(member.itinerary, userId));
    }

    function handleRemoveMember(userId: number) {
      dispatch(removeMemberRequest(member.itinerary, userId));
    }

    return (
      <MemberActions>
        {!member.isAccepted && (
          <>
            <RejectButtonButton
              onPress={() => handleRemoveMember(member.user.id)}>
              <Icon name="delete-forever-outline" color="#FFF" size={24} />
            </RejectButtonButton>
            <AcceptButtonButton
              onPress={() => handleAcceptMember(member.user.id)}>
              <Icon name="check" color="#FFF" size={24} />
            </AcceptButtonButton>
          </>
        )}
        {member.isAccepted && member.isAdmin && (
          <>
            <AdminButton onPress={() => handleDemoteMember(member.user.id)}>
              <Icon name="label-off-outline" color="#FFF" size={24} />
            </AdminButton>
            <RejectButtonButton
              onPress={() => handleRemoveMember(member.user.id)}>
              <Icon name="delete-forever-outline" color="#FFF" size={24} />
            </RejectButtonButton>
          </>
        )}
        {member.isAccepted && !member.isAdmin && (
          <>
            <AdminButton onPress={() => handlePromoteMember(member.user.id)}>
              <Icon name="label-outline" color="#FFF" size={24} />
            </AdminButton>
            <RejectButtonButton
              onPress={() => handleRemoveMember(member.user.id)}>
              <Icon name="delete-forever-outline" color="#FFF" size={24} />
            </RejectButtonButton>
          </>
        )}
      </MemberActions>
    );
  }, [dispatch, member]);

  return (
    <ShadowBox>
      <RowGroupSpaced>
        <MemberDetails>
          <UserButton onPress={() => viewProfile(member.user.id)}>
            <UserImage
              source={{
                uri: member.user.profile.file?.url || undefined,
              }}
              resizeMode="cover"
            />
          </UserButton>
          <ColumnGroup>
            <Name>{member.user.username}</Name>
            <JoinDate>{createDateFormated.current}</JoinDate>
          </ColumnGroup>
        </MemberDetails>
        {owner && isOpen(itinerary.status, () => renderMemberOptions())}
      </RowGroupSpaced>
    </ShadowBox>
  );
};

export default ItineraryMember;
