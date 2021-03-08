export interface ProfileProps {
  id: number;
  name: string | null;
  gender: string | null;
  birth: string | null;
  cpf: number | null;
  profission: string | null;
  phone: number | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  file_id?: number | null;
  file?: {
    url?: string;
  };
}

export interface UserProps {
  id: number;
  email: string;
  username: string;
  person: ProfileProps;
  created_at: string;
}

export interface OwnerProps extends UserProps {}

export interface QuestionProps {
  id: number;
  question: string;
  anwser: string | null;
  itinerary_id: number;
  created_at: string;
  updated_at: string;
  owner: {
    username: string;
    person: {
      file?: {
        url?: string;
      };
    };
  };
}

export interface MemberProps {
  id: number;
  username: string;
  email: string;
  person: {
    file?: {
      url?: string;
    };
  };
  pivot: {
    itinerary_id: number;
    is_admin: boolean;
    accepted: boolean;
    created_at: string;
  };
}

export interface ItemProps {
  id: number;
  name: string;
  pivot: {
    capacity: number;
    price: number;
    description: string;
  };
}

export interface StatusProps {
  id: number;
  slug: string;
  name: string;
}

export interface ItineraryProps {
  id: number;
  owner_id: number;
  name: string;
  description: string;
  begin: string;
  end: string;
  deadline_for_join: string;
  capacity: number;
  location: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
  activities: ItemProps[];
  lodgings: ItemProps[];
  transports: ItemProps[];
  photos: [];
  questions: QuestionProps[];
  members: MemberProps[];
  status: StatusProps;
  owner: OwnerProps;
}

export interface TransportProps {
  id: number;
  name?: string;
  price?: number;
  capacity?: number;
  description?: string;
  pivot?: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export interface LodgingProps {
  id: number;
  name?: string;
  price?: number;
  capacity?: number;
  description?: string;
  pivot?: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export interface ActivityProps {
  id: number;
  name?: string;
  price?: number;
  capacity?: number;
  description?: string;
  pivot?: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

export interface BottomSheetData {
  componentype: string;
  type: string;
  id: number;
}

export interface ConnectionsProps {
  id: number;
  owner_id: number;
  user_id: number;
  blocked: boolean;
  owner: UserProps;
  target: UserProps;
}

export interface InvitesProps {
  id: number;
  owner_id: number;
  user_id: number;
  blocked: boolean;
  owner: UserProps;
  target: UserProps;
}

export interface MessageProps {
  id: number;
  sender_id: number;
  message: string;
  readed: boolean;
  created_at: string;
  unreaded: number;
  type: string;
  json_data?: ItineraryProps;
  sender: {
    username: string;
    person: {
      file: {
        url: string;
      };
    };
  };
}
