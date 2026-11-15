import { useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  // TODO 1 (필수): 과목 추가 기능을 구현하세요.
  function handleAdd(event) {
    event.preventDefault();
    const name = newName.trim();
    if (name === '') {
      setError('과목명을 입력하세요.');
      return;
    }
    const newCourse = {
      id: courses.length === 0 ? 1 : Math.max(...courses.map(course => course.id)) + 1,
      name,
      category: 'Major',
      completed: false,
    };
    setCourses(previous => [...previous, newCourse]);
    setNewName('');
    setError('');
  }

  // TODO: 빈 입력 검사, 새 과목 객체 생성, setCourses 호출, 입력창 초기화
  function handleToggle(id) {
    setCourses(previous =>
      previous.map(course =>
        course.id === id ? { ...course, completed: !course.completed } : course
      )
    );
  }

  const doneCount = courses.filter(course => course.completed).length;

  const searchedCourses = courses.filter(course =>
    course.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>
      <section className="panel">
        <div className="panel-header"><h2>My Courses</h2><span className="small-note">{searchedCourses.length} / {courses.length} courses</span></div>
        <form className="add-form" onSubmit={handleAdd}>
          <input
            className="input"
            value={newName}
            onChange={event => {
              setNewName(event.target.value);
              setError('');
            }}
            placeholder="새 과목명을 입력하세요"
            aria-label="새 과목명"
          />
          <button className="btn primary" type="submit">+ Add Course</button>
        </form>
        {error && <p className="error">{error}</p>}
        <div className="tools">
          <input className="input" value={query} onChange={event => setQuery(event.target.value)} placeholder="과목명 검색" aria-label="과목명 검색" />
        </div>
        <div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
        {courses.length === 0 && <div className="empty">등록된 과목이 없습니다.</div>}
        {courses.length > 0 && searchedCourses.length === 0 && <div className="empty">검색 결과가 없습니다.</div>}
        {searchedCourses.map(course => (
          <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} />
        ))}
      </section>
    </>
  );
}
