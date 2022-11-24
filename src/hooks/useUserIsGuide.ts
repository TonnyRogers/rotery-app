import {useSelector} from 'react-redux';
import {RootStateProps} from '../store/modules/rootReducer';

export const useUserIsGuide = () => {
  const {user} = useSelector((state: RootStateProps) => state.auth);

  const isGuide = user?.isGuide;

  const conditionalRender = (
    renderisGuide?: React.ReactNode,
    renderIsNotHost?: React.ReactNode,
  ) => {
    if (isGuide) {
      return renderisGuide;
    } else {
      return renderIsNotHost;
    }
  };

  return {conditionalRender, isGuide};
};
