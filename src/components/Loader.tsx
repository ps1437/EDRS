import React from 'react'

export default function Loader() {
    return (
        <div
            className=" flex space-x-2  p-5 rounded-full justify-center items-center"
        >
            <div
                className="bg-green-200 p-1  w-2 h-2 rounded-full animate-bounce blue-circle"
            ></div>
            <div
                className="bg-green-200 p-1  w-2 h-2 rounded-full animate-bounce blue-circle"
            ></div>
            <div
                className="bg-green-600 p-1 w-3 h-3 rounded-full animate-bounce green-circle"
            ></div>
            <div
                className="bg-green-800 p-1  w-2 h-2 rounded-full animate-bounce red-circle"
            ></div>
            <div
                className="bg-green-200 p-1  w-2 h-2 rounded-full animate-bounce blue-circle"
            ></div>
        </div>
    )
}
