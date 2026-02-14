import { ReviewAndRating } from "@/app/lib/definition";
import Image from "next/image";
import { changeDate } from '../../helper/date'
import { SquarePen } from "lucide-react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { useSession } from "@/app/lib/auth-client";



export default function ReviewCard({userImage, userId, userName, userRole, rateValue, reviewText, reviewTextCreatedTime}: ReviewAndRating) {

    const {data: session} = useSession()
    const user = session?.user

    return (
        <div className="py-8 px-5 border border-gray-500 rounded-xl">
            <div className="flex justify-between items-start gap-3">
                <div className="flex justify-between items-center gap-3">
                    {
                        user?.image?(
                            <img src={userImage} alt="" className="w-10 h-10 rounded-lg border border-gray-600"/>
                        ):(
                            <Image src={"/userSmall.png"} alt='' width={15} height={15} className="w-10 h-10 rounded-lg border border-gray-600"/>
                        )
                    }
                    <div>
                        <h4 className="text-sm text-gray-400">{userName}
                            {userRole && userRole !== "user" && ` (${userRole})`}
                        </h4>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, index) =>(
                                rateValue &&
                                index < rateValue?(
                                    <StarSolid key={index} className="w-4 text-cyan-600"/>
                                ):(
                                    <StarOutline key={index} className="w-4"/>
                                )
                            
                            ))}
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500">{changeDate(reviewTextCreatedTime)}</p>                
            </div>
            <div className="mt-5">
                <p className="text-sm text-gray-300">{reviewText}</p>
            </div>
            <div className="flex justify-end">                
                <button className={user?.id === userId?'block':'hidden'}><SquarePen className="w-4 text-gray-400"/></button>
            </div>
        </div>
    )
}
