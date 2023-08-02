import React from 'react'
import {useNavigate} from 'react-router-dom'
import {loader} from '../assets'
import FundCard from './FundCard'
import {v4 as uuidv4} from 'uuid'


const DisplayCampaigns = ({title,campaigns,isLoading}) => {
  const navigate = useNavigate();


  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`,{state:campaign})
  }
  


  return (
    <div>
      <h1 className="font-epilogue fon-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading &&(
          <img src={loader} alt="loader" className="w-[50px] h-[50px] object-contain"/>
        )}
        {!isLoading && campaigns.length === 0 &&(
          <p className = "font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet.
          </p>
        )}
        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard key={uuidv4()} {...campaign} handleClick={() =>handleNavigate(campaign)}/>)}
      </div>
    </div>
  )
}

export default DisplayCampaigns