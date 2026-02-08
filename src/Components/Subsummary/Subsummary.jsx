import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import "./Subsummary.css";
import Title from "../Title/Title";

const Summary = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!tasks.length) return <p>ยังไม่มีข้อมูล Task</p>;

  // รวมจำนวนงานแยกตามบริษัท
  const companyData = tasks.reduce((acc, t) => {
    const found = acc.find((item) => item.name === t.company);
    if (found) {
      found.tasks += 1;
    } else {
      acc.push({ name: t.company, tasks: 1 });
    }
    return acc;
  }, []);

  //  กราฟวงกลม: แยกตามสถานะ
  const pieData = [
    { name: "รอดำเนินการ", value: tasks.filter((t) => t.status === "pending").length },
    { name: "เสร็จเรียบร้อย", value: tasks.filter((t) => t.status === "complete").length },
    { name: "เสร็จล่าช้า", value: tasks.filter((t) => t.status === "late").length },
  ];
  const COLORS = ["#FFBB28", "#00C49F", "#FF4444"]; // เหลือง=รอ, เขียว=เสร็จ, แดง=ล่าช้า

  //  ความคืบหน้างาน (เฉพาะงานที่เสร็จ)
  const done = tasks.filter((t) => t.status === "complete").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const late = tasks.filter((t) => t.status === "late").length;
const percentDone =
  done + late + pending > 0 ? (((done + late) / (done + pending + late)) * 100).toFixed(1): 0;
  return (
    <div className="sum-container">
    <Title subTitle="ความสำเร็จที่เราภาคภูมิใจ" title="สรุปผลการดำเนินงาน" />
    <div className="summary-container">
      {/* กราฟแท่ง: จำนวนงานแยกตามบริษัท */}
      <div className="summary-card">
        <h3>จำนวนงานแยกตามบริษัท</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#0d47a1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* กราฟวงกลาม: แยกตามสถานะ */}
      <div className="summary-card">
        <h3>สัดส่วนงานตามสถานะ</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* วงกลมเปอร์เซ็นต์ */}
      <div className="summary-card progress-card">
        <h3>ความคืบหน้างาน</h3>
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart blue">
            <path
              className="circle-bg"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${percentDone}, 100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="percentage">{percentDone}%</text>
          </svg>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Summary;
