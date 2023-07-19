import React from 'react'

const FormField = ({LabelName,placeholder, inputType, isTextArea,value,handleChange}) => {
  return (
   <label className="flex flex-col w-full flex-1">
       {LabelName && (<span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#8d8d8d] mb-[10px]">{LabelName}</span>)}
         {isTextArea ? (
              <textarea 
                required
                    placeholder={placeholder}
                    value={value}
                    rows={10}
                    onChange={handleChange}
                    className="bg-transparent rounded-[10px] border-[1px] border-[#8d8d8d] text-white font-epilogue font-medium text-[14px] leading-[22px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] focus:ring-0 sm:min-w-[300px] w-full"
              />
            ) : (
                <input
                    required
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    className="bg-transparent rounded-[10px] border-[1px] border-[#8d8d8d] text-white font-epilogue font-medium text-[14px] leading-[22px] py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] focus:ring-0 sm:min-w-[300px] w-full"
                />
            )}
   </label>
  )
}

export default FormField