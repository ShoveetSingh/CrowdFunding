import React,{useContext,createContext} from "react";
import {useAddress,useContract,useMetamask,useContractWrite} from '@thirdweb-dev/react';
import { id } from "ethers/lib/utils";
import { ethers } from "ethers";
//import {Mumbai} from 'Polygon';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const address = useAddress();
    const connect = useMetamask();
    const {contract} = useContract('0xf01e5008F4f3095Eaa9A737E867523AF4a314d57');

    const {mutateAsync: createCampaign} = useContractWrite(contract,'createCampaign');

    const publishCampaign = async (form) => {
        try{
        const data = await createCampaign({args:[
            address,
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
        ]});
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign,id) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: id,
                }))
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
        return filteredCampaigns;
    }

    const donate = async (pId,amount) => {
        const data = await contract.call('donateToCampaign',pId,{value:ethers.utils.parseEther(amount)});
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators',[pId]);
        const numberOfDonations = donations[0].length;
        const parsedDonations = [];
        for(let i=0;i<numberOfDonations;i++){
         parsedDonations.push({
            donator: donations[0][i],
            donation:ethers.utils.formatEther(donations[1][i].toString())
         })
        }
        return parsedDonations;
    }

    return(
        <StateContext.Provider value={{address,connect,contract,createCampaign: publishCampaign,getCampaigns,getUserCampaigns,donate,getDonations,}}>
            {children}
        </StateContext.Provider>
    );

}
export const  useStateContext = () => useContext(StateContext);
  