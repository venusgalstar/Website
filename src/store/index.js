import { createStore } from 'redux'
import Web3 from 'web3';
import config from '../contract/config';
import { toast } from 'react-toastify';


const _initialState = {
    price_usd: 0,
    price_bnb: 0,
    account: "",
    all_nodes: 0,
    my_nodes: [],
    my_nfts: [],
    grand_nft_url: "",
    master_nft_url: "",
    currentTime: 0,
    contract_status: 0,
    chainId: 0,
    can_perform: true,
    fire_value: 0
}

const init = (init) => {
    return init;
}
const globalWeb3 = new Web3(config.mainNetUrl);
const gNftContract = new globalWeb3.eth.Contract(config.NFTAbi, config.FireNFT);
const gRewardContract = new globalWeb3.eth.Contract(config.RewardAbi, config.Reward);
const gTokenContract = new globalWeb3.eth.Contract(config.FireAbi, config.FireToken);

const provider = Web3.providers.HttpProvider(config.testNetUrl);
const web3 = new Web3(Web3.givenProvider || provider);

const tokenContract = new web3.eth.Contract(config.FireAbi, config.FireToken);
const nftContract = new web3.eth.Contract(config.NFTAbi, config.FireNFT);
const rewardConatract = new web3.eth.Contract(config.RewardAbi, config.Reward);

const reducer = (state = init(_initialState), action) => {

    if (action.type === 'UPDATE_TOKEN_PRICE') {
        return Object.assign({}, state, {
            price_usd: action.payload.price_usd,
            price_bnb: action.payload.price_bnb
        })
    } else if (action.type === "UPDATE_CHAIN_ID") {
        return Object.assign({}, state, {
            chainId: action.payload.chainId
        });
    } else if (action.type === 'CONNECT_WALLET') {
        checkNetwork(state.chainId);
        web3.eth.getAccounts((err, accounts) => {
            

            // setInterval(()=>{
            //     store.dispatch({
            //         type: "GET_USER_INFO",
            //         payload: { account: accounts[0] }
            //     });
            // }, 3600000);

            store.dispatch({
                type: "GET_USER_INFO",
                payload: { account: accounts[0] }
            });          
        })
    } else if (action.type === 'SET_CONTRACT_STATUS') {
        if (!state.account) {
            connectAlert();
            return state;
        }

        rewardConatract.methods.setContractStatus(action.payload.param)
            .send({ from: state.account })
            .then(() => { updateGlobalInfo() })
            .catch(() => console.log);

    } else if (action.type === "SET_NFT_URL") {

        if (!state.account) {
            connectAlert();
            return state;
        }

        if (action.payload.type === "master") {
            nftContract.methods.setMasterNFTURI(action.payload.url)
                .send({ from: state.account })
                .then(() => console.log)
                .catch(() => console.log);
        } else if (action.payload.type === "grand") {
            nftContract.methods.setGrandNFTURI(action.payload.url)
                .send({ from: state.account })
                .then(() => console.log)
                .catch(() => console.log);
        }
    } else if (action.type === "CLAIM_NODE") {
        if (!state.account) {
            connectAlert();
            return Object.assign({}, state, { can_perform: true });
        }
        rewardConatract.methods.getClaimFee().call()
            .then(function (claimFee) {
                if (action.payload.node_id !== -1) {
                    rewardConatract.methods.claimByNode(action.payload.node_id)
                        .send({ from: state.account, value: claimFee, gas: 400000 })
                        .then(() => {
                            store.dispatch({ type: "GET_USER_INFO", payload: { can_perform: true } });
                        }).catch(() => {
                            store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                        });
                } else if (action.payload.node_id === -1) {
                    rewardConatract.methods.claimAll()
                        .send({ from: state.account, value: claimFee * action.payload.cnt, gas: 1500000})
                        .then(() => {
                            store.dispatch({ type: "GET_USER_INFO", payload: { can_perform: true } });
                        }).catch(() => {
                            store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                        });
                }
            })
            .catch(() => {
                store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
            });

    } else if (action.type === "BUY_NFT_ART") {
        if (!state.account) {
            connectAlert();
            return Object.assign({}, state, { can_perform: true });
        }
        if (action.payload.type === "master") {
            rewardConatract.methods.getMasterNFTPrice().call()
                .then((price) => {
                    rewardConatract.methods.buyNFT(0, 1)
                        .send({ from: state.account, value: price, gas: 400000 })
                        .then(() => {
                            store.dispatch({ type: "GET_USER_INFO", payload: { can_perform: true } });
                        }).catch(() => {
                            store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                        })
                }).catch(() => {
                    store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                })
        } else if (action.payload.type === "grand") {
            rewardConatract.methods.getGrandNFTPrice().call()
                .then((price) => {
                    rewardConatract.methods.buyNFT(1, 1)
                        .send({ from: state.account, value: price, gas: 400000 })
                        .then(() => {
                            store.dispatch({ type: "GET_USER_INFO", payload: { can_perform: true } });
                        }).catch(() => {
                            store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                        })
                }).catch(() => {
                    store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                })
        }

    } else if (action.type === "PAY_NODE_FEE") {
        rewardConatract.methods.getNodeMaintenanceFee().call()
            .then((threeFee) => {
                rewardConatract.methods.payNodeFee(Number(action.payload.node_id), action.payload.duration - 1)
                    .send({ from: state.account, value: action.payload.duration * threeFee, gas: 2100000 })
                    .then(() => {
                        store.dispatch({ type: "GET_USER_INFO", payload: { can_perform: true } });
                    }).catch(() => {
                        store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                    })
            }).catch(() => {
                store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
            })
    } else if (action.type === "CREATE_NODE") {
        if (!state.account) {
            connectAlert();
            return Object.assign({}, state, { can_perform: true });
        }
        const promise = [];
        promise.push(rewardConatract.methods.getNodePrice().call());
        promise.push(rewardConatract.methods.getNodeMaintenanceFee().call());
        Promise.all(promise).then((result) => {

            tokenContract.methods.approve(config.Reward, result[0]).send({ from: state.account, gas: 210000 })
                .then((ret) => {
                    rewardConatract.methods.buyNode(1).send({ from: state.account, value: result[1], gas: 2100000 })
                        .then(() => {
                            store.dispatch({ type: "GET_USER_INFO", payload: { can_perform: true } });
                        }).catch(() => {
                            store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                        });
                }).catch((ret) => {
                    store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                });
        }).catch(() => {
            store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
        });

    } else if (action.type === "GET_USER_INFO") {

        let account = (action.payload !== undefined && action.payload.account !== undefined) ? action.payload.account : state.account;
        let can_perform = (action.payload !== undefined && action.payload.can_perform !== undefined) ? action.payload.can_perform : state.can_perform;

        console.log(account);        

        let promise = [];
        promise.push(rewardConatract.methods.getNFTList(account).call());
        promise.push(rewardConatract.methods.getNodeList(account).call());
        promise.push(rewardConatract.methods.getRewardAmount(account).call());
        promise.push(nftContract.methods.getMasterNFTURI().call());
        promise.push(nftContract.methods.getGrandNFTURI().call());
        promise.push(rewardConatract.methods.getTotalNodeCount().call());
        promise.push(rewardConatract.methods.getFireValue().call());
        Promise.all(promise).then((result) => {
            var nodes = [];
            for (var index in result[1]) {
                nodes.push({
                    idx: index,
                    createTime: result[1][index].createTime,
                    lastTime: result[1][index].lastTime,
                    grandNFT: result[2].curGrandNFTEnable[index],
                    masterNFT: result[2].curMasterNFTEnable[index],
                    reward: Number(web3.utils.fromWei(result[2].nodeRewards[index])).toFixed(9),
                    master_nft_value: web3.utils.fromWei(result[6], 'ether') * 10,
                    grand_nft_value: web3.utils.fromWei(result[6], 'ether') * 100,
                });
            }
            nodes.sort((a,b)=> a.lastTime-b.lastTime);
            //console.log(nodes);
            store.dispatch({
                type: "RETURN_DATA", payload:
                {
                    my_nfts: result[0],
                    my_nodes: nodes,
                    account: account,
                    reward: result[2],
                    master_nft_url: result[3],
                    grand_nft_url: result[4],
                    currentTime: result[2].currentTime * 1,
                    all_nodes: result[5],
                    can_perform: can_perform,
                    last_claim_time: result[2].lastClaimTime
                }
            });
        });
    } else if (action.type === "CHANGE_REWARD_OWNER") {
    } else if (action.type === 'PAY_FEE_ALL') {
        if (!state.account) {
            connectAlert();
            return Object.assign({}, state, { can_perform: true });
        }

        rewardConatract.methods.getNodeMaintenanceFee().call()
            .then((threeFee) => {
                rewardConatract.methods.payAllNodeFee(action.payload.duration - 1)
                    .send({ from: state.account, value: action.payload.duration * threeFee * action.payload.count, gas: 2100000 })
                    .then(() => {
                        store.dispatch({ type: "GET_USER_INFO", payload: { can_perform: true } });
                    }).catch(() => {
                        store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
                    });
            }).catch((err) => {
                store.dispatch({ type: "UPDATE_CAN_PERFORM_STATUS", payload: { can_perform: true } });
            })
    } else if (action.type === "SET_PRICE_VALUE") {
        if (!state.account) {
            connectAlert();
            return Object.assign({}, state, { can_perform: true });
        }
        if (action.payload.type === "claim_fee") {
            rewardConatract.methods.setClaimFee(web3.utils.toWei(action.payload.value, 'ether'))
                .send({ from: state.account, gas: 210000 })
                .then(() => {
                }).catch(() => {
                })
        } else if (action.payload.type === "maintenance_fee") {
            rewardConatract.methods.setNodeMaintenanceFee(web3.utils.toWei(action.payload.value, 'ether'))
                .send({ from: state.account, gas: 210000 })
                .then(() => {
                }).catch(() => {
                })
        } else if (action.payload.type === "nest_price") {
            rewardConatract.methods.setNodePrice(web3.utils.toWei(action.payload.value, 'ether'))
                .send({ from: state.account, gas: 210000 })
                .then(() => {
                }).catch(() => {
                })
        } else if (action.payload.type === "fire_price") {
            rewardConatract.methods.setFireValue(web3.utils.toWei(action.payload.value, 'ether'))
                .send({ from: state.account, gas: 210000 })
                .then(() => {
                }).catch(() => {
                })
        }
        let promise = [];
        promise.push(gRewardContract.methods.getClaimFee().call());
        promise.push(gRewardContract.methods.getNodeMaintenanceFee().call());
        promise.push(gRewardContract.methods.getNodePrice().call());
        promise.push(gRewardContract.methods.getFireValue().call());
        Promise.all(promise).then((result) => {
            store.dispatch({
                type: "RETURN_DATA",
                payload: {
                    claim_fee: web3.utils.fromWei(result[0], 'ether'),
                    maintenance_fee: web3.utils.fromWei(result[1], 'ether'),
                    nest_price: web3.utils.fromWei(result[2], 'ether'),
                    fire_price: web3.utils.fromWei(result[3], 'ether')
                }
            });
        })
    } else if (action.type === "RETURN_DATA") {
        return Object.assign({}, state, action.payload);
    } else if (action.type === "UPDATE_CAN_PERFORM_STATUS") {
        return Object.assign({}, state, {
            can_perform: action.payload.can_perform
        });
    } else if (action.type === "GET_ADMIN_PRICE") {
        let promise = [];
        promise.push(gRewardContract.methods.getClaimFee().call());
        promise.push(gRewardContract.methods.getNodeMaintenanceFee().call());
        promise.push(gRewardContract.methods.getNodePrice().call());
        promise.push(gRewardContract.methods.getFireValue().call());
        Promise.all(promise).then((result) => {
            store.dispatch({
                type: "RETURN_DATA",
                payload: {
                    claim_fee: web3.utils.fromWei(result[0], 'ether'),
                    maintenance_fee: web3.utils.fromWei(result[1], 'ether'),
                    nest_price: web3.utils.fromWei(result[2], 'ether'),
                    fire_price: web3.utils.fromWei(result[3], 'ether')
                }
            });
        })
    } else if (action.type === "GET_FIRE_VALUE") {
        gRewardContract.methods.getAvaxForFire(web3.utils.toWei("1", 'ether')).call().then((value)=>{
            let fireAvax = web3.utils.fromWei(value);
            gRewardContract.methods.getAvaxForUSD(1000000).call().then((value)=>{
                return store.dispatch({type:"RETURN_DATA", payload:{fire_value: Number(fireAvax/web3.utils.fromWei(value))}});
            });
            //return store.dispatch({type:"RETURN_DATA", payload:{fire_value: web3.utils.fromWei(value)}});
        });
    }
    return state;
}

const connectAlert = () => {
    toast.info("Please connect your wallet!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const checkNetwork = (chainId) => {
    if (web3.utils.toHex(chainId) !== web3.utils.toHex(config.chainId)) {
        toast.info("Change network to Avalanche C Chain!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}


const updateGlobalInfo = () => {
    let promise = [];
    promise.push(gNftContract.methods.getMasterNFTURI().call());
    promise.push(gNftContract.methods.getGrandNFTURI().call());
    promise.push(gRewardContract.methods.getTotalNodeCount().call());
    promise.push(gRewardContract.methods.getContractStatus().call());
    promise.push(gRewardContract.methods.getAvaxForFire(web3.utils.toWei("1", 'ether')).call());
    promise.push(gRewardContract.methods.getAvaxForUSD(1000000).call());
    promise.push(globalWeb3.eth.getBalance("0x52Fd04AA057ba8Ca4bCc675B55De7366F607A677"));
    promise.push(gRewardContract.methods.getFireValue().call());



    //promise.push(gTokenContract.methods.balanceOf(config.treasuryAddr).call());
    Promise.all(promise).then((result) => {
        store.dispatch({
            type: "RETURN_DATA",
            payload: {
                master_nft_value: web3.utils.fromWei(result[7], 'ether') * 10,
                grand_nft_value: web3.utils.fromWei(result[7], 'ether') * 100,
                master_nft_url: result[0],
                grand_nft_url: result[1],
                all_nodes: result[2],
                contract_status: result[3],
                treasury_balance: Number(web3.utils.fromWei(result[6], 'ether') / web3.utils.fromWei(result[5], 'ether')).toFixed(2)
            }
        });
    })
}


const ErrorMsg = (error) => {
    // if (error.message) {
    //     toast.error(JSON.stringify(error.message), {
    //         position: "top-center",
    //         // autoClose: 3000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // } else {
    //     toast.error("Transaction Failed!", {
    //         position: "top-center",
    //         autoClose: 3000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // }
}

const AlertMsg = (content) => {
    toast.error(content, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}





if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
        store.dispatch({
            type: "GET_USER_INFO",
            payload: { account: accounts[0] }
        });
    })
    window.ethereum.on('chainChanged', function (chainId) {
        checkNetwork(chainId);
        store.dispatch({
            type: "UPDATE_CHAIN_ID",
            payload: { chainId: chainId }
        });
    });
    web3.eth.getChainId().then((chainId) => {
        checkNetwork(chainId);
        store.dispatch({
            type: "UPDATE_CHAIN_ID",
            payload: { chainId: chainId }
        });
    })
}


    updateGlobalInfo();




const store = createStore(reducer);
export default store