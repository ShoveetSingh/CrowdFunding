import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton,FormField,Loader } from '../components';
import { money} from '../assets';
import { checkIfImage } from '../utils';
import { useStateContext } from '../context';
import { ethers } from 'ethers';


const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {createCampaign} = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title:'',
    description:'',
    target:'',
    deadline:'',
    image: ''
  });


  const handleForm = (e,fieldName) => {
    setForm({...form,[fieldName]: e.target.value})
  }


   const handlesubmit = async (e) => {
    e.preventDefault();



    checkIfImage(form.image,async(exists)=>{
      if(exists){
        setIsLoading(true);
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target,18)})
        setIsLoading(false);
        navigate('/')
      }
      else{
        alert('Please enter a valid image url');
        setForm({...form,image:''})
      }
    })
    console.log(form)
   }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader/>}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
      <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>
      <form onSubmit={handlesubmit} className='flex flex-col  w-full mt-[65px] gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
        <FormField 
          LabelName="Your Name *"
          inputType="text"
          placeholder = "Shoveet Singh"
          value={form.name}
          handleChange={(e) => handleForm(e,'name')}
        />
        <FormField
          LabelName="Campaign Title *"
          inputType="text"
          placeholder = "Help me to buy a new laptop"
          value={form.title}
          handleChange={(e) => handleForm(e,'title')}
        />
        </div>
        <FormField
          LabelName="Story *"
          inputType="text"
          placeholder = "Tell your story"
          isTextArea={true}
          value={form.description}
          handleChange={(e) => handleForm(e,'description')}
        />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">You will get 100% of the raised amount</h4>
        </div>
        <div className='flex flex-col gap-[40px]'>
        <FormField 
          LabelName="Goal *"
          inputType="text"
          placeholder = "ETH 0.50"
          value={form.target}
          handleChange={(e) => handleForm(e,'target')}
        />
        <FormField
          LabelName="End Date *"
          inputType="date"
          placeholder = "DD/MM/YYYY"
          value={form.deadline}
          handleChange={(e) => handleForm(e,'deadline')}
        />

        <FormField
          LabelName="Campaign image *"
          inputType="url"
          placeholder = "Place image of your Campaign"
          value={form.image}
          handleChange={(e) => handleForm(e,'image')}
        />


        <div className= "flex justify-center items-center mt-[40px]">
          <CustomButton
            btntype="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"/>
        </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign