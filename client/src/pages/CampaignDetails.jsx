import React,{useState,useEffect} from 'react'  
import {useLocation} from 'react-router-dom';
import {useStateContext} from '../context';
import {ethers} from 'ethers';
import { CustomButton,Loader } from '../components';
import { calculateBarPercentage } from '../utils';
import { thirdweb } from '../assets';
import { daysLeft } from '../utils';
import { CountBox } from '../components';


const CampaignDetails = () => {
  const {state} = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {donate,getDonations,contract,address} = useStateContext();
  const [amount, setAmount] = useState('');
  const [donators,setDonators]=useState([]);

  const remainingDays = daysLeft(state.deadline);
      
  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);
    console.log(amount);
    await donate(state.pId,amount);
    setIsLoading(false);
  }


  return (
    <div>
      {isLoading && <Loader/>}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[400px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
          <div className="absolute h-full bg-grey"
           style={{width:`${calculateBarPercentage(state.target,state.amoutCollected)}%`,maxWidth:'100%'}}></div>
          </div>
        </div>
        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px] bg-grey">
          <CountBox title="Days Left" value={remainingDays}/>
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected}/>
          <CountBox title="Total Backers" value={donators.length}/>
          </div>
        </div>
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div>
          <h4 className="font-epilogue font-semibold text-[18px] text-white truncate">Creator</h4>
          <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <h4 className=" font-epilogue font-semibold text-[18px] text-white truncate">Story</h4>
          <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>
          <div className="py-10">
          <h4 className=" font-epilogue font-semibold text-[18px] text-white truncate">Donators</h4>
          <div className="mt-[20px] flex flex-col gap-4">
          {donators.length>0? donators.map((item,index)=>(
            <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[yellow] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                    <p className="font-epilogue font-normal text-[16px] text-[yellow] leading-[26px] break-ll">{item.donation}</p>
                  </div>
          )):(
            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet Be the first one!</p>
          )}
              </div>
              <div className="flex flex-col">
              <div className=' flex-5'>
              <div className=" mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className=" my-[20px] bg-[#13131a] rounded-[10px]">
              <h4 className="px-8 font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                <p className=" px-8 mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
                <CustomButton 
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
          </div>
  )
}

export default CampaignDetails;
