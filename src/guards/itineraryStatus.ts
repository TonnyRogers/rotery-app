import {ItineraryStatusEnum} from '../utils/types';

const isOpen = (status: number, next: () => any) => {
  if ([ItineraryStatusEnum.OPENED].includes(status)) {
    return next();
  }
};

export default isOpen;
