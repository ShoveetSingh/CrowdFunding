import React,{useContext,createContext} from "react";
import {useAddress,useContract,useMetamask,useContractWrite} from '@thirdweb-dev/react';
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

    return(
        <StateContext.Provider value={{address,connect,contract,createCampaign: publishCampaign,}}>
            {children}
        </StateContext.Provider>
    );

}
export const  useStateContext = () => useContext(StateContext);
