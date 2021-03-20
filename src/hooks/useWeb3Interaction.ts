import { useContext } from 'react';

import { Context } from 'providers/Web3InteractionProvider';

const useWeb3Interaction = () => {
  const {
    daiBalance,
    ethBalance,
    loadDaiBalance,
    loadEthBalance,
    loaded,
    mintChargedParticle,
    approveDai,
    didApproveEnoughDai,
    daiApproved,
  } = useContext(Context);
  return {
    daiBalance,
    ethBalance,
    loadDaiBalance,
    loadEthBalance,
    loaded,
    mintChargedParticle,
    approveDai,
    didApproveEnoughDai,
    daiApproved,
  };
};

export default useWeb3Interaction;
