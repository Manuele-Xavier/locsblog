type BannerComponentProps = {
    imageUrl?: string;  
    description: string; 
  };
  
  const BannerComponent: React.FC<BannerComponentProps> = ({ imageUrl, description }) => {
    return (
      <>
        {imageUrl && <img className="w-full h-[24rem] rounded-[30px] object-cover" src={imageUrl} alt={description} />}
      </>
     
    );
  };
export default BannerComponent