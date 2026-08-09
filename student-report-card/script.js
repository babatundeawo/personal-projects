"use strict";

const STORAGE_KEY = "student-report-card-v2";
      const DEFAULT_SUBJECTS = [
        "Mathematics",
        "English",
        "Science",
        "Social Studies",
      ];
      const DEMO_NAMES = [
        "Amina Yusuf",
        "Daniel Brooks",
        "Kemi Adebayo",
        "Liam Chen",
        "Ngozi Okafor",
        "Owen Grant",
        "Fatima Alabi",
        "Musa Ibrahim",
        "Tolu Adeyemi",
        "Sophie Martinez",
        "Chiamaka Nwosu",
        "Noah Patel",
        "Ruth Thompson",
        "Efe Okon",
        "Grace Kim",
        "Ibrahim Hassan",
        "Adaobi Eze",
        "Mina Flores",
        "Bolanle Sanni",
        "Leo Bennett",
        "Hannah Ford",
        "Yusuf Salisu",
        "Precious Akin",
        "Darren Cole",
        "Nneka Uche",
        "Ayo Bassey",
        "Jude Wilson",
        "Zara Hassan",
        "Emmanuel Obi",
        "Amara Okafor",
        "Tina Osei",
        "David Mensah",
        "Faith Laryea",
        "Kenny Rao",
        "Mariam Bello",
        "Samuel Adeola",
        "Lina Nwankwo",
        "Brian Okorie",
        "Hauwa Aliyu",
        "Peter Duru",
        "Cynthia Agbo",
        "Joshua Kanu",
        "Rita Ibekwe",
        "Micheal Ayo",
        "Ifeoma Uka",
        "Tunde Folarin",
        "Nora Bell",
        "Kelvin Ojo",
      ];
      const DEFAULT_STUDENTS = Array.from({ length: 50 }, (_, index) => {
        const name = DEMO_NAMES[index % DEMO_NAMES.length];
        const gradeLevel = index % 2 === 0 ? "Grade 8" : "Grade 9";
        const attendance = {
          present: 78 + (index % 12),
          total: 90,
        };
        const scores = {};

        DEFAULT_SUBJECTS.forEach((subject, subjectIndex) => {
          const ca = 55 + ((index + subjectIndex * 3) % 35);
          const exam = 50 + ((index * 7 + subjectIndex * 11) % 40);
          const total = Math.round((ca + exam) / 2);
          scores[subject] = { ca, exam, total };
        });

        const diligence = 3 + (index % 3);
        const punctuality = 2 + (index % 4);
        const teamwork = 3 + (index % 3);

        return {
          id: `STU-${1000 + index + 1}`,
          name,
          gradeLevel,
          term: "Term 2",
          academicYear: "2025/2026",
          attendance,
          scores,
          behavioralSkills: { diligence, punctuality, teamwork },
          remarks:
            index % 3 === 0
              ? "Consistently demonstrates strong academic focus and leadership."
              : index % 3 === 1
                ? "Shows steady progress and responds well to guidance."
                : "Needs more consistent effort in class participation and homework.",
        };
      });

      const state = {
        subjects: [...DEFAULT_SUBJECTS],
        students: [],
      };

      let editingStudentId = null;
      let editingSubjectName = null;

      const dom = {
        statsGrid: document.getElementById("statsGrid"),
        studentTableBody: document.getElementById("studentTableBody"),
        subjectList: document.getElementById("subjectList"),
        subjectForm: document.getElementById("subjectForm"),
        subjectInput: document.getElementById("subjectInput"),
        subjectSubmitBtn: document.getElementById("subjectSubmitBtn"),
        subjectMessage: document.getElementById("subjectMessage"),
        searchInput: document.getElementById("searchInput"),
        gradeFilter: document.getElementById("gradeFilter"),
        statusFilter: document.getElementById("statusFilter"),
        tableCaption: document.getElementById("tableCaption"),
        addStudentBtn: document.getElementById("addStudentBtn"),
        refreshBtn: document.getElementById("refreshBtn"),
        clearFiltersBtn: document.getElementById("clearFiltersBtn"),
        studentModal: document.getElementById("studentModal"),
        studentModalTitle: document.getElementById("studentModalTitle"),
        closeStudentModalBtn: document.getElementById("closeStudentModalBtn"),
        cancelStudentBtn: document.getElementById("cancelStudentBtn"),
        studentForm: document.getElementById("studentForm"),
        studentFormMessage: document.getElementById("studentFormMessage"),
        subjectScoresContainer: document.getElementById(
          "subjectScoresContainer",
        ),
        reportModal: document.getElementById("reportModal"),
        reportContent: document.getElementById("reportContent"),
        closeReportModalBtn: document.getElementById("closeReportModalBtn"),
        printReportBtn: document.getElementById("printReportBtn"),
      };

      function escapeHtml(value) {
        return String(value)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\"/g, "&quot;")
          .replace(/'/g, "&#39;");
      }

      function createId() {
        return `STU-${String(Date.now()).slice(-6)}`;
      }

      function loadState() {
        try {
          const data = localStorage.getItem(STORAGE_KEY);
          if (!data) {
            state.subjects = [...DEFAULT_SUBJECTS];
            state.students = DEFAULT_STUDENTS.map((student) => ({
              ...student,
            }));
            saveState();
            return;
          }

          const parsed = JSON.parse(data);
          state.subjects =
            Array.isArray(parsed.subjects) && parsed.subjects.length
              ? parsed.subjects
              : [...DEFAULT_SUBJECTS];
          state.students = Array.isArray(parsed.students)
            ? parsed.students
            : [];
        } catch (error) {
          console.error("Unable to load data", error);
          state.subjects = [...DEFAULT_SUBJECTS];
          state.students = DEFAULT_STUDENTS.map((student) => ({ ...student }));
          saveState();
        }
      }

      function saveState() {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              subjects: state.subjects,
              students: state.students,
            }),
          );
        } catch (error) {
          console.error("Unable to save data", error);
        }
      }

      function getLetterGrade(average) {
        if (average >= 90) return "A+";
        if (average >= 80) return "A";
        if (average >= 70) return "B";
        if (average >= 60) return "C";
        if (average >= 50) return "D";
        return "F";
      }

      function getPassStatus(average) {
        return average >= 50 ? "Pass" : "Fail";
      }

      function calculateMetrics(student) {
        const subjects = state.subjects;
        const totalMarks = subjects.reduce((sum, subject) => {
          const score = student.scores?.[subject];
          return sum + (Number(score?.total) || 0);
        }, 0);

        const averagePercentage = subjects.length
          ? Math.round(totalMarks / subjects.length)
          : 0;
        const letterGrade = getLetterGrade(averagePercentage);
        const passStatus = getPassStatus(averagePercentage);

        return {
          totalMarks,
          averagePercentage,
          letterGrade,
          passStatus,
        };
      }

      function getRankedStudents() {
        return [...state.students]
          .map((student) => ({
            ...student,
            metrics: calculateMetrics(student),
          }))
          .sort(
            (a, b) => b.metrics.averagePercentage - a.metrics.averagePercentage,
          )
          .map((student, index) => ({ ...student, rank: index + 1 }));
      }

      function getAttendancePercentage(student) {
        const { present = 0, total = 0 } = student.attendance || {};
        if (!total) return 0;
        return Math.round((present / total) * 100);
      }

      function renderStats() {
        const ranked = getRankedStudents();
        const totalStudents = state.students.length;
        const classAverage = totalStudents
          ? Math.round(
              ranked.reduce(
                (sum, student) => sum + student.metrics.averagePercentage,
                0,
              ) / totalStudents,
            )
          : 0;
        const topPerformer = ranked[0];
        const passRate = totalStudents
          ? Math.round(
              (ranked.filter((student) => student.metrics.passStatus === "Pass")
                .length /
                totalStudents) *
                100,
            )
          : 0;

        dom.statsGrid.innerHTML = `
          <article class="stat-card">
            <div class="label">Total Students</div>
            <div class="value">${totalStudents}</div>
          </article>
          <article class="stat-card">
            <div class="label">Class Average</div>
            <div class="value">${classAverage}%</div>
          </article>
          <article class="stat-card">
            <div class="label">Top Performer</div>
            <div class="value">${topPerformer ? topPerformer.name : "—"}</div>
          </article>
          <article class="stat-card">
            <div class="label">Pass Rate</div>
            <div class="value">${passRate}%</div>
          </article>
        `;
      }

      function populateGradeFilter() {
        const grades = [
          ...new Set(
            state.students.map((student) => student.gradeLevel).filter(Boolean),
          ),
        ].sort();
        dom.gradeFilter.innerHTML =
          '<option value="">All Grade Levels</option>' +
          grades
            .map(
              (grade) =>
                `<option value="${escapeHtml(grade)}">${escapeHtml(grade)}</option>`,
            )
            .join("");
      }

      function renderStudentTable() {
        const query = dom.searchInput.value.trim().toLowerCase();
        const gradeFilter = dom.gradeFilter.value;
        const statusFilter = dom.statusFilter.value;

        let visibleStudents = [...state.students];

        if (query) {
          visibleStudents = visibleStudents.filter((student) => {
            const haystack = `${student.name} ${student.id}`.toLowerCase();
            return haystack.includes(query);
          });
        }

        if (gradeFilter) {
          visibleStudents = visibleStudents.filter(
            (student) => student.gradeLevel === gradeFilter,
          );
        }

        if (statusFilter) {
          visibleStudents = visibleStudents.filter((student) => {
            const metrics = calculateMetrics(student);
            return metrics.passStatus.toLowerCase() === statusFilter;
          });
        }

        if (!visibleStudents.length) {
          dom.studentTableBody.innerHTML = `<tr><td colspan="7" class="empty-state">No students match the current search or filters.</td></tr>`;
          dom.tableCaption.textContent = "No results";
          return;
        }

        dom.tableCaption.textContent = `${visibleStudents.length} student${visibleStudents.length > 1 ? "s" : ""}`;
        dom.studentTableBody.innerHTML = visibleStudents
          .map((student) => {
            const metrics = calculateMetrics(student);
            return `
            <tr>
              <td><strong>${escapeHtml(student.name)}</strong></td>
              <td>${escapeHtml(student.id)}</td>
              <td>${escapeHtml(student.gradeLevel)}</td>
              <td>${metrics.averagePercentage}%</td>
              <td>${escapeHtml(metrics.letterGrade)}</td>
              <td><span class="badge ${metrics.passStatus === "Pass" ? "pass" : "fail"}">${escapeHtml(metrics.passStatus)}</span></td>
              <td>
                <div class="action-group">
                  <button class="icon-btn" type="button" data-action="view" data-id="${student.id}">View</button>
                  <button class="icon-btn" type="button" data-action="edit" data-id="${student.id}">Edit</button>
                  <button class="icon-btn danger" type="button" data-action="delete" data-id="${student.id}">Delete</button>
                </div>
              </td>
            </tr>
          `;
          })
          .join("");
      }

      function renderSubjectManager() {
        dom.subjectList.innerHTML = state.subjects
          .map(
            (subject) => `
          <li class="subject-item">
            <strong>${escapeHtml(subject)}</strong>
            <div class="actions">
              <button class="icon-btn" type="button" data-subject-action="edit" data-subject-name="${escapeHtml(subject)}">Edit</button>
              <button class="icon-btn danger" type="button" data-subject-action="delete" data-subject-name="${escapeHtml(subject)}">Remove</button>
            </div>
          </li>
        `,
          )
          .join("");
      }

      function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `status-message ${type}`;
      }

      function clearMessage(element) {
        element.textContent = "";
        element.className = "status-message";
      }

      function resetSubjectForm() {
        dom.subjectInput.value = "";
        editingSubjectName = null;
        dom.subjectSubmitBtn.textContent = "Save Subject";
      }

      function buildStudentFormMarkup(student) {
        if (!state.subjects.length) {
          dom.subjectScoresContainer.innerHTML =
            '<div class="empty-state">Add a subject to begin scoring students.</div>';
          return;
        }

        dom.subjectScoresContainer.innerHTML = state.subjects
          .map((subject) => {
            const score = student?.scores?.[subject] || {};
            return `
            <div class="subject-card">
              <h4>${escapeHtml(subject)}</h4>
              <div class="score-row">
                <input class="input" name="subject-ca-${subject}" type="number" min="0" max="100" value="${Number(score.ca) || 0}" placeholder="CA / Test" />
                <input class="input" name="subject-exam-${subject}" type="number" min="0" max="100" value="${Number(score.exam) || 0}" placeholder="Exam" />
              </div>
            </div>
          `;
          })
          .join("");
      }

      function openStudentModal(studentId = null) {
        editingStudentId = studentId;
        const student = state.students.find((item) => item.id === studentId);
        dom.studentForm.reset();
        clearMessage(dom.studentFormMessage);

        if (student) {
          dom.studentModalTitle.textContent = "Edit Student Profile";
          document.getElementById("studentName").value = student.name || "";
          document.getElementById("studentId").value = student.id || "";
          document.getElementById("gradeLevel").value =
            student.gradeLevel || "";
          document.getElementById("term").value = student.term || "";
          document.getElementById("academicYear").value =
            student.academicYear || "";
          document.getElementById("attendancePresent").value =
            student.attendance?.present || "";
          document.getElementById("attendanceTotal").value =
            student.attendance?.total || "";
          document.getElementById("diligence").value =
            student.behavioralSkills?.diligence || "";
          document.getElementById("punctuality").value =
            student.behavioralSkills?.punctuality || "";
          document.getElementById("teamwork").value =
            student.behavioralSkills?.teamwork || "";
          document.getElementById("remarks").value = student.remarks || "";
        } else {
          dom.studentModalTitle.textContent = "Add New Student";
          document.getElementById("studentId").value = createId();
          document.getElementById("attendancePresent").value = "";
          document.getElementById("attendanceTotal").value = "";
          document.getElementById("diligence").value = "";
          document.getElementById("punctuality").value = "";
          document.getElementById("teamwork").value = "";
          document.getElementById("remarks").value = "";
        }

        buildStudentFormMarkup(student);
        dom.studentModal.classList.add("active");
        dom.studentModal.setAttribute("aria-hidden", "false");
      }

      function closeStudentModal() {
        editingStudentId = null;
        dom.studentModal.classList.remove("active");
        dom.studentModal.setAttribute("aria-hidden", "true");
        clearMessage(dom.studentFormMessage);
        dom.studentForm.reset();
      }

      function handleStudentSubmit(event) {
        event.preventDefault();
        clearMessage(dom.studentFormMessage);

        const formData = new FormData(dom.studentForm);
        const name = document.getElementById("studentName").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const gradeLevel = document.getElementById("gradeLevel").value.trim();
        const term = document.getElementById("term").value.trim();
        const academicYear = document
          .getElementById("academicYear")
          .value.trim();
        const attendancePresent = Number(
          document.getElementById("attendancePresent").value,
        );
        const attendanceTotal = Number(
          document.getElementById("attendanceTotal").value,
        );
        const diligence = Number(document.getElementById("diligence").value);
        const punctuality = Number(
          document.getElementById("punctuality").value,
        );
        const teamwork = Number(document.getElementById("teamwork").value);
        const remarks = document.getElementById("remarks").value.trim();

        if (
          !name ||
          !gradeLevel ||
          !term ||
          !academicYear ||
          !attendanceTotal ||
          !diligence ||
          !punctuality ||
          !teamwork
        ) {
          showMessage(
            dom.studentFormMessage,
            "Please complete all required fields before saving.",
            "error",
          );
          return;
        }

        if (attendancePresent > attendanceTotal) {
          showMessage(
            dom.studentFormMessage,
            "Attendance present cannot exceed total days.",
            "error",
          );
          return;
        }

        const normalizedId = studentId || createId();
        const duplicateStudent = state.students.find(
          (student) =>
            student.id === normalizedId && student.id !== editingStudentId,
        );
        if (duplicateStudent) {
          showMessage(
            dom.studentFormMessage,
            "This student ID already exists. Please choose a different ID.",
            "error",
          );
          return;
        }

        const subjectScores = {};
        state.subjects.forEach((subject) => {
          const ca = Number(formData.get(`subject-ca-${subject}`) || 0);
          const exam = Number(formData.get(`subject-exam-${subject}`) || 0);
          subjectScores[subject] = {
            ca,
            exam,
            total: Math.round((ca + exam) / 2),
          };
        });

        const studentPayload = {
          id: normalizedId,
          name,
          gradeLevel,
          term,
          academicYear,
          attendance: { present: attendancePresent, total: attendanceTotal },
          scores: subjectScores,
          behavioralSkills: {
            diligence,
            punctuality,
            teamwork,
          },
          remarks,
        };

        if (editingStudentId) {
          const index = state.students.findIndex(
            (student) => student.id === editingStudentId,
          );
          if (index >= 0) {
            state.students[index] = {
              ...state.students[index],
              ...studentPayload,
              createdAt: state.students[index].createdAt,
            };
          }
        } else {
          state.students.unshift({
            ...studentPayload,
            createdAt: new Date().toISOString(),
          });
        }

        saveState();
        render();
        closeStudentModal();
      }

      function openReportModal(studentId) {
        const student = state.students.find((item) => item.id === studentId);
        if (!student) return;

        const metrics = calculateMetrics(student);
        const rank =
          getRankedStudents().find((item) => item.id === student.id)?.rank ||
          "—";
        const attendancePct = getAttendancePercentage(student);

        dom.reportContent.innerHTML = `
          <div class="report-header">
            <div>
              <div class="student-name">${escapeHtml(student.name)}</div>
              <div>${escapeHtml(student.id)} • ${escapeHtml(student.gradeLevel)} • ${escapeHtml(student.term)} • ${escapeHtml(student.academicYear)}</div>
            </div>
            <div><strong>Rank:</strong> #${rank}</div>
          </div>
          <div class="report-metrics">
            <div class="metric-box"><strong>${metrics.totalMarks}</strong><span>Total Marks</span></div>
            <div class="metric-box"><strong>${metrics.averagePercentage}%</strong><span>Average</span></div>
            <div class="metric-box"><strong>${metrics.letterGrade}</strong><span>Letter Grade</span></div>
            <div class="metric-box"><strong>${metrics.passStatus}</strong><span>Status</span></div>
          </div>
          <div class="report-metrics" style="margin-top: 10px;">
            <div class="metric-box"><strong>${attendancePct}%</strong><span>Attendance</span></div>
            <div class="metric-box"><strong>${student.attendance?.present || 0}/${student.attendance?.total || 0}</strong><span>Days Present</span></div>
            <div class="metric-box"><strong>${student.behavioralSkills?.diligence || 0}/5</strong><span>Diligence</span></div>
            <div class="metric-box"><strong>${student.behavioralSkills?.punctuality || 0}/5</strong><span>Punctuality</span></div>
          </div>
          <h3 style="margin-bottom: 8px;">Academic Scores</h3>
          <table class="table-sm">
            <thead>
              <tr>
                <th>Subject</th>
                <th>CA</th>
                <th>Exam</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${state.subjects
                .map((subject) => {
                  const score = student.scores?.[subject] || {};
                  return `
                  <tr>
                    <td>${escapeHtml(subject)}</td>
                    <td>${Number(score.ca) || 0}</td>
                    <td>${Number(score.exam) || 0}</td>
                    <td>${Number(score.total) || 0}</td>
                  </tr>
                `;
                })
                .join("")}
            </tbody>
          </table>
          <h3 style="margin-bottom: 8px;">Performance Bar</h3>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${Math.min(metrics.averagePercentage, 100)}%"></div>
          </div>
          <p><strong>Teacher's Remarks:</strong> ${escapeHtml(student.remarks || "No remarks provided.")}</p>
          <p><strong>Behavioral Traits:</strong> Diligence ${student.behavioralSkills?.diligence || 0}/5, Punctuality ${student.behavioralSkills?.punctuality || 0}/5, Teamwork ${student.behavioralSkills?.teamwork || 0}/5.</p>
        `;

        dom.reportModal.classList.add("active");
        dom.reportModal.setAttribute("aria-hidden", "false");
      }

      function closeReportModal() {
        dom.reportModal.classList.remove("active");
        dom.reportModal.setAttribute("aria-hidden", "true");
      }

      function handleSubjectSubmit(event) {
        event.preventDefault();
        const value = dom.subjectInput.value.trim();
        if (!value) {
          showMessage(
            dom.subjectMessage,
            "Subject name cannot be empty.",
            "error",
          );
          return;
        }

        const candidate = value.trim();
        const exists = state.subjects.find(
          (subject) => subject.toLowerCase() === candidate.toLowerCase(),
        );
        if (editingSubjectName) {
          if (exists && exists !== editingSubjectName) {
            showMessage(
              dom.subjectMessage,
              "That subject already exists.",
              "error",
            );
            return;
          }
          const index = state.subjects.findIndex(
            (subject) => subject === editingSubjectName,
          );
          if (index >= 0) {
            state.subjects[index] = candidate;
            state.students.forEach((student) => {
              const updatedScores = {};
              Object.entries(student.scores || {}).forEach(
                ([subjectName, score]) => {
                  if (subjectName === editingSubjectName) {
                    updatedScores[candidate] = score;
                  } else {
                    updatedScores[subjectName] = score;
                  }
                },
              );
              student.scores = updatedScores;
            });
          }
        } else {
          if (exists) {
            showMessage(
              dom.subjectMessage,
              "That subject already exists.",
              "error",
            );
            return;
          }
          state.subjects.push(candidate);
        }

        saveState();
        render();
        resetSubjectForm();
        clearMessage(dom.subjectMessage);
      }

      function handleSubjectListClick(event) {
        const button = event.target.closest("button");
        if (!button) return;
        const action = button.getAttribute("data-subject-action");
        const subjectName = button.getAttribute("data-subject-name");
        if (action === "edit") {
          editingSubjectName = subjectName;
          dom.subjectInput.value = subjectName;
          dom.subjectSubmitBtn.textContent = "Update Subject";
          dom.subjectInput.focus();
        }

        if (action === "delete") {
          const confirmed = window.confirm(
            `Remove the subject ${subjectName}? Student scores for it will be deleted.`,
          );
          if (!confirmed) return;
          state.subjects = state.subjects.filter(
            (subject) => subject !== subjectName,
          );
          state.students.forEach((student) => {
            const { [subjectName]: removed, ...rest } = student.scores || {};
            student.scores = rest;
          });
          saveState();
          render();
          if (editingSubjectName === subjectName) {
            resetSubjectForm();
          }
        }
      }

      function handleTableClick(event) {
        const button = event.target.closest("button");
        if (!button) return;
        const action = button.getAttribute("data-action");
        const studentId = button.getAttribute("data-id");
        if (action === "view") {
          openReportModal(studentId);
        }
        if (action === "edit") {
          openStudentModal(studentId);
        }
        if (action === "delete") {
          const student = state.students.find((item) => item.id === studentId);
          if (!student) return;
          const confirmed = window.confirm(`Delete ${student.name}?`);
          if (!confirmed) return;
          state.students = state.students.filter(
            (item) => item.id !== studentId,
          );
          saveState();
          render();
        }
      }

      function render() {
        renderStats();
        populateGradeFilter();
        renderStudentTable();
        renderSubjectManager();
        if (dom.studentModal.classList.contains("active")) {
          const student = state.students.find(
            (item) => item.id === editingStudentId,
          );
          buildStudentFormMarkup(student);
        }
      }

      function bindEvents() {
        dom.addStudentBtn.addEventListener("click", () => openStudentModal());
        dom.refreshBtn.addEventListener("click", () => {
          loadState();
          render();
        });
        dom.clearFiltersBtn.addEventListener("click", () => {
          dom.searchInput.value = "";
          dom.gradeFilter.value = "";
          dom.statusFilter.value = "";
          renderStudentTable();
        });
        dom.studentForm.addEventListener("submit", handleStudentSubmit);
        dom.closeStudentModalBtn.addEventListener("click", closeStudentModal);
        dom.cancelStudentBtn.addEventListener("click", closeStudentModal);
        dom.studentModal.addEventListener("click", (event) => {
          if (event.target === dom.studentModal) {
            closeStudentModal();
          }
        });
        dom.reportModal.addEventListener("click", (event) => {
          if (event.target === dom.reportModal) {
            closeReportModal();
          }
        });
        dom.closeReportModalBtn.addEventListener("click", closeReportModal);
        dom.printReportBtn.addEventListener("click", () => window.print());
        dom.subjectForm.addEventListener("submit", handleSubjectSubmit);
        dom.subjectList.addEventListener("click", handleSubjectListClick);
        dom.studentTableBody.addEventListener("click", handleTableClick);
        dom.searchInput.addEventListener("input", renderStudentTable);
        dom.gradeFilter.addEventListener("change", renderStudentTable);
        dom.statusFilter.addEventListener("change", renderStudentTable);
      }

      loadState();
      bindEvents();
      render();
