import React, {useRef, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';

import {
  promoteMemberRequest,
  demoteMemberRequest,
  acceptMemberRequest,
  removeMemberRequest,
} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
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

import {MemberProps} from '../../store/modules/itineraries/reducer';

interface ItineraryMemberProps {
  member: MemberProps;
  owner?: boolean;
}

const ItineraryMember: React.FC<ItineraryMemberProps> = ({member, owner}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {user} = useSelector((state: RootStateProps) => state.auth);

  let createDateFormated = useRef('');
  useMemo(() => {
    createDateFormated.current = format(
      parse(member.pivot.created_at, 'yyyy-MM-dd HH:mm:ss', new Date()),
      ' dd MMM yyyy',
      {
        locale: pt,
      },
    );
  }, [member.pivot.created_at]);

  function handlePromoteMember(memberId: number) {
    dispatch(promoteMemberRequest(member.pivot.itinerary_id, memberId));
  }

  function handleDemoteMember(memberId: number) {
    dispatch(demoteMemberRequest(member.pivot.itinerary_id, memberId));
  }

  function handleAcceptMember(memberId: number) {
    dispatch(acceptMemberRequest(member.pivot.itinerary_id, memberId));
  }

  function handleRemoveMember(memberId: number) {
    dispatch(removeMemberRequest(member.pivot.itinerary_id, memberId));
  }

  function viewProfile(userId: number) {
    if (userId === user.id) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('UserDetails', {
        userId,
      });
    }
  }

  return (
    <Container>
      <RowGroupSpaced>
        <MemberDetails>
          <UserButton onPress={() => viewProfile(member.id)}>
            <UserImage
              source={{
                uri: member.person.file?.url,
              }}
              resizeMode="cover"
            />
          </UserButton>
          <ColumnGroup>
            <Name>{member.username}</Name>
            <JoinDate>{createDateFormated.current}</JoinDate>
          </ColumnGroup>
        </MemberDetails>
        {owner && (
          <MemberActions>
            {member.pivot.is_admin ? (
              <AdminButton onPress={() => handleDemoteMember(member.id)}>
                <Icon name="label-off-outline" color="#FFF" size={24} />
              </AdminButton>
            ) : (
              <AdminButton onPress={() => handlePromoteMember(member.id)}>
                <Icon name="label-outline" color="#FFF" size={24} />
              </AdminButton>
            )}

            {member.pivot.accepted ? (
              <RejectButtonButton onPress={() => handleRemoveMember(member.id)}>
                <Icon name="delete-forever-outline" color="#FFF" size={24} />
              </RejectButtonButton>
            ) : (
              <AcceptButtonButton onPress={() => handleAcceptMember(member.id)}>
                <Icon name="check" color="#FFF" size={24} />
              </AcceptButtonButton>
            )}
          </MemberActions>
        )}
      </RowGroupSpaced>
    </Container>
  );
};

export default ItineraryMember;
