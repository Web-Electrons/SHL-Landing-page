import Link from 'next/link'
import { Button } from '../../components/ui/button'
import Image from 'next/image'
import logo from '../../public/logo.png'
export default function NotFound() {
    return (
        <div className='w-full h-screen flex flex-col text-center justify-center items-center align-middle gap-4'>
            <Image
                src={logo}
                width={100}
                height={100}
                alt='logo'  
            />
            <div className="flex flex-col font-bold text-red-600 ">
                <h2 className=''>
                    Ups
                </h2>
                <h2 className=''>
                    Page Not Found
                </h2>
            </div>
            <div className="">
                <p>Could not find requested resource</p>
                <div className="mt-2">
                    <Link href="/" passHref>
                        <Button
                            variant="destructive"
                            size="xs"
                        >
                            <p className='text-xs'>Back Home</p>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}