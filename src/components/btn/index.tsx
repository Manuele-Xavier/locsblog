
import Link from 'next/link'

type BtnDefaultProps = {
  text?: string;
};
const BtnDefault: React.FC<BtnDefaultProps> = ({ text }) => {
  return (
    <button>
      <Link href={`/posts/`} className="bg-primary text-[#ffffff] py-[0.8rem] px-[5rem] rounded-[30px]">
        {text}
      </Link>

    </button>
  )
}
export default BtnDefault