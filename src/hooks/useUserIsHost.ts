import {useSelector} from 'react-redux';
import {RootStateProps} from '../store/modules/rootReducer';

export const useUserIsHost = () => {
  const {user} = useSelector((state: RootStateProps) => state.auth);

  const isHost = user?.isHost;

  const conditionalRender = (
    renderIsHost?: React.ReactNode,
    renderIsNotHost?: React.ReactNode,
  ) => {
    if (isHost) {
      return renderIsHost;
    } else {
      return renderIsNotHost;
    }
  };

  return {conditionalRender, isHost};
};
