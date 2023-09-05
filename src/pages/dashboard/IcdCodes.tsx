import React, { Suspense, useEffect, useState } from "react";
import ErrorPage from "../../components/ErrorPage";
import Loader from "../../components/Loader";
import { getStep6 } from "../../service/edrsChartService";



export default function IcdCodes({ selectedYear }: any) {
  const [icdDetails, setIcdDetails] = useState<any>();
  const [isErorr, setErorr] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    getStep6(selectedYear).then((data: any) => {
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
          <div className="md:flex-1 w-full md:w-1/2 overflow-auto">
            <table className=" table-auto  ">
              <thead className="bg-white ">
                <tr className="bg-white">
                  <td colSpan={4}>
                    <div className="w-full px-4 text-black text-sm py-4 font-medium">
                      1.6a Sex-specific codes: Diseases unlikely to cause death
                      in a certain sex
                    </div>
                  </td>
                </tr>
                <tr className="bg-white border">
                  {icdDetails?.invalidICDCodesByCauseHeaders?.map(
                    (h: any) => (
                      <th className="  table-header">{h}</th>
                    )
                  )}
                </tr>
              </thead>

              <tbody className="divide-y border">
                {icdDetails?.invalidICDCodesByCause?.map((p: any) => (
                  <tr className="border">
                    <td className="table-td-text">
                      {p?.icdCode}
                    </td>
                    <td className="table-td-text">
                      {p?.disease}
                    </td>
                    <td className="table-td-text">
                      {p?.ages}
                    </td>
                    <td className="table-td-text">
                      {p?.deaths}
                    </td>
                  </tr>
                ))}
                 <tr className="border">

<td className="table-td-text font-medium">
  Total
</td>
<td className="table-td-text">

</td>
<td className="table-td-text">

</td>
<td className="table-td-text">
  {icdDetails?.totalInvalidICDCodesByCause}
</td>

</tr>
              </tbody>
            </table>
          </div>
          <div
            className="md:flex-1 w-full md:w-1/2 overflow-auto
                    md:ml-10
                    "
          >
            <table className=" bg-white table-auto ">
              <tr>
                <td colSpan={5}>
                  <div className="w-full text-black  text-sm py-4 font-medium">
                    1.6b Age-specific codes: Diseases unlikely to cause death at
                    certain ages
                  </div>
                </td>
              </tr>
              <tr>
                <thead className="bg-white border">
                  {icdDetails?.headers?.map((h: any) => (
                    <th className=" table-header">{h}</th>
                  ))}
                </thead>
                {icdDetails?.unlikelyDeathByAge?.map((p: any) => (
                  <tr className="border">
                    <td className="table-td-text">
                      {p?.icdCode}
                    </td>
                    <td className="table-td-text">
                      {p?.disease}
                    </td>
                    <td className="table-td-text">
                      {p?.ages}
                    </td>
                    <td className="table-td-text">
                      {p?.deaths}
                    </td>
                  </tr>
                ))}
                <tr className="border">

                  <td className="table-td-text font-medium">
                    Total
                  </td>
                  <td className="table-td-text">

                  </td>
                  <td className="table-td-text">

                  </td>
                  <td className="table-td-text">
                    {icdDetails?.totalUnlikelyDeathByAge}
                  </td>

                </tr>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
