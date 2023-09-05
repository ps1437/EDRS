import { Suspense, useEffect, useState } from "react";
import ErrorPage from "../../components/ErrorPage";
import Loader from "../../components/Loader";
import { getStep5 } from "../../service/edrsChartService";

export default function IcdDeath({ selectedYear }: any) {
  const [icdDetails, setIcdDetails] = useState<any>();
  const [isErorr, setErorr] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    getStep5(selectedYear).then((data: any) => {
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
      {icdDetails &&
        <div className="flex flex-col  max-w-lg sm:max-w-3xl md:max-w-full	 rounded shadow-lg bg-white ">
          <div className="text-black text-sm  p-4">
            Note: Invalid ICD codes are codes that do not exist in the ICD format
            that the user selected. Verify at the top of the page that the correct
            ICD format is selected.
          </div>

          <div className="bg-white flex flex-col  md:flex-row  ">
            <div className="md:flex-1 w-full md:w-1/2 ">
              <div className="text-black  text-sm p-4 font-medium">
                1.5a Number of invalid ICD codes, by age and sex
              </div>
              <div className=" overflow-auto">
                <table className=" bg-white table-auto border ">
                  <tr>
                    <td>
                      <thead className="bg-white ">
                        {icdDetails?.headers?.map((h: any) => (
                          <tr className="bg-white ">
                            <th className=" table-header">
                              {h?.toUpperCase()}
                            </th>
                          </tr>
                        ))}
                      </thead>
                    </td>
                    <td>
                      <tbody className="divide-y bg-white">
                        <tr>
                          {icdDetails?.icdDeaths?.sex?.map((p: any) => (
                            <td className="table-td-text">
                              {p}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {icdDetails?.icdDeaths?.male?.map((p: any) => (
                            <td className="table-td-text">
                              {p}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {icdDetails?.icdDeaths?.female?.map((p: any) => (
                            <td className="table-td-text">
                              {p}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {icdDetails?.icdDeaths?.total?.map((p: any) => (
                            <td className="table-td-text">
                              {p}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div
              className="md:flex-1 w-full md:w-1/2 overflow-auto
                    md:ml-10
                    "
            >
              <table className="  ">
                <thead className="bg-white ">
                  <tr className="bg-white">
                    <td>
                      <div className="w-full px-4 text-black text-sm py-4 font-medium">
                        1.5b List of invalid ICD codes
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    {icdDetails?.invalidICDCodesByDeathsHeadrs?.map((h: any) => (
                      <th className=" table-header border">
                        {h?.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y border">
                  {icdDetails?.invalidICDCodesByDeaths?.map((h: any) => (
                    <tr>
                      <td className=" table-td-text">
                        {h?.icdCode}
                      </td>
                      <td className="  table-td-text">
                        {h?.deaths}
                      </td>
                    </tr>
                  ))}
                   <tr>
                      <td className=" table-td-text font-medium">
                        Total
                      </td>
                      <td className="  table-td-text">
                        {icdDetails?.totalInvalidICDcodesDeath}
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </Suspense>
  );
}
