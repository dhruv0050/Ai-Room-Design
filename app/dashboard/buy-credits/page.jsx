"use client"
import { PayPalButtons } from '@paypal/react-paypal-js'
import { Button } from '../../../components/ui/button'
import React, { useContext, useState } from 'react'
import { db } from '../../../config/db'
import { Users } from '../../../config/schema'
import { UserDetailContext } from '../../../app/_context/UserDetailContext'
import { useRouter } from 'next/navigation'

function BuyCredits() {
    const creditsOption = [
        {
            credits: 5,
            amount: 0.99
        },
        {
            credits: 10,
            amount: 1.99
        },
        {
            credits: 20,
            amount: 3.99
        },
        {
            credits: 50,
            amount: 9.99
        },
        {
            credits: 100,
            amount: 19.99
        }
    ]
    const [selectedOption, setSelectedOption] = useState(null)
    const {userDetail,setUserDetail} = useContext(UserDetailContext)
    const router = useRouter()
    const onPaymentSuccess=async ()=>{
        const result = await db.update(Users)
        .set({
            credits:userDetail?.credits+selectedOption?.credits
        }).returning({id:Users.id})

        if(result){
            setUserDetail(prev=>({
                ...prev,
                credits:userDetail?.credits+selectedOption?.credits
            }))
            router.push('/dashboard')
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <div className="text-center mb-8">
                <h2 className='font-bold text-2xl sm:text-3xl mb-4'>Buy Credits</h2>
                <p className='text-gray-500 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed'>
                    Unlock the full potential of our AI-powered room design tool with credits.
                    Each credit allows you to generate one room design. Choose the amount that best suits your needs and get started on creating your dream space today!
                </p>
            </div>
            
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6'>
                {creditsOption.map((item, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                            selectedOption?.credits === item.credits 
                                ? 'border-violet-500 bg-violet-50 shadow-lg transform scale-105' 
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedOption(item)}
                    >
                        {selectedOption?.credits === item.credits && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                        
                        <div className="text-center mb-3">
                            <h3 className='text-2xl sm:text-3xl font-bold text-gray-800'>{item.credits}</h3>
                            <p className='text-xs sm:text-sm font-medium text-gray-500'>Credits</p>
                        </div>
                        
                        <div className="text-center mb-3">
                            <p className='text-lg sm:text-xl font-bold text-violet-600'>${item.amount}</p>
                        </div>
                        
                        <Button 
                            className='w-full text-xs sm:text-sm py-2 bg-violet-500 hover:bg-violet-600 transition-colors duration-200' 
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedOption(item)
                            }}
                        >
                            Select
                        </Button>
                    </div>
                ))}
            </div>
            <div className='mt-20'>
                {selectedOption?.amount&& 
                <PayPalButtons style={{layout:'horizontal'}}
                onApprove={()=>onPaymentSuccess()}
                onCancel={()=>console.log("Payment cancel")}
                    createOrder={(data,actions)=>{
                        return actions?.order.create({
                            purchase_units:[
                                {
                                    amount:{
                                        value:selectedOption?.amount?.toFixed(2),
                                        currency_code:'USD'
                                    }
                                }
                            ]
                        })
                    }}

                />
                }
            </div>
                
        </div>
        
    )
}

export default BuyCredits