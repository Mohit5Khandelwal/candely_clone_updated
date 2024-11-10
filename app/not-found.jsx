import Image from "next/image";

export default function NotFound() {
    return (
        <div className="text-4xl font-extrabold pt-6 mb-10 place-items-center">
            <h1 className="mb-4 gradient-title"> 404 - Page Not Found </h1>
            <Image 
                src='/error_page.gif'
                width="500"
                height="500"
                alt="404 - image"
            />
        </div>
    )
}