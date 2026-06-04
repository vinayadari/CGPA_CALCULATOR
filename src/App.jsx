import { useState } from "react";

const subjects = {
  "Data Mining and Machine Learning": 3,
  "Computer Networks": 3,
  "Cyber Security Essentials": 2,
  "Cloud Architecture Design & Security": 3,
  "Project Phase-I": 2,
  "Data Visualization Tools": 1,
  "Data Mining and Machine Learning Lab": 1,
  "Network Simulation Lab": 1,
  "Data Analytics Using R Programming": 3,
};

export default function App() {
  const [grades, setGrades] = useState({});
  const [previousCgpas, setPreviousCgpas] = useState([0, 0, 0, 0, 0]);
  const [result, setResult] = useState(null);

  const calculateCGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    Object.entries(subjects).forEach(([subject, credits]) => {
      const grade = grades[subject] || 0;
      totalCredits += credits;
      weightedSum += credits * grade;
    });

    const semesterCgpa = weightedSum / totalCredits;
    const cumulativeCgpa =
      (previousCgpas.reduce((a, b) => a + b, 0) + semesterCgpa) / 5;

    setResult({
      totalCredits,
      semesterCgpa,
      cumulativeCgpa,
    });
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: system-ui, sans-serif;
          background: #0f172a;
          color: #e5e7eb;
        }

        .container {
          max-width: 900px;
          margin: auto;
          padding: 24px;
        }

        h1 {
          text-align: center;
          margin-bottom: 24px;
        }

        .card {
          background: #020617;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .subject {
          flex: 1;
        }

        .credits {
          width: 60px;
          text-align: center;
          opacity: 0.7;
        }

        select, input {
          background: #020617;
          border: 1px solid #334155;
          color: #e5e7eb;
          padding: 6px 10px;
          border-radius: 6px;
        }

        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #2563eb;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background: #1d4ed8;
        }

        .cgpa-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }

        .result p {
          margin: 6px 0;
        }
      `}</style>

      <div className="container">
        <h1>CGPA Calculator</h1>

        {/* Subjects */}
        <div className="card">
          <h2>Subjects</h2>
          {Object.entries(subjects).map(([subject, credits]) => (
            <div className="row" key={subject}>
              <div className="subject">{subject}</div>
              <div className="credits">{credits}</div>
              <select
                onChange={(e) =>
                  setGrades({
                    ...grades,
                    [subject]: Number(e.target.value),
                  })
                }
              >
                <option value="">Grade</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Previous CGPAs */}
        <div className="card">
          <h2>Previous Semester CGPAs</h2>
          <div className="cgpa-grid">
            {previousCgpas.map((_, i) => (
              <input
                key={i}
                type="number"
                step="0.01"
                placeholder={`Sem ${i + 1}`}
                onChange={(e) => {
                  const updated = [...previousCgpas];
                  updated[i] = Number(e.target.value);
                  setPreviousCgpas(updated);
                }}
              />
            ))}
          </div>
        </div>

        {/* Button */}
        <button onClick={calculateCGPA}>Calculate CGPA</button>

        {/* Result */}
        {result && (
          <div className="card result">
            <p>Total Credits: {result.totalCredits}</p>
            <p>
              Current Semester CGPA: {result.semesterCgpa.toFixed(2)}
            </p>
            <p>
              Cumulative CGPA: {result.cumulativeCgpa.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
