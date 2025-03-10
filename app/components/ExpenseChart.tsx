"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

// Define types for our data
type ExpenseData = {
  name: string;
  value: number;
  color: string;
}

// Define type for legend entry
type LegendEntry = {
  value: string;
  color: string;
  payload: ExpenseData;
}

export default function ExpenseChart() {
  const data: ExpenseData[] = [
    { name: "Food", value: 37.98, color: "#DDB8D9" },
    { name: "Subscriptions", value: 20.89, color: "#CFE3D7" },
    { name: "Transportation", value: 10.78, color: "#FFEDAB" },
    { name: "Others", value: 8.39, color: "#F7AC59" },
    { name: "Shopping", value: 7.15, color: "#8EADE6" },
    { name: "Health", value: 5.41, color: "#EADBA0" },
    { name: "Services", value: 4.78, color: "#F9B1B2" },
    { name: "Travel", value: 3.56, color: "#305F50" },
    { name: "Telecom", value: 1.05, color: "#023D29" },
  ]

  const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-medium">{`${payload[0].name}: ${Number(payload[0].value).toFixed(2)}%`}</p>
        </div>
      )
    }
    return null
  }

  // Custom legend that renders in two rows
  const CustomizedLegend = (props: { payload?: LegendEntry[] }) => {
    const { payload = [] } = props;
    
    // Split the legend items into two rows
    const firstRow = payload.slice(0, 4);
    const secondRow = payload.slice(4);
    
    return (
      <div className="flex flex-col items-center mt-6">
        <div className="flex justify-center gap-x-4 mb-2">
          {firstRow.map((entry: LegendEntry, index: number) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div 
                style={{ 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  backgroundColor: entry.color,
                  marginRight: 5
                }} 
              />
              <span style={{ color: entry.color, fontSize: "14px" }}>
                {entry.value}: {entry.payload.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-x-4">
          {secondRow.map((entry: LegendEntry, index: number) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div 
                style={{ 
                  width: 10, 
                  height: 10, 
                  borderRadius: '50%', 
                  backgroundColor: entry.color,
                  marginRight: 5
                }} 
              />
              <span style={{ color: entry.color, fontSize: "14px" }}>
                {entry.value}: {entry.payload.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[380px] mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="42%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={0.5}
            stroke="#fff"
            strokeWidth={1}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={<CustomizedLegend />}
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} 