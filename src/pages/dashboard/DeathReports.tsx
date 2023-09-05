import { useEffect, useState } from 'react';
import ErrorPage from '../../components/ErrorPage';
import Loader from '../../components/Loader';
import { getStep2 } from '../../service/edrsChartService';

export default function DeathReports({ selectedYear }: any) {
  const [totalDeathAndCause, setTotalDeathAndCause] = useState<any>();
  const [isErorr, setErorr] = useState<boolean>();
  const [isLoading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    getStep2(selectedYear).then((data: any) => {
      setTotalDeathAndCause(data);
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
    <div className="max-w-lg ml-4 sm:max-w-3xl md:max-w-5xl	 rounded shadow-lg bg-white">
         <div className="  w-full overflow-auto">
 <table className="border  table-auto min-w-full border-separate border-slate-400 bg-white">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium  px-3 py-2 text-left border  "
            >
              Description
            </th>

            <td className="border ">
              <table className="table-auto bg-white text-right	">
                <tbody >
                <td >
                        <tr>

                          <td className="table-td-text text-right">
                            Sex
                          </td>
                        </tr>
                      </td>
                  {totalDeathAndCause?.deathsAllCauses?.map(
                    (p: any) => (
                      <td >
                        <tr>

                          <td className="table-td-text text-right	">
                            {p.ageGroup}
                          </td>
                        </tr>
                      </td>
                    )
                  )}
                </tbody>
              </table>
            </td>

          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="px-3 py-2 text-sm font-medium border">
              Total number of deaths for all causes combined
            </td>
            <td className="text-sm    border">
              <table className="table-auto  px-6">
                <tbody className="bg-white">
                <td className="bg-white px-1">
                        <tr>

                          <td className="table-td-text text-right	">
                            M
                          </td>
                        </tr>
                        <tr>
 
                          <td className="table-td-text text-right	">
                            F
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                           U
                          </td>
                        </tr>
                      </td>

                  {totalDeathAndCause?.deathsAllCauses?.map(
                    (p: any) => (
                      <td className="bg-white px-1">
                        <tr>

                          <td className="table-td-text text-right	">
                            {p.female}
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            {p.male}
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            {p.unknown}
                          </td>
                        </tr>
                      </td>
                    )
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="bg-white ">
            <td className="px-3 py-2 text-sm font-medium ">
              Sum of deaths in all other codes
            </td>
            <td className="text-sm   border ">
              <table className="table-auto  w-full ">
                <tbody className=" px-8">
                <td className="bg-white">
                        <tr>

                          <td className="table-td-text text-right	">
                            M
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            F
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                           U
                          </td>
                        </tr>
                      </td>
                  {totalDeathAndCause?.deathsAllOtherCodes?.map(
                    (p: any) => (
                      <td>
                        <tr>

                          <td className="table-td-text text-right	">
                            {p.female}
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            {p.male}
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            {p.unknown}
                          </td>
                        </tr>
                      </td>
                    )
                  )}
                </tbody>
              </table>
            </td>
          </tr>
          <tr className="bg-white ">
            <td className="px-3 py-2 text-sm font-medium border">
              Difference should be zero
            </td>
            <td className="text-sm  border ">
              <table className="table-auto  w-full ">
                <tbody >
                <td className="bg-white">
                        <tr>

                          <td className="table-td-text text-right	">
                            M
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            F
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                           U
                          </td>
                        </tr>
                      </td>
                  {totalDeathAndCause?.deathsAllOtherCodes?.map(
                    (p: any) => (
                      <td>
                        <tr>

                          <td className="table-td-text text-right	">
                            0
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            0
                          </td>
                        </tr>
                        <tr>

                          <td className="table-td-text text-right	">
                            0
                          </td>
                        </tr>
                      </td>
                    )
                  )}
                </tbody>
              </table>
            </td>
          </tr>

        </tbody>
      </table>
    </div> </div>
  )
}
