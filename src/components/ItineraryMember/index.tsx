import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import {
  promoteMemberRequest,
  demoteMemberRequest,
  acceptMemberRequest,
  removeMemberRequest,
} from '../../store/modules/itineraries/actions';

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
} from './styles';

import {MemberProps} from '../../store/modules/itineraries/reducer';

interface ItineraryMemberProps {
  member: MemberProps;
}

const ItineraryMember: React.FC<ItineraryMemberProps> = ({member}) => {
  const dispatch = useDispatch();

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

  return (
    <Container>
      <RowGroupSpaced>
        <MemberDetails>
          <UserImage
            source={{
              uri: member.person.file?.url || '..',
            }}
            resizeMode="cover"
          />
          <ColumnGroup>
            <Name>{member.username}</Name>
            <JoinDate>{member.pivot.created_at}</JoinDate>
          </ColumnGroup>
        </MemberDetails>
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
      </RowGroupSpaced>
    </Container>
  );
};

export default ItineraryMember;
