import { useState, useEffect } from "react";

const subjects = {
  "Full Stack Technologies": 3,
  "Full Stack Technologies Lab": 1,
  "Software Testing": 3,
  "Software Testing Lab": 1,
  "Generative AI": 3,
  "Project Phase-II": 10,
  "SAP Signavio": 3,
};

export default function App() {
  const [grades, setGrades] = useState(() => {
    const saved = localStorage.getItem("grades");
    return saved ? JSON.parse(saved) : {};
  });

  const [previousCgpas, setPreviousCgpas] = useState(() => {
    const saved = localStorage.getItem("previousCgpas");
    return saved ? JSON.parse(saved) : [0, 0, 0, 0, 0, 0];
  });

  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem("result");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("grades", JSON.stringify(grades));
  }, [grades]);

  useEffect(() => {
    localStorage.setItem(
      "previousCgpas",
      JSON.stringify(previousCgpas)
    );
  }, [previousCgpas]);

  useEffect(() => {
    localStorage.setItem(
      "result",
      JSON.stringify(result)
    );
  }, [result]);

  const calculateCGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    Object.entries(subjects).forEach(([subject, credits]) => {
      const grade = grades[subject] || 0;

      totalCredits += credits;
      weightedSum += credits * grade;
    });

    const semesterCgpa =
      weightedSum / totalCredits;

    const previousTotal = previousCgpas.reduce(
      (sum, cgpa) => sum + Number(cgpa || 0),
      0
    );

    const cumulativeCgpa =
      (previousTotal + semesterCgpa) / 7;

    setResult({
      totalCredits,
      semesterCgpa,
      cumulativeCgpa,
    });
  };

  useEffect(() => {
    const hasGrades =
      Object.keys(grades).length > 0;

    const hasCgpas =
      previousCgpas.some(
        (cgpa) => Number(cgpa) > 0
      );

    if (hasGrades || hasCgpas) {
      calculateCGPA();
    }
  }, [grades, previousCgpas]);

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

        .subtitle {
          text-align: center;
          color: #94a3b8;
          margin-top: -16px;
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

        select,
        input {
          background: #020617;
          border: 1px solid #334155;
          color: #e5e7eb;
          padding: 6px 10px;
          border-radius: 6px;
        }

        select {
          width: 100px;
        }

        input {
          width: 100%;
          box-sizing: border-box;
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
          grid-template-columns:
            repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }

        .result p {
          margin: 8px 0;
        }

        .result strong {
          color: #60a5fa;
        }

        .total {
          border-top: 1px solid #334155;
          margin-top: 15px;
          padding-top: 15px;
          color: #94a3b8;
        }

        @media (max-width: 600px) {
          .row {
            flex-wrap: wrap;
          }

          .subject {
            flex-basis: 100%;
          }

          .credits {
            text-align: left;
          }
        }
      `}</style>

      <div className="container">

        <h1>VII Semester CGPA Calculator</h1>

        <div className="subtitle">
          B.E. Computer Science & Engineering
        </div>

        {/* SUBJECTS */}
        <div className="card">
          <h2>VII Semester Subjects</h2>

          {Object.entries(subjects).map(
            ([subject, credits]) => (
              <div
                className="row"
                key={subject}
              >
                <div className="subject">
                  {subject}
                </div>

                <div className="credits">
                  {credits} Credits
                </div>

                <select
                  value={grades[subject] || ""}
                  onChange={(e) =>
                    setGrades({
                      ...grades,
                      [subject]:
                        e.target.value === ""
                          ? 0
                          : Number(
                              e.target.value
                            ),
                    })
                  }
                >
                  <option value="">
                    Grade
                  </option>

                  {[...Array(10)].map(
                    (_, i) => (
                      <option
                        key={i + 1}
                        value={i + 1}
                      >
                        {i + 1}
                      </option>
                    )
                  )}
                </select>
              </div>
            )
          )}

          <div className="total">
            Total Semester Credits: <strong>24</strong>
          </div>
        </div>

        {/* PREVIOUS CGPAS */}
        <div className="card">
          <h2>Previous Semester CGPAs</h2>

          <div className="cgpa-grid">
            {previousCgpas.map(
              (_, i) => (
                <input
                  key={i}
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={
                    previousCgpas[i] || ""
                  }
                  placeholder={`Sem ${i + 1}`}
                  onChange={(e) => {
                    const updated = [
                      ...previousCgpas,
                    ];

                    updated[i] =
                      e.target.value === ""
                        ? 0
                        : Number(
                            e.target.value
                          );

                    setPreviousCgpas(
                      updated
                    );
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* CALCULATE */}
        <button onClick={calculateCGPA}>
          Calculate CGPA
        </button>

        {/* RESULT */}
        {result && (
          <div className="card result">
            <h2>Result</h2>

            <p>
              Total Credits:{" "}
              <strong>
                {result.totalCredits}
              </strong>
            </p>

            <p>
              VII Semester CGPA:{" "}
              <strong>
                {result.semesterCgpa.toFixed(2)}
              </strong>
            </p>

            <p>
              Cumulative CGPA:{" "}
              <strong>
                {result.cumulativeCgpa.toFixed(2)}
              </strong>
            </p>
          </div>
        )}

      </div>
    </>
  );
}
