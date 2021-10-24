import {ItineraryStatusConst} from '../utils/constants';

const isOpen = (status: string, next: () => any) => {
  if ([ItineraryStatusConst.ACTIVE].includes(status)) {
    return next();
  }
};

export default isOpen;
