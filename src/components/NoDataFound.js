import Image from "next/image";

const NoDataFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Image
                src="/No_Data_Found.svg"
                alt="No Data Found"
                width={300}
                height={300}
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
};

export default NoDataFound;

