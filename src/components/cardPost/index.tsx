import Link from "next/link"
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'

type CardPostsProps = {
    imageUrl?: string;
    title?: string
    description?: string
    slug?: string
};
const CardPost: React.FC<CardPostsProps> = ({ imageUrl, description, title, slug }) => {
    return (
        <div>
            <Link href={`/posts/${slug}`}>
                <img src={imageUrl} alt={description} className="w-full h-[15rem] rounded-[30px] object-cover mb-4"/>
            </Link>
            <div className="flex justify-between">
                <Link href={`/posts/${slug}`}>
                    <h3 className="text-base text-primary">{title}</h3>
                </Link>

                <ArrowUpRightIcon aria-hidden="true" className="w-[1.5rem] text-primary"/>
            </div>
            <p>{description}</p>
        </div>
    )
}
export default CardPost