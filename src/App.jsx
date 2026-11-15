import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div><p className="topline">한동대학교</p><h1>Course Tracker</h1><p className="subtitle">이번 학기 수강 과목을 관리하는 React 앱</p></div>
        <span className="tag">MY SEMESTER</span>
      </header>
      <CourseList />
      <footer className="bottom"><span>Course Tracker · React</span><span>Local state only · Refresh resets data</span></footer>
    </main>
  );
}
