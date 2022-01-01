export const getNetworkName = chainID => {
  const networks = {
    1: 'Ethereum',
    137: 'Polygon',
    43114: 'Avalanche',

    //Testnets:
    3: 'Ropsten',
    4: 'Rinkeby',
    5: 'Goerli',
    42: 'Kovan',
    80001: 'Mumbai',
  };
  return networks[chainID];
};

/**
 * Event Listeners in web3 dont natively return chainIds in integer form.
 * must check or convert them.
 *
 *  @returns Number || undefined
 */
export const checkChainIsNumber = chainId => {
  if (typeof chainId !== 'string') return chainId;

  const networksChainIds = {
    "0x1": 1, // Ethereum Mainnet
    "0xa86a": 43114, // Avalanche C Chain
  };

  return networksChainIds[chainId];
};