import "./styles.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Dot,
} from "recharts";
import { Page } from "./types";
import { mean, standardDeviation } from "./utils";

let data: Page[] = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const zscoresUv = data.map((page) => {
  const meanUv = mean(data, "uv");
  const stdUv = standardDeviation(data, "uv", meanUv);
  const zscore = (page.uv - meanUv) / stdUv;
  return zscore > 1;
});

const zscoresPv = data.map((page) => {
  const meanPv = mean(data, "pv");
  const stdPv = standardDeviation(data, "pv", meanPv);
  const zscore = (page.pv - meanPv) / stdPv;
  return zscore > 1;
});

export default function App() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
          {zscoresUv.map((zscore, index) => (
            <stop
              key={index}
              offset={`${100 / zscoresUv.length}1%`}
              stopColor={zscore ? "red" : "#82ca9d"}
            />
          ))}
        </linearGradient>
        <linearGradient id="colorPv" x1="0%" y1="0" x2="100%" y2="0">
          {zscoresPv.map((zscore, index) => (
            <stop
              key={index}
              offset={`${100 / zscoresPv.length}%`}
              stopColor={zscore ? "red" : "#8884d8"}
            />
          ))}
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 20, right: 20 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="url(#colorPv)"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="url(#colorUv)" />
    </LineChart>
  );
}
