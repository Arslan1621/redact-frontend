import React, { useState } from "react";

interface CounterProps {
  title?: string;
  initialCount?: number;
}

const Counter: React.FC<CounterProps> = ({ title = "Counter", initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialCount);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-lg">Current Count: {count}</p>
      <div className="flex gap-3">
        <button
          onClick={increment}
          className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
        >
          -
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
