import { Suspense, useEffect, useState } from 'react';
import ErrorPage from '../../components/ErrorPage';
import Loader from '../../components/Loader';
import { getStep7 } from '../../service/edrsChartService';


export default function IcdCodesNot({ selectedYear }: any) {
    const [icdDetails, setIcdDetails] = useState<any>();
    const [isErorr, setErorr] = useState<boolean>();
    const [isLoading, setLoading] = useState<boolean>();

    useEffect(() => {
        setLoading(true);
        getStep7(selectedYear).then((data: any) => {
            setIcdDetails(data);
            setErorr(false);
            setLoading(false)
        }).catch((err: any) => {
            setErorr(true);
            setLoading(false)
        });
    }, [selectedYear]);


    if (isErorr) {
        return <ErrorPage />
    }
    if (isLoading) {
        return <Loader />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <div className="bg-white flex flex-col p-4">
                <div className="bg-white flex flex-col  md:flex-row  ">
                    <div className="md:flex-1 w-full  overflow-auto">
                        <table className=" bg-white table-auto ">
                            <tr className="bg-white ">
                                <td colSpan={5} className="bg-white ">
                                    <div className="w-full text-black bg-white text-sm py-4 font-medium">Table 1.7 Codes not to be used for underlying cause of death</div>
                                </td>
                            </tr>
                            <tr>
                                <thead className="bg-white border">
                                    {icdDetails?.headers?.map((h: any) =>
                                        <th className="table-header">{h}</th>
                                    )}
                                </thead>
                                {icdDetails?.data?.map((p: any) => (
                                    <tr className="border bg-white">
                                        <td className="table-td-text">{p?.icdCode}</td>
                                        <td className="table-td-text">{p?.disease}</td>
                                        <td className="table-td-text">{p?.deaths}</td>
                                    </tr>
                                ))}
                                <tr className="border bg-white">
                                    <td className="table-td-text font-medium">Total</td>
                                    <td className="table-td-text"></td>
                                    <td className="table-td-text">{icdDetails?.totalInvalidICDCodesByCause}</td>
                                </tr>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </Suspense>
    )

}