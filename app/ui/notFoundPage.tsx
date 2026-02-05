

export default function NotFoundPage() {
    return(
        <div className="flex justify-center min-w-full  ">
            <div className="flex  flex-col items-center justify-center  bg-black/10 text-gray-400 px-6 py-5">
                <h1 className="text-[120px] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#238E8E] via-[#ffffff] to-[#238E8E]">
                    404
                </h1>
                <p className="text-xl sm:text-2xl font-semibold my-10  ">Book Not Found</p>
                <p className="text-center max-w-md text-sm sm:text-base mb-8">
                    The page you're looking for doesn’t exist. Let’s get you back on track.
                </p>
                <a
                    href="/"
                    className="fancyBorder px-6 py-3 bg-[#238E8E] text-white rounded-full shadow hover:bg-[#1b6f6f] transition duration-300"
                >
                    Go Home
                </a>
            </div>
        </div>
    )
}