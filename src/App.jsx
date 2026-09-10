import { useState } from "react";
import "./App.css";

function App() {
  const [numbers, setNumbers] = useState([50, 30, 70, 20, 60]);
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [arraySize, setArraySize] = useState(10);

  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [action, setAction] = useState("Ready");

  const [currentCase, setCurrentCase] = useState("Not analyzed");
  const [currentComplexity, setCurrentComplexity] = useState("-");

  function generateArray() {
    if (sorting) return;

    const newNumbers = [];

    for (let i = 0; i < arraySize; i++) {
      const randomNumber = Math.floor(Math.random() * 80) + 20;
      newNumbers.push(randomNumber);
    }

    setNumbers(newNumbers);
    setComparing([]);
    setSorted([]);
    setComparisons(0);
    setSwaps(0);
    setAction("New array generated");
    setCurrentCase("Not analyzed");
    setCurrentComplexity("-");
  }

  function analyzeCase(arr) {
    let isSorted = true;
    let isReverseSorted = true;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        isSorted = false;
      }

      if (arr[i] < arr[i + 1]) {
        isReverseSorted = false;
      }
    }

    if (isSorted) {
      return {
        caseName: "Best Case",
        complexity: "O(n)",
      };
    }

    if (isReverseSorted) {
      return {
        caseName: "Worst Case",
        complexity: "O(n²)",
      };
    }

    return {
      caseName: "Average Case",
      complexity: "O(n²)",
    };
  }

  function resetArray() {
    if (sorting) return;

    setNumbers([50, 30, 70, 20, 60]);
    setArraySize(5);
    setComparing([]);
    setSorted([]);
    setComparisons(0);
    setSwaps(0);
    setAction("Ready");
    setCurrentCase("Not analyzed");
    setCurrentComplexity("-");
  }

  async function bubbleSort() {
    if (sorting) return;

    setSorting(true);
    setSorted([]);
    setComparisons(0);
    setSwaps(0);

    const arr = [...numbers];

    const analysis = analyzeCase(arr);

    setCurrentCase(analysis.caseName);
    setCurrentComplexity(analysis.complexity);

    let totalComparisons = 0;
    let totalSwaps = 0;

    for (let i = 0; i < arr.length; i++) {
      let swapped = false;

      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);

        totalComparisons++;
        setComparisons(totalComparisons);

        setAction(
          `Comparing ${arr[j]} and ${arr[j + 1]}`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, speed)
        );

        if (arr[j] > arr[j + 1]) {
          setAction(
            `Swapping ${arr[j]} and ${arr[j + 1]}`
          );

          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          swapped = true;

          totalSwaps++;
          setSwaps(totalSwaps);

          setNumbers([...arr]);

          await new Promise((resolve) =>
            setTimeout(resolve, speed)
          );
        }
      }

      setSorted((previous) => [
        ...previous,
        arr.length - i - 1,
      ]);

      if (!swapped) {
        break;
      }
    }

    setComparing([]);
    setSorted(arr.map((_, index) => index));
    setAction("Sorting completed!");

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    setSorting(false);
  }

  return (
    <div className="app">
      <h1>Bubble Sort Visualizer</h1>

      <div className="buttons">
        <button onClick={generateArray} disabled={sorting}>
          Generate New Array
        </button>

        <button onClick={bubbleSort} disabled={sorting}>
          Bubble Sort
        </button>

        <button onClick={resetArray} disabled={sorting}>
          Reset
        </button>
      </div>

      <div className="controls">
        <div className="speed-control">
          <label>Speed: </label>

          <select
            value={speed}
            onChange={(event) =>
              setSpeed(Number(event.target.value))
            }
            disabled={sorting}
          >
            <option value="1000">Slow</option>
            <option value="500">Medium</option>
            <option value="200">Fast</option>
          </select>
        </div>

        <div className="size-control">
          <label>Array Size: </label>

          <select
            value={arraySize}
            onChange={(event) =>
              setArraySize(Number(event.target.value))
            }
            disabled={sorting}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <p className="status">
        {sorting ? "Sorting..." : "Ready"}
      </p>

      <div className="legend">
        <div>
          <span className="legend-box normal"></span>
          Unsorted
        </div>

        <div>
          <span className="legend-box compare"></span>
          Comparing
        </div>

        <div>
          <span className="legend-box sorted-box"></span>
          Sorted
        </div>
      </div>

      <div className="array">
        {numbers.map((number, index) => (
          <div
            className={`bar ${
              comparing.includes(index)
                ? "comparing"
                : ""
            } ${
              sorted.includes(index)
                ? "sorted"
                : ""
            }`}
            key={index}
            style={{
              height: `${number * 3}px`,
            }}
          >
            <span>{number}</span>
          </div>
        ))}
      </div>

      <div className="info">
        <h2>Bubble Sort</h2>

        <p>
          Bubble Sort repeatedly compares adjacent elements
          and swaps them if they are in the wrong order.
        </p>

        <div className="live-info">
          <div>
            <strong>Current Case</strong>
            <span>{currentCase}</span>
          </div>

          <div>
            <strong>Time Complexity</strong>
            <span>{currentComplexity}</span>
          </div>

          <div>
            <strong>Current Action</strong>
            <span>{action}</span>
          </div>

          <div>
            <strong>Comparisons</strong>
            <span>{comparisons}</span>
          </div>

          <div>
            <strong>Swaps</strong>
            <span>{swaps}</span>
          </div>
        </div>

        <div className="complexity">
          <div>
            <strong>Best Case</strong>
            <span>O(n)</span>
          </div>

          <div>
            <strong>Average Case</strong>
            <span>O(n²)</span>
          </div>

          <div>
            <strong>Worst Case</strong>
            <span>O(n²)</span>
          </div>

          <div>
            <strong>Space</strong>
            <span>O(1)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;