"use client"
import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ key, prompt, handleTagClick, hanldeEdit, handleDelete }) => {
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div>
          <Image src={prompt.creator.image} alt='user_image' width={40} height={40} className='rounded-full object-contain'/>
        </div>
      </div>
    </div>
  )
}

export default PromptCard