import { CardItems } from '@/src/app/[locale]/components/CardItems'
import { SubsMenu } from '@/src/app/[locale]/components/SubsMenu'
// import { SubsMenu } from '@/app/[locale]/components/SubsMenu'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import free from '../../public/assets/subscription/free.svg'
import premium from '../../public/assets/subscription/premium.svg'
import business from '../../public/assets/subscription/business.svg'

export const SubsCardsComponents = () => {

    return (
        <>

            <div className="flex flex-row gap-10 w-full h-full flex-wrap  justify-center">
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        title={"Free"}
                        price={"$0"}
                        icon={
                            <Image
                                src={free}
                                width={25}
                                height={25}
                                alt='free'
                            />}
                    >
                        <CardItems
                            type={'landing'}
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Discounted Shipping Labels'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        month={"/month"}
                        title={"Premium"}
                        price={"$9.99"}
                        icon={<Image
                            src={premium}
                            width={25}
                            height={25}
                            alt='free'
                        />}
                    >
                        <CardItems
                            type={'landing'}
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Level 2 Discount Shipping Labels'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Pallet Reception'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        month={"/month"}
                        title={"Business"}
                        price={"$99.99"}
                        icon={<Image
                            src={business}
                            width={25}
                            height={25}
                            alt='free'
                        />}
                    >
                        <CardItems
                            type={'landing'}
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Level 3 Discount Shipping Labels'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Pallet Reception'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Account Manager'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>
            </div>
        </>
    )
}
