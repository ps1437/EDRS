import React from "react";

export default function ErrorResult({ errors }: any) {
  return (
 
      <table className="w-full mx-1 md:mx-16 mb-4   text-red-500 border-collapse border ">
        <thead>
          <tr>
            <th className="border  px-4">Error Field Name</th>
            <th className="border  px-4">Erorr Description</th>
          </tr>
        </thead>
        <tbody>
          {errors &&
            errors.map((error: any) => {
              return (
                <tr>
                  <td className="border  px-4 text-sm">{error.fieldName}</td>
                  <td className="border  px-4 text-sm">{error.fieldError}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
  
  );
}
